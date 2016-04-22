// Use of Gulp Help requires passing Gulp to the
// gulp-help plugin.  This is also where we
// specify the global Gulp Help options.

var gulp = require('gulp-help')(require('gulp'), {
    hideEmpty: true,
    hideDepsMessage: true
});

var _ = require('lodash');
var del = require('del');
var path = require('path');
var sass = require('gulp-sass');
var cache = require('gulp-cached');
var rename = require('gulp-rename');
var sequence = require('run-sequence');
var minifyCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var sassJspm = require('sass-jspm-importer');

// These are required in by tasks that need them
// so as to hopefully speed up other tasks that
// don't use them.

var Karma;
var browserSync;


/***********************
 * PATHS
 ***********************/

var _root = __dirname + '/';
var _app = _root + 'application/';
var _static = _app + 'static/';
var _source = _static + 'app/';

var _paths = {

    config: {
        npm: _root + 'package.json',
        karma: _root + 'karma.conf.js',
        system: _static + 'config.js'
    },

    js: _static + 'app/',
    css: _static + 'style/css/',
    sass: _static + 'style/sass/',
    jspm: _static + 'jspm_packages/',
    components: _source + 'components/',

    test: {
        results: _static + 'test/reports/results/',
        coverage: _static + 'test/reports/coverage/'
    }
};

/***********************
 * GLOBS
 ***********************/

var globs = {

    js: [
        _paths.js + '**/!(*spec).js'
    ],

    css: [
        _paths.js + '**/*.css',
        _paths.css + '**/*.css'
    ],

    html: [
        // Looking for JS app templates
        _paths.js + '**/*.html'
    ],

    lang: [
        _static + 'lang/**/*.js'
    ],

    sass: {
        app: [

            // Files that are watched and then rebuilt into
            // app.min.css when they are modified.

            _paths.sass + 'app.scss',
            _paths.sass + '_settings.scss'
        ],
        comp: [

            // Files that are watched and then rebuilt into
            // their own component folders when modified.

            _paths.components + '**/*.scss',
            _paths.sass + '_settings.scss'
        ],
        vendor: [

            // Files that are watched and then rebuilt into
            // vendor.min.css when they are modified.

            _paths.sass + 'vendor.scss',
            _paths.sass + '_settings.scss',
            _paths.sass + 'vendor/**/*.scss'
        ]
    },

    test: {
        results: [
            _paths.test.results + '**/*.html'
        ],
        coverage: [
            _paths.test.coverage + '**/*.html'
        ]
    }
};


/***********************
 * MAIN TASKS
 ***********************/

gulp.task('default', ['help']);

gulp.task('sass', 'Create CSS files from SASS sources.', function (done) {
    sequence(
        'build-app-css',
        'build-comp-css',
        'build-vendor-css',
        done
    );
});

gulp.task('server', 'Serve test coverage, test source files on change.', function (done) {
    sequence(
        'build:watch',
        'lint:watch',
        //'unit-test:watch',
        'build:server',
        //'coverage:server',
        done
    );
});

gulp.task('test', 'JSHint and unit test the application JS.', function(done) {
    sequence(
        'lint',
        'unit-test',
        done
    );
});


/***********************
 * BUILD APP
 ***********************/

gulp.task('build-app-css', function () {

    return gulp.src(globs.sass.app)
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            functions: sassJspm.resolve_function(_paths.jspm),
            importer: sassJspm.importer
        }).on('error', sass.logError))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(_paths.css));
});

gulp.task('build-comp-css', function () {

    return gulp.src(globs.sass.comp, {base: './'})
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            functions: sassJspm.resolve_function(_paths.jspm),
            importer: sassJspm.importer
        }).on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./'));
});

gulp.task('build-vendor-css', function () {

    return gulp.src(globs.sass.vendor)
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: true,
            functions: sassJspm.resolve_function(_paths.jspm),
            importer: sassJspm.importer
        }).on('error', sass.logError))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(_paths.css));
});

/***********************
 * LINT
 ***********************/


gulp.task('lint', function () {
    var print = require('gulp-print');
    var jshint = require('gulp-jshint');
    return gulp.src(globs.js)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(print(function (filepath) {
            return 'Linted: ' + filepath;
        }));
});

gulp.task('lint:changed', function () {
    var print = require('gulp-print');
    var jshint = require('gulp-jshint');
    return gulp.src(globs.js)
        .pipe(cache('linting'))  // Only lint changed or uncached files
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(print(function (filepath) {
            return 'Linted: ' + filepath;
        }));
});

gulp.task('lint:watch', ['lint:changed'], function () {
    gulp.watch(globs.js, ['lint:changed']);
});



/***********************
 * UNIT TEST
 ***********************/


gulp.task('unit-test', function (done) {
    Karma = require('karma');
    new Karma.Server({
        configFile: _paths.config.karma,
        singleRun: true
    }, done).start();
});

gulp.task('unit-test:watch', [], function (done) {
    Karma = require('karma');
    var isdone = false;
    var server = new Karma.Server({
        configFile: _paths.config.karma,
        autoWatch: true,
        singleRun: false
    });
    server.on('run_complete', function() {
        // this ensures done() is called so that the run
        // sequence is maintained, but also ensures that
        // done() is only called once.
        if (!isdone) { done(); isdone = 1; }
    });
    server.start();
});



/***********************
 * BROWSER SYNC
 ***********************/


gulp.task('build:watch', function () {

    // Watch app SASS files for changes, rebuild as needed

    gulp.watch(globs.sass.app, ['build-app-css']);
    gulp.watch(globs.sass.comp, ['build-comp-css']);
    gulp.watch(globs.sass.vendor, ['build-vendor-css']);

});

gulp.task('build:server', function () {

    // Starts a BrowserSync server that watches source
    // js, css, html and reloads on changes

    browserSync = browserSync || require('browser-sync');

    browserSync.init({
        /*port: 8100,
        ui: { port: 8101 },
        proxy: 'localhost:8000',*/
        server: {
          baseDir: "./"
        },
        notify: false,
        logLevel: 'info',
        ghostMode: false,
        timestamps: false,
        logFileChanges: false,
        files: [].concat(globs.js)
                 .concat(globs.css)
                 .concat(globs.html)
                 .concat(globs.lang)
    });
});

gulp.task('coverage:server', function (done) {

    // Starts a BrowserSync server that watches and
    // reloads unit test coverage reports on changes.

    browserSync = browserSync || require('browser-sync');

    browserSync.create().init({
        port: 8200,
        ui: { port: 8201 },
        open: true,
        notify: false,
        ghostMode: false,
        logLevel: 'silent',
        logFileChanges: false,
        files: globs.test.coverage,
        server: {baseDir: _paths.test.coverage }
    });
    done();
});

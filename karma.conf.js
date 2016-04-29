// We're using Jasmine-matchers to expand our set of expect() methods.
// See: https://github.com/JamieMason/Jasmine-Matchers#available-matchers

module.exports = function (config) {
    config.set({

        basePath: '.',

        port: 9687,

        colors: true,

        autoWatch: true,

        singleRun: false,

        browsers: ['PhantomJS'],

        frameworks: ['jspm', 'jasmine'],

        reporters: ['spec', 'coverage'],

        // possible values:
        // config.LOG_DISABLE ||
        // config.LOG_ERROR ||
        // config.LOG_WARN ||
        // config.LOG_INFO ||
        // config.LOG_DEBUG
        logLevel: config.LOG_ERROR,

        plugins: [
            'karma-jspm',
            'karma-jasmine',
            'karma-coverage',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine-matchers',
            'karma-html-reporter',
            'karma-mocha-reporter',
            'karma-spec-reporter'
        ],

        files: [

            // These files are included before SystemJS loader is available,
            // so don't expect anything in here to be able to use require().
            'node_modules/karma-babel-preprocessor/node_modules/babel-core/browser-polyfill.js',
            'node_modules/jasmine-async-sugar/jasmine-async-sugar.js'

        ],

        exclude: [
            'test/reports/*'
        ],

        preprocessors: {
            'app/**/!(*spec|*mock).js': ['babel', 'coverage']
        },
        babelPreprocessor: {
            options: {
                stage:1,
                sourceMap: 'inline'
            }
        },

        specReporter: {
            maxLogLines: 1,
            suppressSkipped: true
        },

        mochaReporter: {
            ignoreSkipped: true
        },

        coverageReporter: {
            instrumenters: { isparta : require('isparta') },
            instrumenter: {
                'app/**/*.js': 'isparta'
            },
            dir: 'test-reports/coverage/',
            reporters: [
                {type: 'html'},
                {type: 'text-summary'}
            ]
        },

        jspm: {
            useBundles: false,
            config: 'config.js',
            loadFiles: [
                'app/**/*.spec.js'
            ],
            serveFiles: [
                'jspm_packages/**/*',
                'test/*.js',
                'app/**/*.js',
                'app/**/*.html'
            ]
        },

        proxies: {
            '/jspm_packages/': '/base/jspm_packages/',
            '/config.js': '/base/config.js',
            '/lang/': '/base/lang/',
            '/test/': '/base/test/',
            '/js/': '/base/js/',
            '/app/': '/base/app/'
        }

    });
};

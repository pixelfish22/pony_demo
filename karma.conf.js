// We're using Jasmine-matchers to expand our set of expect() methods.
// See: https://github.com/JamieMason/Jasmine-Matchers#available-matchers

module.exports = function (config) {
    config.set({

        basePath: 'application/static/',

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

        ],

        exclude: [
            'test/reports/*'
        ],

        preprocessors: {
            'app/**/!(*spec|*mock).js': 'coverage'
        },

        specReporter: {
            maxLogLines: 1,
            suppressSkipped: true
        },

        mochaReporter: {
            ignoreSkipped: true
        },

        coverageReporter: {
            dir: 'test/reports/',
            reporters: [
                {type: 'html', subdir: 'coverage'}, // Human readable
                {type: 'cobertura', subdir: '.', file: 'cobertura.xml'} // Jenkins
            ]
        },

        jspm: {
            useBundles: false,
            loadFiles: [
                'app/**/*.spec.js'
            ],
            serveFiles: [
                'config.js',
                'jspm_packages/**/*',
                'test/*.js',
                'app/**/*'
            ]
        },

        proxies: {
            '/jspm_packages/': '/base/jspm_packages/',
            '/config.js': '/base/config.js',
            '/lang/': '/base/lang/',
            '/test/': '/base/test/',
            '/js/': '/base/js/'
        }

    });
};

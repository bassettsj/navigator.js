// Karma configuration
const path = require('path');
const webpackConfig = {
    devtool: 'inline-source-map',
    module: {
        preLoaders: [{
            // transpile all files except testing sources with babel as usual
            test: /\.js$/,
            include: path.resolve('spec/'),
            exclude: [
                path.resolve('src/'),
                path.resolve('node_modules/')
            ],
            loader: 'babel'
        }, {
            // transpile and instrument only testing sources with babel-istanbul
            test: /\.js$/,
            include: path.resolve('src/'),
            loader: 'babel-istanbul',
            query: {
                cacheDirectory: true
            }
        }]
    }
};
const reporters = ['dots', 'coverage'];

if (process.env.CI) {
    reporters.push('coveralls');
}

module.exports = function karmaConfig(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            'public/js/vendors/jquery/dist/jquery.js',
            'public/js/vendors/underscore/underscore.js',
            'public/js/vendors/backbone/backbone.js',
            'public/js/vendors/injector.js/injector-js.js',
            'public/js/vendors/backbone-command/backbone-command.js',
            'test.js',
            'spec/**/*Spec.js'
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'test.js': ['webpack', 'sourcemap'],
            'spec/**/*Spec.js': ['webpack', 'sourcemap']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: reporters, // eslint-disable-line

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values:
        // config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN ||
        //  config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,
        webpack: webpackConfig,
        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            noInfo: true
        },

        coverageReporter: {
            dir: './coverage',
            reporters: [
                {
                    type: 'html',
                    subdir: 'report-html'
                }, {
                    type: 'text'
                }, {
                    type: 'lcov',
                    subdir: 'report-lcov'
                }
            ]
        },

        plugins: [
            require('karma-webpack'),
            require('karma-jasmine'),
            require('karma-phantomjs-launcher'),
            require('karma-sourcemap-loader'),
            require('karma-coverage')
        ]

    });
};

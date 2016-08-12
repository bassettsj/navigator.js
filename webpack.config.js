const webpack = require('webpack');
const path = require('path');
const moment = require('moment');
const pkg = require('./package');
const transformUMDExternal = require('webpack-umd-external');

const banner =
`${pkg.name} - v${pkg.version} - ${ moment().format('YYYY-MM-DD')}
${pkg.homepage}
Copyright (c) ${ moment().format('YYYY') } ${pkg.author.name}`;

module.exports = {
    entry: {
        'navigator-js': './src/index.js'
    },
    output: {
        path: path.join(__dirname, './public/js/dist'),
        filename: '[name].js',
        library: 'navigator-js',
        libraryTarget: 'umd'
    },
    externals: transformUMDExternal({
        'react-dom': 'ReactDOM',
        react: 'React',
        jquery: 'jQuery',
        underscore: '_'
    }),
    module: {
        loaders: [{
            test: /\.js/,
            exclude: /(bower_components|node_modules)/,
            loader: 'babel-loader'
        }]
    },
    plugins: [
        new webpack.BannerPlugin(banner)
    ]
};

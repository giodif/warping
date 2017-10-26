var path    = require( 'path' );
var webpack = require( 'webpack' );
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: [
        "babel-polyfill",
        "./js/source.js"
    ],
    output: {
        path: path.resolve(__dirname, './'),
        filename: 'index.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'js'),
                loader: 'babel-loader',
                query: {
                    presets: [ 'es2015' ]
                }
            }
        ]
    },
    stats: {
        colors: true
    }
};
var path = require('path');
var pkg = require('./package.json');
var webpack = require('webpack');
var DEBUG = process.env.NODE_ENV !== 'production';
var buildDir = path.resolve(pkg.config.buildDir);
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    //context: path.join(__dirname, 'app'),
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(__dirname, 'src/app.js')
    ],
    debug: DEBUG,
    target: 'web',
    devtool: DEBUG ? 'inline-source-map' : false,
    output: {
        path: buildDir,
        publicPath: '/',
        filename: '[name].js'
    },
    node: {
        fs: 'empty'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.html$/,
            exclude: /node_modules/,
            loader: 'file?name=[path][name].[ext]'
        }, {
            test: /\.jpe?g$|\.svg$|\.png$/,
            exclude: /node_modules/,
            loader: 'file?name=[path][name].[ext]'
        }, {
            test: /\.json$/,
            exclude: /node_modules/,
            loader: 'json'
        }, {
            test: /\.json$/,
            include: path.join(__dirname, 'node_modules', 'pixi.js'),
            loader: 'json',
        }]
    }
};

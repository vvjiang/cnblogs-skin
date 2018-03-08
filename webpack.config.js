const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const pathsToClean = [
    'build',
];

module.exports = {
    entry: ['./app.js'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },
    devServer: {
        port: 8686,
        open: true,
        compress: true,
        index: 'demo.html',
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader'],
            }),
        },
        {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'less-loader'],
            }),
        },
        ],
    },
    plugins: [
        new ExtractTextPlugin({ filename: '[name].[contenthash].css', allChunks: false }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            // template: './template/list.html',
            template: './template/read.html',
            // template: './template/categoryList.html',
            filename: 'demo.html',
            minify: {
                collapseWhitespace: true,
            },
            hash: true,
        }),
        new CleanWebpackPlugin(pathsToClean),
    ]
};

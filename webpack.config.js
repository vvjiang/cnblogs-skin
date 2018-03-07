const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
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
            use:['style-loader','css-loader?sourceMap'],
        },
        {
            test: /\.less$/,
            use: ['style-loader','css-loader?sourceMap','less-loader'],
        },
        ],
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    plugins: [
        new HtmlWebpackPlugin({
            // template: './template/list.html',
            template: './template/read.html',
            filename: 'demo.html',
            minify: {
                collapseWhitespace: true,
            },
            hash: true,
        }),
        new CleanWebpackPlugin(pathsToClean),
    ]
};

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

const pathsToClean = [
    'build',
];

const htmlNames = [
    'categoryList',
    'index',
    'read'
]

const config = {
    entry: ['./app.js'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },
    devServer: {
        port: 8686,
        open: true,
        compress: true,
        index: 'index.html',
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                miniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        url: false
                    }
                }
            ],
        },
        {
            test: /\.less$/,
            use: [
                miniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        url: false
                    }
                },
                'less-loader'],
        },
        {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'src/images/'
                }
            }
        },
        {
            test: /\.html$/,
            use: [{
                loader: 'html-loader',
                options: {
                    minimize: true
                }
            }],
        }
        ],
    },
    plugins: [
        new miniCssExtractPlugin({ filename: '[name].[contenthash].css', allChunks: false }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(pathsToClean),
    ]
};

htmlNames.forEach((pageName) => {
    const htmlPlugin = new HtmlWebpackPlugin({
        filename: `${pageName}.html`,
        template: `./template/${pageName}.html`,
        hash: true,
        inject: "head"
    });
    config.plugins.push(htmlPlugin);
})
module.exports = config;

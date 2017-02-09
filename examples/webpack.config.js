const path = require('path'),
    webpack = require('webpack');

module.exports = {
    entry: './index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
        {
            test: /\.css$/,
            loaders: ['style', 'css']
        },
        {
            test: /\.less$/,
            loaders: ['style', 'css', 'less']
        },
        {
            test: /\.(png|jpg|gif|woff|woff2)$/,
            loader: 'url-loader?limit=8192'
        },
        {
            test: /\.(js|jsx)$/,
            loaders: ['babel'],
            exclude: /node_modules/,
            include: [__dirname, path.resolve(__dirname, './../src')]
        }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}

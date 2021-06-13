const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const path = require("path");
const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:3001/'
    },
    devtool: 'source-map',
    devServer: {
        port: 3001,
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers":
                "X-Requested-With, content-type, Authorization",
        },
        // hot: true,
        // disableHostCheck: true,
        // host: '0.0.0.0',
        // // public: 'localhost:3001',
        // open: true,
        // // inline: true,
        // watchContentBase: true,
        // watchOptions: {
        //     aggregateTimeout: 500, // delay before reloading
        //     poll: 1000 // enable polling since fsevents are not supported in docker
        // }
        // historyApiFallback: {
        //     index: 'index.html'
        // }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new ModuleFederationPlugin({
            name: 'home',
            library: { type: 'var', name: 'home' },
            filename: 'remoteEntry.js',
            remotes: {},
            exposes: {
                './HomeApp': './src/bootstrap'
            },
            // shared: ['react', 'react-dom']
            shared: packageJson.dependencies // optional way to list all dependencies as shared
        })
    ]
}

// devConfig overrides the baseConfig, if there is common attributes
module.exports = merge(baseConfig, devConfig);
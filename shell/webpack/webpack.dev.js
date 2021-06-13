const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const path = require("path");
const ExternalTemplateRemotesPlugin = require('./ExternalTemplateRemotesPlugin');

const devConfig = {
    mode: 'development',
    output: {
        publicPath: 'http://localhost:3000/'
    },
    devtool: 'source-map',
    target: "web",
    devServer: {
        port: 3000,
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
        // // public: 'localhost:3000',
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
            excludeChunks: ["container"],
        }),
        new ModuleFederationPlugin({
            name: 'container',
            // The default is remoteType: "script" which requires global@URL
            // library: { type: "var", name: "container" }, 
            filename: 'remoteEntry.js',
            remotes: {
                // 'home': 'home',
                home: 'home@[window.homeurl]/remoteEntry.js'
                // home: `home@{getRemoteEntryUrl()}`
                // 'home': 'home@http://localhost:3001/remoteEntry.js',
            },
            exposes: { },
            // shared: ['react', 'react-dom']
            shared: packageJson.dependencies // optional way to list all dependencies as shared
        }),
        new ExternalTemplateRemotesPlugin(),
    ]
}

function getRemoteEntryUrl(port) {

    // const { CODESANDBOX_SSE, HOSTNAME = "" } = process.env;
  
    // // Check if the example is running on codesandbox
    // // https://codesandbox.io/docs/environment
    // if (!CODESANDBOX_SSE) {
    //   return `//localhost:${port}/remoteEntry.js`;
    // }
  
    // const parts = HOSTNAME.split("-");
    // const codesandboxId = parts[parts.length - 1];
  
    // return `//${codesandboxId}-${port}.sse.codesandbox.io/remoteEntry.js`;

    return new Promise(res => {
        setTimeout(() => {
            res('http://localhost:3001/remoteEntry.js');
        }, 300);
    })
}

// devConfig overrides the baseConfig, if there is common attributes
module.exports = merge(baseConfig, devConfig);
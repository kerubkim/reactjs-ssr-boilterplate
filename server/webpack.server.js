const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./webpack.base.js');

const webpackNodeExternals = require('webpack-node-externals');

const config = {

    // Inform webpack we are building a bundle for nodeJS, rather than bundle for the browser
    target: 'node',

    // Tell webpack the root file of our server applications. Entry point
    entry: {
        bundle: './src/index.js', // App bundle
        main: './src/assets/js/main.js' // custom js
    },

    // Tell webpack where to put the output bundle(build) that is generated
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build')
    },

    // Tell webpack to bundle all SCSS to a file
    plugins: [new MiniCssExtractPlugin({filename: "[name].css"})],

    // Tells webpack not to bundle any node_modules import for server side bundle
    externals: [webpackNodeExternals()]

};

// Merging base configurations with server webpack configs
module.exports = merge(baseConfig, config);
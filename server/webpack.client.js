// This is for webpack to bundle JS event handlers, onClicks, etc..

const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./webpack.base.js');

const config = {

    // Tell webpack the root file of our client applications. Entry point
    entry: {
        bundle: './src/client/client.js', // App bundle
        main: './src/assets/js/main.js' // custom js
    },

    // Tell webpack where to put the output bundle(build) that is generated
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public')
    },

    // Tell webpack to bundle all SCSS to a file
    plugins: [new MiniCssExtractPlugin({filename: "assets/css/[name].css"})]

};

// Merging base configurations with client webpack configs
module.exports = merge(baseConfig, config);
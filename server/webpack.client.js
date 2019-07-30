// This is for webpack to bundle JS event handlers, onClicks, etc..

const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const config = {

    // Tell webpack the root file of our client applications. Entry point
    entry: './src/client/client.js',

    // Tell webpack where to put the output bundle(build) that is generated
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    }

};

// Merging base configurations with client webpack configs
module.exports = merge(baseConfig, config);
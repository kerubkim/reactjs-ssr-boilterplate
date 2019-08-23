const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    // tell webpack to run babel on every file
    module: {
        rules: [
            {
                // only apply babel on .js files
                test: /\.js?$/,
                // if a file is found load with loader
                loader: 'babel-loader',
                // tell webpack dont run babel on certain directories
                exclude: /node_modules/,
                options: {
                    plugins: [
                        ['@babel/plugin-proposal-decorators', {decoratorsBeforeExport: false}],
                        '@babel/plugin-proposal-object-rest-spread',
                        ['@babel/plugin-proposal-class-properties'],
                    ],
                    // rules for babel to transpile our code
                    presets: [
                        // use for async code
                        // require('babel-preset-stage-0'),
                        // take all jsx to normal js calls
                        ['@babel/preset-react'],
                        // run all transpile rules needed for popular browsers with in the last 2 browser versions
                        ['@babel/env', { targets: { browsers: ['last 2 versions'] }}]
                    ]
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "/"
                        }
                    }, // 3. Extract CSS into file
                    "css-loader", // 2. turns css into JS
                    "sass-loader" // 1. Turns sass into css
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "assets/img"
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        outputPath: "assets/fonts"
                    }
                }
            }
        ]
    }

};
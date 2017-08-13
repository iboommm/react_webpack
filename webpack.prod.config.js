const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    devtool: 'inline-source-map',
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js",
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(scss|css)$/, 
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader','sass-loader'],
                        publicPath: '/public'
                    })
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                exclude: /node_modules/,
                use: [
                    'file-loader?name=images/[name].[ext]',
                    //'file-loader?name=[name].[ext]&outputPath=images/&publicPath=images/'
                    'image-webpack-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "PROJECT",
            minify: {
            collapseWhitespace: true
            },
            hash: true,
            template: __dirname + "/src/index.html"
        }),
        new ExtractTextPlugin({
            filename: "css-bundle.css",
            disable: false,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}



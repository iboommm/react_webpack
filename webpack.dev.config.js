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
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    'file-loader?name=images/[name].[ext]',
                    //'file-loader?name=[name].[ext]&outputPath=images/&publicPath=images/'
                    'image-webpack-loader'
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        port: 9000,
        hot: true,
        stats: "errors-only",
        open: true
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
            disable: true,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
        
    ]
}

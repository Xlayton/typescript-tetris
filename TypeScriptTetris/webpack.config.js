const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    devtool: "source-map",
    entry: './build-babel/Components/index.js',
    mode: 'development',
    target: "web",
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "components", "index.html"),
        }),
        new MiniCssExtractPlugin({
            filename: "./src/yourfile.css",
        }),
    ]
};
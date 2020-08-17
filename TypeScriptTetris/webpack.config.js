const path = require('path');

module.exports = {
    devtool: "source-map",
    entry: './build-babel/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    }
};
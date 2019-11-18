var path = require('path');

module.exports = {
    entry: './index.js',
    devServer: {
       // contentBase: '.',
         // index: path.join(__dirname, '../index.html'),
        //compress: true,
        // injectClient: true,
        // inline: false,
        watchContentBase: true,
        port: 8080
    }
};
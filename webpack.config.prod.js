const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'assets', 'scripts'),
        publicPath: 'assets/scripts/'
    },
    devtool: 'cheap-source-map'

    /*
     * DevServer: {
     *     contentBase: './'
     * }
     */
};

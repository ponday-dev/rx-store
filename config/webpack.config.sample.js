const path = require('path');
const baseConfig = require('./webpack.config.base');

const sampleCofig = {
    entry: {
        'ts/app': path.resolve(__dirname, '../src/sample/ts/app.ts'),
        'js/app': path.resolve(__dirname, '../src/sample/js/app.js')
    },
    output: {
        path: path.join(__dirname, '..', 'dist', 'sample'),
        filename: '[name].js'
    },
};

module.exports = function (options) {
    return Object.assign(sampleCofig, baseConfig);
}

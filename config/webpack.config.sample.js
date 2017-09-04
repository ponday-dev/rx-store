const path = require('path');
const baseConfig = require('./webpack.config.base');

const sampleCofig = {
    entry: {
        app: path.resolve(__dirname, '../src/sample/app.ts')
    },
    output: {
        path: path.join(__dirname, '..', 'dist', 'sample'),
        filename: '[name].js'
    },
};

module.exports = function (options) {
    return Object.assign(sampleCofig, baseConfig);
}

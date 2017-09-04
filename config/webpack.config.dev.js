const path = require('path');
const baseConfig = require('./webpack.config.base');

const devCofig = {
    entry: {
        app: path.resolve(__dirname, '../src/lib/index.ts')
    },
    output: {
        path: path.join(__dirname, '..', 'dist', 'lib'),
        filename: 'rx-store.js'
    },
};

module.exports = function (options) {
    return Object.assign(devCofig, baseConfig);
}

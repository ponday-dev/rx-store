const path = require('path');
const baseConfig = require('./webpack.config.base');

const libraryName = 'rx-store';

const devCofig = {
    entry: path.resolve(__dirname, '../src/lib/rx-store.ts'),
    output: {
        path: path.join(__dirname, '..', 'dist', 'lib'),
        filename: `${libraryName}.js`,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
};

module.exports = function (options) {
    return Object.assign(devCofig, baseConfig);
}

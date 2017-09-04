const path = require('path');

module.exports = {
    resolve: {
        extensions: [ '.js', '.ts' ],
        alias: {
            '~': path.join(__dirname, '..', 'src')
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [ 'babel-loader' ]
            },
            {
                test: /\.ts$/,
                use: [ 'babel-loader', 'ts-loader' ]
            }
        ]
    }
};

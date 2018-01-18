const path = require('path');

module.exports = {
	entry: {
		app: path.resolve(__dirname, '..', 'src', 'index.ts'),
	},
	output: {
		path: path.join(__dirname, '..', 'dist'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: [ 'ts-loader' ]
			}
		]
	},
	resolve: {
		extensions: [ '*', '.ts', '.js' ],
		alias: {
			'~': path.join(__dirname, '..', 'src')
		}
	}
};
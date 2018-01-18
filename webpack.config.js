const config = require('./config/webpack.config.base.js');
const merge = require('lodash').merge;

module.exports = function(env) {
	if (env && env.lib) {
		const libConfig = require('./config/webpack.config.lib.js')(env.lib);
		return merge(config, libConfig);
	}
	return config;
}

module.exports = function (libraryName, target='umd') {
	return {
		output: {
			filename: `${libraryName}.lib.js`,
			library: libraryName,
			libraryTarget: target,
			umdNamedDefine: true
		}
	};
};

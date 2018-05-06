const apps = [];
const os = require('os');

apps.push({
	name: 'webpackDevServer',
	script: 'npm',
	watch: false,
	interpreter: 'none',
	args: 'run webpackDevServer',
	autorestart: true
});

apps.push({
	name: 'OF',
	script: 'npm',
	watch: false,
	interpreter: 'none',
	args: `run OF:${os.platform()}`,
	autorestart: true
});

apps.push({
	name: 'electron',
	script: 'npm',
	watch: false,
	interpreter: 'none',
	args: 'run electron',
	autorestart: true
});

apps.push({
	name: 'newRelic',
	script: 'npm',
	watch: false,
	interpreter: 'none',
	args: 'run newRelic',
	autorestart: true
});

module.exports = {
	apps
};

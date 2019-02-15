const path = require('path');
const fs = require('fs');
const map = require('lodash/map');
const forIn = require('lodash/forIn');
const keys = require('lodash/keys');
const filter = require('lodash/filter');
const get = require('lodash/get');
const set = require('lodash/set');
const has = require('lodash/has');
const unset = require('lodash/unset');

const DEV = 'development';
const PROD = 'production';
const STAG = 'staging';
const TEST = 'test';

const ENV_MAPPINGS = {
	dev: DEV,
	d: DEV,
	prod: PROD,
	p: PROD,
	stag: STAG,
	s: STAG,
	t: TEST
};

let _tmp_env = process.env.CONFIG_PATH || 'development';
const ENV =  ENV_MAPPINGS[_tmp_env] || _tmp_env;

/**
 * @param options.immutable {Boolean} Config is immutable
 * @param options.root {String} where to search configs
 * @param options.parsers {Object} parsers for files
 * @param options.env {String} Sets environment type
 * @return {self}
 */
class Config {
	constructor(options) {
		this.config = options;
		this.initialize();
	}

	initialize() {
		this.cache = {};
		this.root = [this.config.root, this.config.env || ENV].join(path.sep);
		this.loaders = Config.loaders;
		this.files = filter(
			discoverFiles(this.root, true),
			file => keys(this.loaders).includes(path.extname(file).slice(1))
		);
		this.cleanCache();
	}

	get (route) {
		const key = this.extractKeyFromRoute(route);
		const localRoute = route.slice(key.length + 1);
		const content = this.getContentByKey(key);
		if (!localRoute) return content;
		return get(content, localRoute);
	}

	has (route) {
		const key = this.extractKeyFromRoute(route);
		return has(
			this.getContentByKey(key),
			route.slice(key.length + 1)
		);
	}

	set (route, value) {
		const key = this.extractKeyFromRoute(route);
		return set(
			this.getContentByKey(key),
			route.slice(key.length + 1),
			value
		);
	}

	unset (route) {
		const key = this.extractKeyFromRoute(route);
		return unset(
			this.getContentByKey(key),
			route.slice(key.length + 1)
		);
	}

	cleanCache () {
		let key = '';

		forIn(this.files, file => {
			key = file
				.replace(this.root + path.sep, '')
				.replace(path.extname(file), '')
				.replace(path.sep, '.');

			file = path.resolve(file);
			this.cache[key] = { file };
		});
	}

	getContentByKey (key) {
		if (!this.cache[key].content) {
			this.cache[key].content = require(this.cache[key].file);
		}
		return this.cache[key].content;
	}

	extractKeyFromRoute (route) {
		let key = '';
		forIn(keys(this.cache), k => {
			if (route.indexOf(k) === 0 && key.length < k.length) {
				key = k;
			}
		});
		return key;
	}
}

/**
 * @return {Array}
 */
function discoverFiles (files, recursive, extensions) {
	if (typeof files === 'string') files = [files];
	let result = [];
	let filePathRelative = '';
	let fileStat = {};
	forIn(files, filePath => {
		filePathRelative = filePath;
		filePath = path.resolve(filePath);
		fileStat = fs.statSync(filePath);
		if (recursive && fileStat.isDirectory()) {
			let dirFiles = map(fs.readdirSync(filePath), dirFile => [filePathRelative, dirFile].join(path.sep));
			result = result.concat(discoverFiles(dirFiles, recursive))
		} else if (!fileStat.isDirectory()) {
			result.push(filePathRelative);
		}
	});
	return result;
}
Config.loaders  = {
	'js': require,
	'json': require
};

module.exports = Config;

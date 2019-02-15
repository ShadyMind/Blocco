import path from 'path';
import fs, { Stats } from 'fs';
import { map, flattenDeep, forIn, keys, filter, get, set, has, unset } from 'lodash';
import { ENV_MAPPINGS, BLOCO_CONFIG_DEFAULTS, IBlocoLoaderConfig } from './constants';

let _env = process.env.CONFIG_PATH || 'development';
const ENV = ENV_MAPPINGS[_env] || _env;


interface IBlocoLoaderOptions {
    immutable?: boolean
    root?: string
    env?: string
}

interface ILoadersObject {
    [extName: string]: {
        async?: (filepath: string) => Promise<any>
        sync: (filepath: string) => any
    }
}

export default class Bloco {
    config: IBlocoLoaderConfig
    root: string;
    loaded: boolean;
    cache: {
        [fileKey: string]: {
            /* @todo its temporary solution fix it  */
            [fileAttrName: string]: any
        }
    }
    files: string[]

    public static loaders: ILoadersObject = {
        'js': { sync: require },
        'json': { sync: require }
    }

    /**
     * 
     * @param files 
     * @param recursive 
     * @todo
     *    * Decide whether to add an option with extensions
     */ 
    constructor (options: IBlocoLoaderOptions) {
        this.config = Bloco.resolveOptions(options);
        this.cache = {};
        this.root = `${this.config.root}${path.sep}${this.config.env || ENV}`;
    }

    public async load (): Promise<void> {
        this.files = filter(
			await Bloco.discoverFiles(this.root, true),
			file => keys(Bloco.loaders).includes(path.extname(file).slice(1))
		);
        this.rebuildCache();
        this.loaded = true;
    }   
    
    public async has (route: string): Promise<any> {
		const key = this.extractKeyFromRoute(route);
		return has(
			await this.getContentByKey(key),
			route.slice(key.length + 1)
		);
	} 

	public async get (route: string): Promise<any> {
		const key = this.extractKeyFromRoute(route);
		const localRoute = route.slice(key.length + 1);
		const content = await this.getContentByKey(key);
		if (!localRoute) return content;
		return get(content, localRoute);
    }

	public async set (route: string, value: any): Promise<any> {
		const key = this.extractKeyFromRoute(route);
		set(
			await this.getContentByKey(key),
			route.slice(key.length + 1),
			value
        );
        return this;
	}

	public async unset (route: string):  Promise<any> {
		const key = this.extractKeyFromRoute(route);
		unset(
			await this.getContentByKey(key),
			route.slice(key.length + 1)
        );
        return this;
    }

    public hasSync (route: string): any {
		const key = this.extractKeyFromRoute(route);
		return has(
			this.getContentByKeySync(key),
			route.slice(key.length + 1)
		);
    }

    public getSync (route: string): any {
		const key = this.extractKeyFromRoute(route);
		const localRoute = route.slice(key.length + 1);
		const content = this.getContentByKeySync(key);
		if (!localRoute) return content;
        return get(content, localRoute);
    }

    public setSync (route: string, value: any): any {
		const key = this.extractKeyFromRoute(route);
		set(
			this.getContentByKeySync(key),
			route.slice(key.length + 1),
			value
        );
        return this;
    }

    public unsetSync (route: string): any {
		const key = this.extractKeyFromRoute(route);
		unset(
			this.getContentByKeySync(key),
			route.slice(key.length + 1)
        );
        return this;
    }

    private static resolveOptions (options: IBlocoLoaderOptions): IBlocoLoaderConfig {
        return Object.assign(options, BLOCO_CONFIG_DEFAULTS);
    }

    private static async discoverFiles (files: string[] | string, recursive: boolean): Promise<string[]> {
        if (typeof files === 'string')
            files = [files];

        let fileStats = await Promise.all(
            files.map(filePath => new Promise((resolve, reject) => {
                fs.stat(path.resolve(filePath), (err, stat) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(stat);
                });
            }))
        )
        let fileList = await Promise.all(
            /* @TODO think how we can avoid access by "i" */
            fileStats.map((stats: Stats, i: number) => {
                if (!stats.isDirectory())
                    return Promise.resolve(files[i]);
                else if (recursive)
                    return new Promise((resolve, reject) => {
                        let dir = files[i];
                        fs.readdir(dir, (err, files) => {
                            if (err) {
                                return reject(err);
                            }
                            let j = i;
                            Bloco.discoverFiles(map(files, f => `${dir}${path.sep}${f}`), recursive).then(resolve);
                        });
                    });
                else
                    return Promise.resolve(null);
            })
        );

        return flattenDeep(fileList);
    }

    protected static getKeyByFilepath (root: string, file: string): string {
        return file
            .replace(root + path.sep, '')
            .replace(path.extname(file), '')
            .replace(path.sep, '.');
    }
    
	protected rebuildCache (): void {
        forIn(this.files, (file: string) =>
			this.cache[Bloco.getKeyByFilepath(this.root, file)] = { file: path.resolve(file) }
		);
    }

    protected async getContentByKey (key: string): Promise<any> {
        if (!this.cache[key]) {
            console.error('Could not find config with given key');
        }
        
		if (!this.cache[key].content) {
            let fileExt = path.extname(this.cache[key].file).substr(1);

            if (Bloco.loaders[fileExt]) {
                let loader = typeof Bloco.loaders[fileExt].async === 'function'
                    ? Bloco.loaders[fileExt].async
                    : Bloco.loaders[fileExt].sync;
                this.cache[key].content = await loader(this.cache[key].file);
            } else {
                this.cache[key].content = require(this.cache[key].file);
            }
		}
		return this.cache[key].content;
    }
    
    private getContentByKeySync (key: string): any {
        if (!this.cache[key]) {
            console.error('Could not find config with given key');
        }
        
		if (!this.cache[key].content) {
            let fileExt = path.extname(this.cache[key].file).substr(1);
            this.cache[key].content = Bloco.loaders[fileExt].sync(this.cache[key].file);

        }
		return this.cache[key].content;
        
    }

	private extractKeyFromRoute (route: string): string {
		let key = '';
		forIn(keys(this.cache), (k: string) => {
			if (route.indexOf(k) === 0 && key.length < k.length) {
				key = k;
			}
		});
		return key;
	}
}
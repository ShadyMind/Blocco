import test from 'ava';
import Settings from '../src';

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

test('Should successfuled initialized', t => {
    // @ts-ignore: Unreachable code error
    const { settings } = t.context;
    t.true(settings.loaded);
});

test('Should load correct list of files', t => {
    // @ts-ignore: Unreachable code error
    const { settings } = t.context;

    t.deepEqual(
        settings.files.map(f => f.replace(settings.root, '')),
        [
            '\\auth.js',
            '\\db\\connection.js',
            '\\db.json',
            '\\webpack.yaml'
        ]
    );
});

test('Should load configs (like .json, .js, .ts, .yaml etc.)', async t => {
    // @ts-ignore: Unreachable code error
    const { settings } = t.context;
    const db = await settings.get('db');
    const webpack = await settings.get('webpack');
    const auth = await settings.get('auth');
    
    t.pass();
});

test('Read correct data form file', t => {    
    // @ts-ignore: Unreachable code error
    // const { settings } = t.context;
    t.pass();
});

test('Return data from file by path', t => {    
    // @ts-ignore: Unreachable code error
    // const { settings } = t.context;
    t.pass();
});

test('Resolve data between files and objects', t => {    
    // @ts-ignore: Unreachable code error
    // const { settings } = t.context;
    t.pass();
});

test.beforeEach(async t => {
    t.context = {
        settings: new Settings({
            root: __dirname
        })
    };
    // @ts-ignore: Unreachable code error
    await t.context.settings.load();
});

Settings.loaders['yaml'] = Settings.loaders['yml'] = {
    async: filepath => new Promise((resolve, reject) => {
        filepath = path.resolve(__dirname, filepath);
        fs.access(filepath, fs.constants.R_OK, (err) => {
            if (err) {
                reject(err);
            }

            fs.readFile(filepath, (err, content) => {
                if (err) {
                    reject(err);
                }

                resolve(yaml.safeLoad(content.toString(), 'utf8'));
            });
        });
    }),
    sync: filepath => yaml.safeLoad(fs.readFileSync(filepath), 'utf8')
}


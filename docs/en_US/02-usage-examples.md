# Usage & Examples

<table border="0" width="888">
    <tr>
        <td width="296" align="left">
            <a href="./01-api.md">< Prev.: API</a>
        </td>
        <td width="296" align="center">
            <a href="./00-readme.md">Back to main</a>
        </td>
        <td width="296" align="right">
        </td>
    </tr>
</table>

### Examples
File structure example:

<img src="./filetree-00.svg" />

| **Notice**: | the contents of the files listed below is an example; it is not necessary to use this particular data. |
|--:|:--|

#### File: `ProjectRoot/index.js`
```js
const Koa = require('koa');
const Settings = require('settings');

const app = new Koa();
const settings = new Settings({
    root: 'settings',
    env: 'prod'
});

(async () => {
    await settings.load();
    app.listen(settings.get('app.port'));
})();
```

#### File: `ProjectRoot/settings/**/app.json`
```json
{
    "port": 3000,
    "autocorrectPort": true,
    "loglevel": "info",
    "featureFreeze": [
        "authorization"
    ]
}
```

#### File: `ProjectRoot/settings/**/db.json`
```json
{
    "client": "pg",
    "connection": {
        "host": "127.0.0.1",
        "user": "postgres",
        "password": "SUP3RS3CR3T",
        "database": "stream_dev"
    }
}
```

### Usage
Usage with [knex](https://github.com/tgriesser/knex) and `async/await` syntax construction
```javascript
const Settings = require('Blocco');
const Knex = require('kneex');
const settings = new Settings({
    environment: 'test',
    immutable: true,
    root: './settings'
});

(async () => {
    await settings.load();
    const knex = Knex(settings.get('db'));
})();
```

<table border="0" width="888">
    <tr>
        <td width="296" align="left">
            <a href="./01-api.md">< Prev.: API</a>
        </td>
        <td width="296" align="center">
            <a href="./00-readme.md">Back to main</a>
        </td>
        <td width="296" align="right">
        </td>
    </tr>
</table>

![](./footer.svg)
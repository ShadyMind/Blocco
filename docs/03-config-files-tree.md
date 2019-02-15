[ < Back to readme](../readme.md)
# ![](./logo-xs-w.png)
```filetree
ProjectRoot
 ├ settings
 | ├ development
 | | ├db.json
 | | └app.js
 | ├ test
 | | ├db.json
 | | └app.js
 | └ production
 |   ├db.json
 |   └app.js
 └ index.js
```

`ProjectRoot/settings/**/db.json`
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

`ProjectRoot/settings/**/app.json`
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

`ProjectRoot/index.js`
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
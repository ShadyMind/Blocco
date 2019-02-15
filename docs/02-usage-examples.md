[ < Back to readme](../readme.md)
# ![](./logo-xs-w.png) Usage & Examples
Usage with knex and async/await syntax construction
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
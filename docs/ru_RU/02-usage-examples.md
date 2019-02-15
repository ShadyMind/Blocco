[ < Назад к основной странице](./00-readme.md)

# <img src="../images/logo-xs-w.png" style="vertical-align:middle" /> Использование и примеры
Использование с модулем [Knex](https://github.com/tgriesser/knex) и синтаксическими конструкциями `async/await`:
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
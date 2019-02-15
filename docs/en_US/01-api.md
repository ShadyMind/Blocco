[ < Back to readme](../readme.md)
# <img class="avatar" src="../images/logo-xs-w.png" style="vertical-align:middle" /> API
|       Entity     |   Type     |         Input       |      Output     |                 Description                 |
|---|---|---|---|---|
|`Bloco#load(void)`| `Function` |           —         | `Promise<void>` | Initialize search and build directory tree. |
|`Bloco#has`       | `Function` | `route {String}` |    `boolean`    | Check property or file existance. If file not loaded yet, trying to load file. Returns `true` if the property of file exists, else `false`. |
|`Bloco#get`       | `Function` | `route {String}` |      `any`      | Get property or config content from config by `dataPath` argument formatted as: `xxx.yyy.zzz` (open file `xxx.json`, then return from file value from `xxx[yyy][zzz]` section). If file not loaded yet, trying to load file. |
|`Bloco#set`       | `Function` | `route {String}`, `value {any}` | `any` | Returns config file data or property. |
|`Bloco#unset`     | `Function` | `route {String}` | `boolean` | Returns `true` if the property is deleted, else `false`. |
|`Bloco::loaders`  | `Object`   |           —         |        —        | This is store, where keeps different config loaders like `js, ts, json, yaml` etc.|
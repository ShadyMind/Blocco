[ < Back to readme](../readme.md)
# API

<table border="0" width="888">
    <tr>
        <td width="296" align="left">        
        </td>
        <td width="296" align="center">
            <a href="../../readme.md">Back to main</a>
        </td>
        <td width="296" align="right">
            <a href="./02-usage-examples.md">Next: Usage & Examples ></a>
        </td>
    </tr>
</table>

## Options
|Name|ОExpected type/value|Description|
|---|---|---|
| `immutable` |  `boolean`  | Whether to allow changing values in the read configurations.If `true`, then methods `Blocco#set`, `Blocco#unset`, `Blocco#setSync` and `Blocco#unsetSync` will thrown an exceptions. |
|    `root`   |   `string`  | Path, where to find config. |
|    `env`    |   `string`  | The name of the environment to be used. |

## Methods
|       Name     |   Type     |         Input       |      Output     |                 Description                 |
|---|---|---|---|---|
|`Bloco#load(void)`| `Function` |           —         | `Promise<void>` | Initialize search and build directory tree. |
|`Bloco#has`       | `Function` | `route {String}` |    `boolean`    | Check property or file existance. If file not loaded yet, trying to load file. Returns `true` if the property of file exists, else `false`. |
|`Bloco#get`       | `Function` | `route {String}` |      `any`      | Get property or config content from config by `dataPath` argument formatted as: `xxx.yyy.zzz` (open file `xxx.json`, then return from file value from `xxx[yyy][zzz]` section). If file not loaded yet, trying to load file. |
|`Bloco#set`       | `Function` | `route {String}`, `value {any}` | `any` | Returns config file data or property. |
|`Bloco#unset`     | `Function` | `route {String}` | `boolean` | Returns `true` if the property is deleted, else `false`. |
|`Blocco#hasSync`   | `Function` | `route {String}` |    `boolean`    | Same as `Blocco#has`, except synchronous execution. |
|`Blocco#getSync`   | `Function` | `route {String}` |      `any`      | Same as `Blocco#get`, except synchronous execution. |
|`Blocco#setSync`   | `Function` | `route {String}`, `value {any}` | `any` | Same as `Blocco#set`, except synchronous execution. |
|`Blocco#unsetSync` | `Function` | `route {String}` |    `boolean`    | Same as `Blocco#unset`, except synchronous execution. |
|`Blocco#changeEnv` | `Function` | `name {String}`  |    `boolean`    | Change environment. |

## Properties
|       Name    |   Type     |                 Description                 |
|---|---|---|
|`Bloco::loaders`  | `Object`   | The object from which parsers are used for files such as `js`, `ts`, `json`, `yaml` etc. By default, used `js` and `json`. |

<table border="0" width="888">
    <tr>
        <td width="296" align="left">        
        </td>
        <td width="296" align="center">
            <a href="../../readme.md">Back to main</a>
        </td>
        <td width="296" align="right">
            <a href="./02-usage-examples.md">Next: Usage & Examples ></a>
        </td>
    </tr>
</table>

![](./footer.svg)
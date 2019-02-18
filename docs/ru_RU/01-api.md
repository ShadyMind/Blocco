# API (Программный интерфейс)

## Опции
|Название|Ожидаемый тип / значения|Описание|
|---|---|---|
| `immutable` |  `boolean`  | Позволять ли изменять значения в вычитанных конфигах. Если стоит `true`, то функции `Blocco#set`, `Blocco#unset`, `Blocco#setSync` и `Blocco#unsetSync` будут бросать исключения. |
|    `root`   |   `string`  | Путь, по которому будут искаться конфиги. |
|    `env`    |   `string`  | Название окружения, которое будет использоваться. |

## Методы
|       Название    |   Тип    |         Аргументы    |   Возвращает    |                 Описание                 |
|---|---|---|---|---|
|`Blocco#load(void)`| `Function` |        —         |  `Promise<void>`   | Инициализирует загрузчик и выстраивает дерево файлов-конфигов |
|`Blocco#has`       | `Function` | `route {String}` | `Promise<boolean>` | Проверяет свойство конфигов на наличие. Если файл не был загружен, файл будет вычитан. Возвращает `true`, если свойство существует, иначе возвращает `false`. |
|`Blocco#get`       | `Function` | `route {String}` |  `Promise<any>`    | Возвращает свойство конфигов по пути, переданному через аргумент `route` (формат аргумента: `xxx.yyy.zzz`). Если файл не был загружен, файл будет вычитан. |
|`Blocco#set`       | `Function` | `route {String}`, `value {any}` | `Promise<any>` | Записывает в представление дерева конфига свойство, не меняя его в файловой системе. Возвращает записанное свойство. |
|`Blocco#unset`     | `Function` | `route {String}` | `Promise<boolean>` | Удаляет свойство из представления, не меняя его в фаловой системе. Возвращает `true`, если свойство удалено, иначе `false`. |
|`Blocco#hasSync`   | `Function` | `route {String}` |    `boolean`    | Тоже самое что и `Blocco#has`, за исключением синхронного выполнения. |
|`Blocco#getSync`   | `Function` | `route {String}` |      `any`      | Тоже самое что и `Blocco#get`, за исключением синхронного выполнения. |
|`Blocco#setSync`   | `Function` | `route {String}`, `value {any}` | `any` | Тоже самое что и `Blocco#set`, за исключением синхронного выполнения. |
|`Blocco#unsetSync` | `Function` | `route {String}` |    `boolean`    | Тоже самое что и `Blocco#unset`, за исключением синхронного выполнения. |
|`Blocco#changeEnv` | `Function` | `name {String}`  |    `boolean`    | Меняет окружение. |

## Свойства
|       Название    |   Тип     |                 Описание                 |
|---|---|---|
|`Bloco::loaders`  | `Object`   | Объект, из которого берутся парсеры для файлов, таких как `js`, `ts`, `json`, `yaml` и т.д. По умолчанию установленны `js` и `json`. |

<table border="0" width="888">
    <tr>
        <td width="296" align="left">        
        </td>
        <td width="296" align="center">
            <a href="./00-readme.md">Назад к основной странице</a>
        </td>
        <td width="296" align="right">
            <a href="./02-usage-examples.md">След.: Использование и примеры ></a>
        </td>
    </tr>
</table>

![](./footer.svg)
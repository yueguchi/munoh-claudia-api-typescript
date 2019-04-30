- 元ネタ
```
+--------+----------+---------------------+------+-----------------------------------------------+------------+
| Domain | Method   | URI                 | Name | Action                                        | Middleware |
+--------+----------+---------------------+------+-----------------------------------------------+------------+
|        | PUT      | api/v1/regist/words |      | App\Http\Controllers\WordsController@putWord  | api        |
|        | GET|HEAD | api/v1/repl         |      | App\Http\Controllers\WordsController@repl     | api,cors   |
|        | GET|HEAD | api/v1/separate     |      | App\Http\Controllers\WordsController@separate | api,cors   |
|        | GET|HEAD | health              |      | Closure                                       | web        |
+--------+----------+---------------------+------+-----------------------------------------------+------------+
```

- arch

```
dtoは=response dto。
entityはデータソースを表現するのに使用する。今回ならElasticSearch。
dtoは機能要件によってたくさん定義される想定。APIが増えると同時に増えると想定。
dtoをそのままreturnすることでjsonで返るので、dtoを設計する = jsonを設計するになる。
```

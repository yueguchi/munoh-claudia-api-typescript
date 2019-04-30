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
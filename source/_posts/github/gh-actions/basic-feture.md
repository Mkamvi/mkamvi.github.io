---
title: 基本功能 - Gihub Actions
date: 2023-06-07 10:08:56
tags:
  - github
  - gh-actions
categories:
  - github
---

### 使用变量

```YAML
jobs:
  example-job:
      steps:
        - name: Connect to PostgreSQL
          run: node client.js
          env:
            POSTGRES_HOST: postgres
            POSTGRES_PORT: 5432
```

### 添加脚本到工作流程

```YAML
jobs:
  example-job:
    steps:
      - name: Run build script
        run: ./.github/scripts/build.sh
        shell: bash
```

### 在作业之间共享数据

```YAML
jobs:
  example-job:
    name: Save output
    steps:
      - shell: bash
        run: |
          expr 1 + 1 > output.log
      - name: Upload output file  # 上传
        uses: actions/upload-artifact@v3
        with:
          name: output-log-file
          path: output.log
      - name: Download a single artifact  # 下载
        uses: actions/download-artifact@v3
        with:
          name: output-log-file
```

### 表达式

```YAML
# ${{ expression }}
steps:
  - uses: actions/hello-world-javascript-action@e76147da8e5c81eaf017dede5645551d4b94427b
      if: ${{ <expression> }}
env:
  MY_ENV_VAR: ${{ <expression> }}
env:
  myNull: ${{ null }}
  myBoolean: ${{ false }}
  myIntegerNumber: ${{ 711 }}
  myFloatNumber: ${{ -9.2 }}
  myHexNumber: ${{ 0xff }}
  myExponentialNumber: ${{ -2.99e-2 }}
  myString: Mona the Octocat
  myStringInBraces: ${{ 'It''s open source!' }}
```

##### 运算符(JS 通用)

##### 函数

- contains( search, item )

- startsWith( searchString, searchValue )

- endsWith( searchString, searchValue )

- format( string, replaceValue0, replaceValue1, ..., replaceValueN)

- join( array, optionalSeparator )

- toJSON(value)

- fromJSON(value)

- hashFiles(path)

- success()  如果前面的步骤都没有失败或被取消，则返回 true。

- always()

- cancelled()

- failure()

- {% raw%} * {% endraw %} 对象过滤器

```YAML
[
  { "name": "apple", "quantity": 1 },
  { "name": "orange", "quantity": 2 },
  { "name": "pear", "quantity": 1 }
]
```
筛选器 fruits.*.name 返回数组 [ "apple", "orange", "pear" ]。

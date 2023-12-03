---
title: Math - 源码阅读 · lodash
date: 2023-12-3 10:06:54
tags:
  - 源码阅读
  - lodash
categories:
  - 源码阅读
  - lodash
---

### Math

##### _.add()

1. 函数生成函数
2. baseToNumber(): 处理了Symbol, 其他使用了 **+** 操作符转换
3. baseToString(): 处理了Array，Symbol，-0(-0 === 0，所以使用 1 / -0 === Number.NEGATIVE_INFINITY)
4. 相加的两个参数有一个为字符串，则以字符串的规则相加(和原生JS的+运算符操作类似)
5. 处理了undefined
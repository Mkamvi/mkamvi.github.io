---
title: Function - 源码阅读 · lodash
date: 2023-12-16 15:46:11
tags:
  - 源码阅读
  - lodash
categories:
  - 源码阅读
  - lodash
---

### Function

##### _.after(n, func)

> 返回一个函数，在该函数调用n次后执行func函数，这个在多个异步操作中确认所有任务都结束时感觉非常有用

实现原理是借助闭包将n存储作计数用
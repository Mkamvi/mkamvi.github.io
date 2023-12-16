---
title: Object - 源码阅读 · lodash
date: 2023-12-16 16:02:09
tags:
  - 源码阅读
  - lodash
categories:
  - 源码阅读
  - lodash
---

### Object

##### _.at(object, [paths])

> 返回一个由数组path作为key从object取到的所有值集合，这个可以很方便的从一个杂乱的对象数组中快速索引到想要获取到的一些对象或值

path取值的实现是通过while循环，索引对象key而获得最终值
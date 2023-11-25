---
title: Array - 源码阅读 · lodash
date: 2023-11-25 17:02:20
tags:
  - 源码阅读
  - lodash
categories:
  - 源码阅读
  - lodash
---

### \_.slice()

##### 和原生 Array.slice 的区别

1. 返回的是一个密集数组，原生的有可能会返回一个稀疏数组
2. 稀疏数组在迭代器里不会执行

##### 源码细节

1. 使用 \>\>\> 0 无符号右移运算符处理有可能的异常情况，将非整数变成一个整数
2. 然后使用 while 循环做了一次浅拷贝

##### 源码

```JavaScript
function slice(array, start, end) {
    let length = array == null ? 0 : array.length;
    if (!length) {
        return [];
    }
    start = start == null ? 0 : start;
    end = end === undefined ? length : end;

    if (start < 0) {
        start = -start > length ? 0 : length + start;
    }
    end = end > length ? length : end;
    if (end < 0) {
        end += length;
    }
    length = start > end ? 0 : (end - start) >>> 0;
    start >>>= 0;

    let index = -1;
    const result = new Array(length);
    while (++index < length) {
        result[index] = array[index + start];
    }
    return result;
}
```

HoHo !

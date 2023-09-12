---
title: Vue中不展示Tooltip问题- echarts
date: 2023-09-12 11:08:37
tags:
  - echarts
categories:
  - echarts
---

### echarts 实例在 Vue3 中不能是一个响应式对象，否则提示框会显示不出来!

可以使用 shallowRef 代替 ref !

### 参考

1. https://blog.51cto.com/lenglingx/7050251

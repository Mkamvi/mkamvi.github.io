---
title: Vue3中定义组件name - Vue
date: 2023-11-24 11:39:07
tags:
  - Vue
categories:
  - Vue
---

### 背景

想要方便的通过组件名称在 vue dev tool 中查看对应的组件结构，选项式 API 可以通过设置 name 达到这一目的

### Vue3.0

默认是通过的文件名称展示，不太灵活；除此之外，还可以通过 defineOptions()函数

```VUE
defineOptions({
  name: 'ComponentNameYouWant'
})
```

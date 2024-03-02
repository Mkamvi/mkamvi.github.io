---
title: Html - 面试
date: 2024-2-22 17:15:11
tags:
  - 面试
categories:
  - 面试
---

## 面试题

### 语义化

#### 为什么要语义化

- 用最恰当的标签标记内容
- 在没有CSS的情况下，也能很好地呈现出页面内容
- 代码结构清晰，利于维护
- 方便其他设备解析（屏幕阅读器）
- 利于SEO

#### 最佳实践

- 部分标签自身带有样式（如p）,对兼容特殊设备有利
- 注意样式标签(i、b、font、u等)和语义化标签的区别
- 注意既有样式又有语义的标签使用场景，如strong、em

### 全部标签含义

- article、aside、nav、section都能够包含header和footer
- 可以同时有多个nav标签，如一个是全网站的导航，另一个是当前页面的导航
- article(完整性和独立性)和section(结构性)的区别
- [更多](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element)

### 移动端适配

- 媒体查询
- 相对单位
- 像素、DPR、PPI
- 自适应和响应式
- viewport
- flex/grid

### 本地存储

- Cookie
- SessionStorage
- LocalStorage
- IndexedDB
- WebSql(已废弃, chrome也已不推荐)

### Web Components

### iframe

### Web Worker

### 浏览器渲染过程

- DOM树构建
- CSS树构建
- 渲染树构建
- 页面布局
- 页面绘制
- 重绘
- 回流

### 首屏白屏时间

- 计算
- 指标

### SEO

- TDK(title、description、keywords)

### script标签

- defer
- async

### meta标签

- viewport:

### img

- srcset

### i、em、bold、strong标签

### label标签

### 渐进增强和优雅降级

### HTML 5 拖追API

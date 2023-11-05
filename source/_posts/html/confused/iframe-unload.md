---
title: iframe在被移除的时候未触发beforeunload事件
date: 2023-11-05 11:17:02
tags:
  - HTML
  - Iframe
categories:
  - HTML
---

### 原因分析

beforeunload 事件仅当浏览器窗口关闭或者刷新时才会触发

### 如何监听 iframe 移除

可以使用 unload/pagehide 事件代替

1. unload 事件当文档或一个子资源正在被卸载时触发
2. pagehide 事件当浏览器在显示与会话历史记录不同的页面的过程中隐藏当前页面时触发

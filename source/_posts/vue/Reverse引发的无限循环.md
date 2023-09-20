---
title: 由Array.reverse引发的血案 - Vue
date: 2023-09-20 10:21:46
tags:
  - Vue
categories:
  - Vue
---

### 起因

项目部署后访问页面，竟然直接卡死 ！

### 原因

Array.reverse() 竟然直接修改原数组！然后 Vue 里面便形成了 监听变化 => 修改元素组 => 变化 => 监听变化 的无限循环中！

(一直以为是返回新数组！所以排查到是因为 reverse 调用引起的问题时，大吃一惊！)

---
title: WebSocket - Web
date: 2023-11-28 19:04:32
tags:
  - Web
categories:
  - Web
---

### 设计关键点

1. onopen 事件确认连接建立
2. 确认连接后可发送 send 事件
3. 监听 message 事件获取后台推送消息
4. 设计断线重连机制
5. 不需要时及时调用 close 方法销毁

---
title: 第3章 HTTP报文内的HTTP信息 - 计算机网络 · 《图解HTTP》
date: 2024-03-23 15:05:45
tags:
  - 计算机网络
categories:
  - 计算机网络
---

### 报文结构

- 请求行
- 状态行
- 首部字段
- 其他

### 编码传输

- 报文 HTTP通信的基本单位，8位组成字节流
- 实体 请求或响应的有效载荷数据

### 压缩传输

- gzip GNU zip
- compress UNIX系统标准压缩
- deflate zlib
- identity 不进行编码

### 分块传输

- Transfer Coding

### 多种数据的多部分对象集合

- multipart/form-data 文件上次
- multipart/byteranges 206，响应报文包含多个范围的内容

### 范围请

- Range 指定资源的byte范围

### 内容协商

- Accept
- Accept-Charset
- Accept-Encoding
- Accept-Language
- Content-Laguage
- 服务器驱动协商
- 客户端驱动协商
- 透明协商

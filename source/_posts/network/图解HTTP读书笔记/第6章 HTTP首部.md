---
title: 第6章 HTTP首部 - 计算机网络 · 《图解HTTP》
date: 2024-03-28 07:34:23
tags:
  - 计算机网络
categories:
  - 计算机网络
---

### 通用首部字段

- Cache-Control 控制缓存的行为

  ```HTTP
  Cache-Control: private, max-age=0, no-cache
  ```

  | 指令          | 参数 | 说明                       |
  | ------------- | ---- | -------------------------- |
  | no-cache      | 无   | 强制向源服务器再次验证     |
  | no-store      | 无   | 不缓存请求或响应的任何内容 |
  | max-age= [秒] | 必须 | 响应的最大Age值            |

- Connection 逐跳首部、连接的管理
- Date 创建报文的日期时间
- Pragma 报文指令
- Trailer 报文末端的首部一览
- Transfer-Encoding 指定报文主体的传输编码方式
- Upgrade 升级为其他协议
- Via 代理服务器的相关信息
- Warning 错误通知

### 请求首部字段

- Accept 用户代理可以处理的媒体类型
- Accept-Charset 优先的字符集
- Accept-Encoding 优先的内容编码
- Accept-Language 优先的语言
- Authorization Web的认证信息
- Expect 期待服务器的特定行为
- From 用户的电子邮箱地址
- Host 请求资源所在的服务器
- If-Match 比较实体标记(ETag)
- If-Modified-Since 比较资源的更新时间
- If-None-Match 比较实体标记(与If-Match相反)
- If-Range 资源未更新时发送实体Byte的范围请求
- if-Unmodified-Since 比较资源的更新时间(与If-Modified-Since相反)
- Max-Forwards 最大传输逐跳数
- Proxy-Authorization 代理服务器要求客户端的认证信息
- Range 实体的字节范围请求
- Referer 对请求中的URI的原始获取方
- TE 传输编码的优先级
- User-Agent HTTP客户端程序的信息

### 响应首部字段

- Accept-Ranges 是否接受字节范围请求
- Age 推算资源创建经过时间
- ETag 资源的匹配信息
- Location 令客户端重定向至指定的URI
- Proxy-Authenticate 代理服务器对客户端的认证信息
- Retry-After 对再次发起请求的时机要求
- Server HTTP服务器的安装信息
- Vary 代理服务器缓存的管理信息
- WWW-Authenticate 服务器对客户端的认证信息

### 实体首部字段

- Allow 资源可支持的HTTP方法
- Content-Encoding 实体主体适用的编码方式
- Content-Language 实体主体的自然语音
- Contnnent-Length 实体主体的大小
- Content-Location 替代对应资源的URI
- Content-MD5 实体主体的报文摘要
- Content-Range 实体主体的位置范围
- Cotent-Type 实体主体的媒体类型
- Expires 实体主体的过期的日期时间
- Last-Modified 资源的最后修改日期时间

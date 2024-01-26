---
title: SSH断联问题 - Linux
date: 2024-01-26 17:58:01
tags:
  - Linux
categories:
  - Linux
---

### 问题描述

通过 ssh user@ip 登录远程服务器，隔一段时间不操作后会自动端口，导致本地的终端无法操作

### 解决方案

修改/etc/ssh/sshd_config文件

```Apache
ClientAliveInterval 60
ClientAliveCountMax 3
```

### 参考

https://cloud.tencent.com/developer/article/1788071

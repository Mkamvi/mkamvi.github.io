---
title: ssh无法连接问题 - Github
date: 2024-01-25 14:09:11
tags:
  - github
categories:
  - github
---

### 问题描述

使用SSH无法连接到Github，最后显示重超时，但改用http可以正常拉取代码

### 解决方案

在~/.ssh/config中添加gihutb的配置

```sshconfig
Host github.com
 Hostname ssh.github.com
 Port 443
```

### 参考

https://stackoverflow.com/questions/15589682/ssh-connect-to-host-github-com-port-22-connection-timed-out

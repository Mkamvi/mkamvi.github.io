---
title: 无法使用group问题 - Nexus
date: 2023-11-21 17:41:07
tags:
  - Nexus
categories:
  - Nexus
---

### npm login 无法登录

npm config设置了registry也无效，需要直接在命令后添加--registry


### npm intall 无法安装依赖，提示401

1. 确认配置npm Bearer Token Realm，使其处于active
2. 确认group的地址完全一致，包含最后一个 '/'
3. 删除npm鉴权缓存，重新登录

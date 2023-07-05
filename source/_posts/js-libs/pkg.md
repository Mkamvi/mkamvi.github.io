---
title: 将NodeJS应用打成一个可执行文件
date: 2023-07-05 17:04:28
tags:
  - js-libs
categories:
  - js-libs
---

### 核心命令

```cmd
pkg [options] <input>
```

### 核心参数说明

- -t: 指定目标类型，多个类型可用逗号分隔添加
- -c: 指定配置文件
- --out-path: 指定输出目录
- -d: 显示 debug 信息，可以看到虚拟目内的文件结构，但因为加载了 node_modules，有点没法看

### 目标类型

target 分为三个部分，使用中划线分隔：[node 版本]-[平台]-[系统架构]

示例：node12-win-x64

- node 版本: (node8), node10, node12, node14, node16 or latest
- 平台: alpine, linux, linuxstatic, win, macos, (freebsd)
- 系统架构: x64, arm64, (armv6, armv7)

Mac 和 Window 系统一般为：

- Mac: node14-macos-arm64
- Window: node14-win-x64

*Tips: Mac支持打出Window版本执行文件*

### 配置文件

在 package.json 中加入如下部分：

```json
"pkg": {
    "scripts": "build/**/*.js",
    "assets": [ "assets", "images" ],
    "targets": [
      "node14-macos-arm64",
      "node14-win-x64"
    ],
    "outputPath": "dist"
  }
```

- scripts: 这个没看懂
- assets: 指定需要额外打包的外部资源

### 快照文件系统
在打包的过程中，pkg会收集项目文件并把它们放到可执行文件内部(叫做快照)，在应用执行过程中可以获取所有快照内文件

快照结构：/snapshot/项目名称/..资源路径

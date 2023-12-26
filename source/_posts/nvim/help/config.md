---
title: 配置 - Nvim · 帮助文档
date: 2023-12-26 09:42:39
tags:
  - Nvim
  - Vim
  - VimHelp
categories:
  - Vim
  - Nvim
  - VimHelp
---

### vimrc 文件

> :edit $MYVIMRC // 在编辑器中执行即可打开配置文件

- ~/.config/nvim/init.vim (Unix and OSX)
- ~/AppData/Local/nvim/init.vim (Windows)

### 添加一个包(package)

- 启动时自动加载
- 可选包

> packadd

内置的包管理器

### 添加一个插件

- 全局插件(所有文件类型, 目录为~/.local/share/nvim/site/plugin)
- 指定文件类型插件(插件目录为~/.local/share/nvim/site/plugin)

##### 为一种文件类型定义多个插件

    ftplugin/<filetype>.vim
    ftplugin/<filetype>_<name>.vim
    ftplugin/<filetype>/<name>.vim

### 添加帮助文档

路径： ~/.local/share/nvim/site/doc

### options 窗口

> :options

可通过set \* 设置(如：set ignorecase)

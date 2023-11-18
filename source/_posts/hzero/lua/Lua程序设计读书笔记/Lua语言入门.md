---
title: Lua语言入门 - Hero · Lua · Lua程序设计读书笔记
date: 2023-11-18 18:33:00
tags:
  - Hero
  - Lua
  - Lua程序设计读书笔记
categories:
  - Hero
  - Lua
  - Lua程序设计读书笔记
---

### 简述

代码运行流程和NodeJS差不多

### 定义一个函数

```LUA
function fact(n)
  if n == 0 then
    return 1
  else
    return n * fact(n - 1)
  end
end
```

### 交互模式

和NodeJS一样可以直接在终端进行交互模式运行

1. dotfile('hello.lua'): 可以通过dotfile在交互模式下加载lua文件


### 注释

```LUA
-- 单行注释

--[[
  多行注释
]]

--[[
  多行注释，这种写法只需放开注释开头即可
-- ]]

```

### 全局变量？

### 类型和值

1. nil
2. boolean
3. number
4. string
5. userdata
6. fucntion
7. thread
8. table

### 逻辑运算符

1. and
2. not
3. or
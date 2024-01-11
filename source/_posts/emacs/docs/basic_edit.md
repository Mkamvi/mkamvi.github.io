---
title: 基础编辑 - Emacs · 帮助文档
date: 2024-01-11 13:42:15
tags:
  - emacs
  - 编辑器
categories:
  - 编辑器
  - emacs
---

## 插入文本

### 输入

emacs默认就可以直接键入字符，像普通的文本编辑器一样

### 换行

使用 <kbd>Enter</kbd> 可换行，使用 <kbd>Ctrl-j</kbd> 进行无自动缩进换行

### 特殊键位

可用通过 <kbd>Ctrl-q</kbd> 键，后面按下的特殊键位(如Delete、Enter、甚至Ctrl-g)便能插入编辑器

## 改变光标的位置

| 快捷键               | 描述                                 |
| -------------------- | ------------------------------------ |
| Ctrl-f               | 向前移动一个字符                     |
| Ctrl-b               | 向后移动一个字符                     |
| Ctrl-p               | 向上移动一行                         |
| Ctrl-n               | 向下移动一行                         |
| Ctrl-a               | 移动到行首                           |
| Ctrl-e               | 移动到行尾                           |
| Alt-f                | 向前移动一个单词                     |
| Alt-b                | 向后移动一个单词                     |
| Alt-r                | 首行尾行反复横跳                     |
| Ctrl-v               | 屏幕向下一屏                         |
| Alt-v                | 屏幕向上一屏                         |
| Alt-g c n            | 移动到全文字符第n个位置              |
| Alt-g Alt-g n        | 光标移动到第n行                      |
| Alt-g g n            | 光标移动到第n行                      |
| Alt-g Tab n          | 光标移动到当前行第n列                |
| Ctrl-x Ctrl-n        | 默认被禁用了，应该还是设置列的       |
| Ctrl-u Ctrl-x Ctrl-n | 默认被禁用了，应该是取消光标列移动的 |

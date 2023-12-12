---
title: 内容超出后无法滚动查看全部 -  CSS · Flex
date: 2023-12-12 15:38:15
tags:
  - CSS
categories:
  - CSS
---

### 问题描述

就是一个Flex盒子然后里面包含着诸多子项，比如有10 个，但是限制了容器的高度并且制定了子项的高度，这样的话容器放不下就只能滚动，但是实际结果是滚动条无法滚动到最上面，有一部分被截断了没法看全，大概代码如下：

```CSS
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  overflow-y: auto;
}

.item {
  height: 40px;
}
```

很好奇，所以搜罗了一番：

这篇说的比较明白：

1. https://stackoverflow.com/questions/33454533/cant-scroll-to-top-of-flex-item-that-is-overflowing-container

这个快速给你提供了几种可行的解决方案，可以通过在容器外设置滚动条或者子项使用margin: auto代替justify-content和align-items.里面还链了一个MDN的讨论文档，但失效了。不过还有一段描述（抄了一段）：

与CSS中的其他居中方法不同，Flexbox的对齐属性进行“真正”居中。这意味着弹性项将保持居中，即使它们溢出弹性容器。

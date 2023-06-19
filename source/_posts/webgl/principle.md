---
title: 工作原理 - WebGL
date: 2023-06-19 10:48:37
tags:
  - WebGL
categories:
  - WebGL
---

WebGL 在 GPU 上的工作基本上分为两部分，第一部分是将顶点（或数据流）转换到裁剪空间坐标， 第二部分是基于第一部分的结果绘制像素点

传值可以使用 varyings(可变量)

### 关于 buffer 和 attribute

缓冲操作是在 GPU 上获取顶点和其他顶点数据的一种方式。 gl.createBuffer 创建一个缓冲；gl.bindBuffer 是设置缓冲为当前使用缓冲； gl.bufferData 将数据拷贝到缓冲，这个操作一般在初始化完成。

一旦数据存到缓冲中，还需要告诉 WebGL 怎么从缓冲中提取数据传给顶点着色器的属性。

要做这些，首先需要获取 WebGL 给属性分配的地址，如下方代码所示:

```JavaScript
// 询问顶点数据应该放在哪里
var positionLocation = gl.getAttribLocation(program, "a_position");
var colorLocation = gl.getAttribLocation(program, "a_color");
```

一旦知道了属性的地址，在绘制前还需要发出三个命令。

```JavaScript
// 告诉WebGL我们想从缓冲中提供数据
gl.enableVertexAttribArray(location);

// 将缓冲绑定到 ARRAY_BUFFER 绑定点，它是WebGL内部的一个全局变量
gl.bindBuffer(gl.ARRAY_BUFFER, someBuffer);

/**
  * 这个命令告诉WebGL从 ARRAY_BUFFER 绑定点当前绑定的缓冲获取数据。 每个顶点有几个单
  * 位的数据(1 - 4)，单位数据类型是什么(BYTE, FLOAT, INT, UNSIGNED_SHORT, 等等...)，
  * stride 是从一个数据到下一个数据要跳过多少位，最后是数据在缓冲的什么位置。
  * 如果每个类型的数据都用一个缓冲存储，stride 和 offset 都是 0 。 对 stride 来说 0 表
  * 示 “用符合单位类型和单位个数的大小”。 对 offset 来说 0 表示从缓冲起始位置开始读取
  * 它们使用 0 以外的值时会复杂得多，虽然这样会取得一些性能能上的优势，
  * 但是一般情况下并不值得，除非你想充分压榨WebGL的性能。
  */

gl.vertexAttribPointer(
    location,
    numComponents,
    typeOfData,
    normalizeFlag,
    strideToNextPieceOfData,
    offsetIntoBuffer);

```

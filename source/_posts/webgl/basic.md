---
title: 基础 - WebGL
date: 2023-06-15 16:29:08
tags:
  - WebGL
categories:
  - WebGL
---

### 概述

WebGL 在电脑的 GPU 中运行。因此你需要使用能够在 GPU 上运行的代码。 这样的代码需要提供成对的方法。每对方法中一个叫顶点着色器， 另一个叫片段着色器，并且使用一种和 C 或 C++类似的强类型的语言 GLSL。 (GL 着色语言)。 每一对组合起来称作一个 program（着色程序）。

顶点着色器的作用是计算顶点的位置。根据计算出的一系列顶点位置，WebGL 可以对点， 线和三角形在内的一些图元进行光栅化处理。当对这些图元进行光栅化处理时需要使用片段着色器方法。 片段着色器的作用是计算出当前绘制图元中每个像素的颜色值。

几乎整个 WebGL API 都是关于如何设置这些成对方法的状态值以及运行它们。 对于想要绘制的每一个对象，都需要先设置一系列状态值，然后通过调用 gl.drawArrays 或 gl.drawElements 运行一个着色方法对，使得你的着色器对能够在 GPU 上运行。

这些方法对所需的任何数据都需要发送到 GPU，这里有着色器获取数据的 4 种方法：

1. 属性(Attributes)和缓冲

缓冲是发送到 GPU 的一些二进制数据序列，通常情况下缓冲数据包括位置，法向量，纹理坐标，顶点颜色值等。 你可以存储任何数据。

属性用来指明怎么从缓冲中获取所需数据并将它提供给顶点着色器。 例如你可能在缓冲中用三个 32 位的浮点型数据存储一个位置值。 对于一个确切的属性你需要告诉它从哪个缓冲中获取数据，获取什么类型的数据（三个 32 位的浮点数据）， 起始偏移值是多少，到下一个位置的字节数是多少。

缓冲不是随意读取的。事实上顶点着色器运行的次数是一个指定的确切数字， 每一次运行属性会从指定的缓冲中按照指定规则依次获取下一个值。

2. 全局变量(Uniforms)

全局变量在着色程序运行前赋值，在运行过程中全局有效。

3. 纹理(Textures)

纹理是一个数据序列，可以在着色程序运行中随意读取其中的数据。 大多数情况存放的是图像数据，但是纹理仅仅是数据序列， 你也可以随意存放除了颜色数据以外的其它数据

4. 可变量(Varyings)

可变量是一种顶点着色器给片段着色器传值的方式，依照渲染的图元是点， 线还是三角形，顶点着色器中设置的可变量会在片段着色器运行中获取不同的插值


### 基础示例

![WebGL基础创建过程](/img/posts/WebGL基础创建过程.png)

```HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <title></title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- <link href="css/style.css" rel="stylesheet" /> -->
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      #canvas {
        width: 99vw;
        height: 99vh;
      }
    </style>
  </head>
  <body>
    <canvas id="canvas"></canvas>

    <script id="vertex-shader-2d" type="notjs">

      // 一个属性变量，将会从缓冲中获取数据
      attribute vec4 a_position;

      void main() {
        // gl_Position 是一个顶点着色器主要设置的变量
        gl_Position = a_position;
      }
    </script>

    <script id="fragment-shader-2d" type="notjs">
      precision mediump float;

      void main() {
        gl_FragColor = vec4(1, 0, 0.5, 1);
      }
    </script>

    <script>
      const canvas = document.querySelector("#canvas");
      const gl = canvas.getContext("webgl");

      const vertexShaderSource =
        document.querySelector("#vertex-shader-2d").text;
      const fragmentShaderSource = document.querySelector(
        "#fragment-shader-2d"
      ).text;

      const vertexShader = createShader(
        gl,
        gl.VERTEX_SHADER,
        vertexShaderSource
      );

      const fragmentShader = createShader(
        gl,
        gl.FRAGMENT_SHADER,
        fragmentShaderSource
      );

      function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) {
          return shader;
        }
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
      }

      function createProgram(gl, vertexShader, fragmentShader) {
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        const success = gl.getProgramParameter(program, gl.LINK_STATUS);

        if (success) return program;

        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
      }

      const program = createProgram(gl, vertexShader, fragmentShader);

      const positionAttributeLocation = gl.getAttribLocation(
        program,
        "a_position"
      );

      const positionBuffer = gl.createBuffer();

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

      const positions = [0, 0, 0, 0.5, 0.7, 0];

      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(positions),
        gl.STATIC_DRAW
      );

      // 一个是拥有的实际像素个数，一个是显示的大小
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      gl.enableVertexAttribArray(positionAttributeLocation);

      const size = 2;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;

      gl.vertexAttribPointer(
        positionAttributeLocation,
        size,
        type,
        normalize,
        stride,
        offset
      );

      const primitiveType = gl.TRIANGLES;
      const count = 3;
      gl.drawArrays(primitiveType, offset, count);
    </script>
  </body>
</html>
```

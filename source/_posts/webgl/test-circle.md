---
title: 使用点动态绘制一个圆 - WebGL
date: 2023-08-09 17:17:17
tags:
  - WebGL
categories:
  - WebGL
---

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>WebGL测试</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      html,
      body,
      #canvas {
        width: 100%;
        height: 100%;
      }
      #canvas {
        display: block;
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
        gl_PointSize = 5.0;
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
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;

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

      let positions = Array.from({ length: 2 * 60 }, () => {
        return Math.random() > 0.5 ? Math.random() : -Math.random();
      });

      const c_positions = [];
      const angle = Math.PI / 60;
      const angle360 = Math.PI * 2;
      let curAngle = 0;

      while (curAngle < angle360) {
        curAngle += angle;
        c_positions.push(0.5 * Math.sin(curAngle), 0.5 * Math.cos(curAngle));
      }
      positions = c_positions;

      const bd = new Float32Array(positions);
      gl.bufferData(gl.ARRAY_BUFFER, bd, gl.STATIC_DRAW);

      // 一个是拥有的实际像素个数，一个是显示的大小
      gl.viewport(0, 0, gl.canvas.height, gl.canvas.height);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      gl.enableVertexAttribArray(positionAttributeLocation);

      const size = 2;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      let offset = 0;

      const primitiveType = gl.POINTS;
      let count = 1;

      gl.vertexAttribPointer(
        positionAttributeLocation,
        size,
        type,
        normalize,
        stride,
        offset
      );

      const timer = window.setInterval(() => {
        count ++;
        if (count > positions.length / 2) {
          window.clearInterval(timer);
          return;
        }
        gl.drawArrays(primitiveType, offset, count);
      }, 20);
    </script>
  </body>
</html>
```

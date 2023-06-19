---
title: 着色器和GLSL - WebGL
date: 2023-06-19 11:47:05
tags:
  - WebGL
categories:
  - WebGL
---

### 顶点着色器

一个顶点着色器的工作是生成裁剪空间坐标值，通常是以下的形式

```GLSL
void main() {
   gl_Position = doMathToMakeClipspaceCoordinates
}
```

每个顶点调用一次（顶点）着色器，每次调用都需要设置一个特殊的全局变量 gl_Position， 该变量的值就是裁减空间坐标值

顶点着色器需要的数据，可以通过以下三种方式获得:

1. Attributes 属性 (从缓冲中获取的数据)

```JavaScript
// 创建缓冲
var buf = gl.createBuffer();

// 将数据存入缓冲
gl.bindBuffer(gl.ARRAY_BUFFER, buf);
gl.bufferData(gl.ARRAY_BUFFER, someData, gl.STATIC_DRAW);

// 初始化的时候，在你制作的（着色）程序中找到属性所在地址
var positionLoc = gl.getAttribLocation(someShaderProgram, "a_position");

// 开启从缓冲中获取数据
gl.enableVertexAttribArray(positionLoc);

var numComponents = 3;  // (x, y, z)
var type = gl.FLOAT;    // 32位浮点数据
var normalize = false;  // 不标准化
var offset = 0;         // 从缓冲起始位置开始获取
var stride = 0;         // 到下一个数据跳多少位内存
                        // 0 = 使用当前的单位个数和单位长度 （ 3 * Float32Array.BYTES_PER_ELEMENT ）

// 告诉WebGL怎么从缓冲中获取数据传递给属性
gl.vertexAttribPointer(positionLoc, numComponents, type, false, stride, offset);

```

```GLSL
// 属性可以用 float, vec2, vec3, vec4, mat2, mat3 和 mat4 数据类型
attribute vec4 a_position;

// 不做任何运算直接将数据传递给gl_Position
void main() {
   gl_Position = a_position;
}
```

2. Uniforms 全局变量 (在一次绘制中对所有顶点保持一致值)

全局变量在一次绘制过程中传递给着色器的值都一样

```GLSL
attribute vec4 a_position;
uniform vec4 u_offset;

void main() {
   gl_Position = a_position + u_offset;
}
```

```JavaScript
// 在初始化时找到全局变量的地址
var offsetLoc = gl.getUniformLocation(someProgram, "u_offset");

// 在绘制前设置全局变量
gl.uniform4fv(offsetLoc, [1, 0, 0, 0]);  // 向右偏移一半屏幕宽度
```

要注意的是全局变量属于单个着色程序，如果多个着色程序有同名全局变量，需要找到每个全局变量并设置自己的值。 我们调用 gl.uniform???的时候只是设置了当前程序的全局变量，当前程序是传递给 gl.useProgram 的最后一个程序

全局变量有很多类型，对应的类型有对应的设置方法:

```JavaScript
gl.uniform1f (floatUniformLoc, v);                 // float
gl.uniform1fv(floatUniformLoc, [v]);               // float 或 float array
gl.uniform2f (vec2UniformLoc,  v0, v1);            // vec2
gl.uniform2fv(vec2UniformLoc,  [v0, v1]);          // vec2 或 vec2 array
gl.uniform3f (vec3UniformLoc,  v0, v1, v2);        // vec3
gl.uniform3fv(vec3UniformLoc,  [v0, v1, v2]);      // vec3 或 vec3 array
gl.uniform4f (vec4UniformLoc,  v0, v1, v2, v4);    // vec4
gl.uniform4fv(vec4UniformLoc,  [v0, v1, v2, v4]);  // vec4 或 vec4 array

gl.uniformMatrix2fv(mat2UniformLoc, false, [  4x element array ])  // mat2 或 mat2 array
gl.uniformMatrix3fv(mat3UniformLoc, false, [  9x element array ])  // mat3 或 mat3 array
gl.uniformMatrix4fv(mat4UniformLoc, false, [ 16x element array ])  // mat4 或 mat4 array

gl.uniform1i (intUniformLoc,   v);                 // int
gl.uniform1iv(intUniformLoc, [v]);                 // int 或 int array
gl.uniform2i (ivec2UniformLoc, v0, v1);            // ivec2
gl.uniform2iv(ivec2UniformLoc, [v0, v1]);          // ivec2 或 ivec2 array
gl.uniform3i (ivec3UniformLoc, v0, v1, v2);        // ivec3
gl.uniform3iv(ivec3UniformLoc, [v0, v1, v2]);      // ivec3 or ivec3 array
gl.uniform4i (ivec4UniformLoc, v0, v1, v2, v4);    // ivec4
gl.uniform4iv(ivec4UniformLoc, [v0, v1, v2, v4]);  // ivec4 或 ivec4 array

gl.uniform1i (sampler2DUniformLoc,   v);           // sampler2D (textures)
gl.uniform1iv(sampler2DUniformLoc, [v]);           // sampler2D 或 sampler2D array

gl.uniform1i (samplerCubeUniformLoc,   v);         // samplerCube (textures)
gl.uniform1iv(samplerCubeUniformLoc, [v]);         // samplerCube 或 samplerCube array
```

还有一些类型 bool, bvec2, bvec3, and bvec4。它们可用 gl.uniform?f?或 gl.uniform?i?

一个数组可以一次设置所有的全局变量:

```JavaScript
// 着色器里
uniform vec2 u_someVec2[3];

// JavaScript 初始化时
var someVec2Loc = gl.getUniformLocation(someProgram, "u_someVec2");

// 渲染的时候
gl.uniform2fv(someVec2Loc, [1, 2, 3, 4, 5, 6]);  // 设置数组 u_someVec2
```

如果你想单独设置数组中的某个值，就要单独找到该值的地址:

```JavaScript
// JavaScript 初始化时
var someVec2Element0Loc = gl.getUniformLocation(someProgram, "u_someVec2[0]");
var someVec2Element1Loc = gl.getUniformLocation(someProgram, "u_someVec2[1]");
var someVec2Element2Loc = gl.getUniformLocation(someProgram, "u_someVec2[2]");

// 渲染的时候
gl.uniform2fv(someVec2Element0Loc, [1, 2]);  // set element 0
gl.uniform2fv(someVec2Element1Loc, [3, 4]);  // set element 1
gl.uniform2fv(someVec2Element2Loc, [5, 6]);  // set element 2
```

同样的，如果你创建了一个结构体:

```GLSL
struct SomeStruct {
  bool active;
  vec2 someVec2;
};
uniform SomeStruct u_someThing;
```

你需要找到每个元素的地址

```JavaScript
var someThingActiveLoc = gl.getUniformLocation(someProgram, "u_someThing.active");
var someThingSomeVec2Loc = gl.getUniformLocation(someProgram, "u_someThing.someVec2");
```

3. ⌛️ Textures 纹理 (从像素或纹理元素中获取的数据)

### 片段着色器

一个片段着色器的工作是为当前光栅化的像素提供颜色值，通常是以下的形式:

```GLSL
precision mediump float;

void main() {
   gl_FragColor = doMathToMakeAColor;
}
```

每个像素都将调用一次片段着色器，每次调用需要从你设置的特殊全局变量 gl_FragColor 中获取颜色信息

片段着色器所需的数据，可以通过以下三种方式获取:

1. Uniforms 全局变量 (values that stay the same for every pixel of a single draw call)

同上(顶点着色器)

2. Textures 纹理 (data from pixels/texels)

在着色器中获取纹理信息，可以先创建一个 sampler2D 类型全局变量，然后用 GLSL 方法 texture2D 从纹理中提取信息:

```GLSL
precision mediump float;

uniform sampler2D u_texture;

void main() {
   vec2 texcoord = vec2(0.5, 0.5);  // 获取纹理中心的值
   gl_FragColor = texture2D(u_texture, texcoord);
}
```

从纹理中获取的数据取决于很多设置。 至少要创建并给纹理填充数据，例如

```JavaScript
var tex = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, tex);
var level = 0;
var width = 2;
var height = 1;
var data = new Uint8Array([
   255, 0, 0, 255,   // 一个红色的像素
   0, 255, 0, 255,   // 一个绿色的像素
]);
gl.texImage2D(gl.TEXTURE_2D, level, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

// 初始化时找到全局变量的地址
var someSamplerLoc = gl.getUniformLocation(someProgram, "u_texture");

// 在渲染的时候WebGL要求纹理必须绑定到一个纹理单元上
var unit = 5;  // 挑选一个纹理单元
gl.activeTexture(gl.TEXTURE0 + unit);
gl.bindTexture(gl.TEXTURE_2D, tex);

// 告诉着色器你要使用的纹理在那个纹理单元
gl.uniform1i(someSamplerLoc, unit);

```

3. Varyings 可变量 (data passed from the vertex shader and interpolated)

可变量是一种顶点着色器给片段着色器传值的方式

为了使用可变量，要在两个着色器中定义同名的可变量。 给顶点着色器中可变量设置的值，会作为参考值进行内插，在绘制像素时传给片段着色器的可变量

```
// 顶点着色器
attribute vec4 a_position;

uniform vec4 u_offset;

varying vec4 v_positionWithOffset;

void main() {
  gl_Position = a_position + u_offset;
  v_positionWithOffset = a_position + u_offset;
}


// 片段着色器
precision mediump float;

varying vec4 v_positionWithOffset;

void main() {
  // 从裁剪空间 (-1 <-> +1) 转换到颜色空间 (0 -> 1).
  vec4 color = v_positionWithOffset * 0.5 + 0.5;
  gl_FragColor = color;
}
```

### GLSL

GLSL 全称是 Graphics Library Shader Language （图形库着色器语言），是着色器使用的语言。 它有一些不同于 JavaScript 的特性，主要目的是为栅格化图形提供常用的计算功能。 所以它内建的数据类型例如 vec2, vec3 和 vec4 分别代表两个值，三个值和四个值， 类似的还有 mat2, mat3 和 mat4 分别代表 2x2, 3x3 和 4x4 矩阵。 你可以做一些运算例如常量和矢量的乘法

```GLSL
vec4 a = vec4(1, 2, 3, 4);
vec4 b = a * 2.0;
// b 现在是 vec4(2, 4, 6, 8);


// 做矩阵乘法以及矢量和矩阵的乘法
mat4 a = ???
mat4 b = ???
mat4 c = a * b;

vec4 v = ???
vec4 y = c * v;

```

他还为矢量数据提供多种分量选择器，例如 vec4:

- v.x 和 v.s 以及 v.r ， v[0] 表达的是同一个分量。
- v.y 和 v.t 以及 v.g ， v[1] 表达的是同一个分量。
- v.z 和 v.p 以及 v.b ， v[2] 表达的是同一个分量。
- v.w 和 v.q 以及 v.a ， v[3] 表达的是同一个分量。

它还支持矢量调制，意味者你可以交换或重复分量:

```GLSL
v.yyyy
同
vec4(v.y, v.y, v.y, v.y)

v.bgra
同
vec4(v.b, v.g, v.r, v.a)

vec4(v.rgb, 1)
同
vec4(v.r, v.g, v.b, 1)

vec4(1)
同
vec4(1, 1, 1, 1)

```

值得注意的是 GLSL 是一个强类型的语言:

```
float f = 1;  // 错误，1是int类型，不能将int型赋值给float
float f = 1.0;      // 使用float
float f = float(1)  // 转换integer为float

```

上例中 vec4(v.rgb, 1) 不会因为 1 报错，因为 vec4 内部进行了转换类似 float(1)

GLSL 有一系列内置方法，其中大多数运算支持多种数据类型，并且一次可以运算多个分量，例如:

```
// T可以是 float, vec2, vec3 或 vec4 。如果你传的是 vec4 返回的也是 vec4, 返回结果对应每个分量的正弦值。换句话说如果 v 是 vec4 类型
T sin(T angle)

vec4 s = sin(v)
同
vec4 s = vec4(sin(v.x), sin(v.y), sin(v.z), sin(v.w))

vec4 m = mix(v1, v2, f);
同
vec4 m = vec4(
  mix(v1.x, v2.x, f),
  mix(v1.y, v2.y, f),
  mix(v1.z, v2.z, f),
  mix(v1.w, v2.w, f));
```

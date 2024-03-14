---
title: 如何压缩y轴展示 - echarts
date: 2024-03-14 17:53:02
tags:
  - echarts
categories:
  - echarts
---

## 示例

> 将源数据执行立方操作，本质是放大大数区间，再将y轴取立方根获取源数值，但会导致数据偏差；和对数坐标刚好相反

```javascript
const data = [0, 32, 31, 33, 31, 34, 33];

option = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    axisLabel: {
      formatter: function (value, index) {
        return Math.cbrt(value).toFixed();
      },
    },
  },
  tooltip: {
    valueFormatter: function (value, index) {
      return Math.cbrt(value).toFixed();
    },
  },
  visualMap: {
    dimension: 0,
    pieces: [
      {
        lte: 2,
        color: "orange",
      },
      {
        gt: 2,
        lte: 4,
        color: "red",
      },
      {
        gt: 2,
        color: "cyan",
      },
    ],
  },
  series: [
    {
      data: data.map((d) => d * d * d),
      type: "line",
      smooth: true,
    },
  ],
};
```

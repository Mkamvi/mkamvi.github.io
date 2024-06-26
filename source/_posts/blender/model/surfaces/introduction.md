---
title: 建模面 · 简介 - Blender
date: 2023-07-26 11:07:44
tags:
  - Blender
categories:
  - Blender
---

## 简介

曲线是 2D 物体，而曲面是其三维上的扩展。但是请注意，在 Blender 中，只能创建 NURBS 曲面，没有贝塞尔曲面（但是有 贝塞尔 结点类型，见下文），也没有多边形曲面（但是对于这些，可以使用网格）。虽然曲线和曲面共用同一物体类型（一样的还有文本...），但它们并不是同一回事；例如，不能使同一个物体里既包含曲线又包含曲面

由于曲面是 2D 的，所以它有两个插值坐标轴，U（类似于曲线中的）和 V 坐标轴。重要的是要知道，两个维度的插值规则（结点、阶数、分辨率）可以是独立的（当然，对于所有包含 U 和 V 的设置项都适用）

你也许会问， "但是曲面似乎是三维的，为什么只有二维？"要成为三维，物体需要有 "体积" ，但是曲面，即使是闭合的，也没有体积；它是无限薄的。曲面需要有厚度（也就是第三个维度），才会有体积。因此，它只是一个二维物体，并且只有两个插值维度或轴向或坐标（如果你知道一点数学，想想非欧几何——很好，曲面都是非欧 2D 平面……）。举几个 "现实生活"的例子，你可以卷起一张纸，来创建一个圆柱；然而，即使它 "产生" 了体积，纸片本身仍是一个（几乎……）二维物体！

事实上，曲面与 挤出曲线 的结果非常相似

## 可视化

## 转换

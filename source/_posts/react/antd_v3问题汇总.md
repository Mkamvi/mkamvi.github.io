---
title: 3.x版本问题汇总 - React · Antd
date: 2024-01-09 17:27:25
tags:
  - React
  - Antd
categories:
  - React
  - Antd
---

## 表单

### 动态表单无法清空

#### 问题描述

动态表单在删除后，数据仍然保存在表单中，导致校验时出现对旧值的校验，及保存时整个数据结构与预期不一致

#### 问题分析

getFieldDecoratorr()在3.x中(rc-from/2.4.10)，使用ref判断组件是否卸载，而自定义的函数组件不支持ref，导致清理逻辑失效

这是ref实现的代码片段，注意clearField函数其实就是清理字段

```js
     saveRef(name, _, component) {
        if (!component) {
          const fieldMeta = this.fieldsStore.getFieldMeta(name);
          if (!fieldMeta.preserve) {
            // after destroy, delete data
            this.clearedFieldMetaCache[name] = {
              field: this.fieldsStore.getField(name),
              meta: fieldMeta,
            };
            this.clearField(name);
          }
          delete this.domFields[name];
          return;
        }
        this.domFields[name] = true;
        this.recoverClearedField(name);
        const fieldMeta = this.fieldsStore.getFieldMeta(name);
        if (fieldMeta) {
          const ref = fieldMeta.ref;
          if (ref) {
            if (typeof ref === 'string') {
              throw new Error(`can not set ref string for ${name}`);
            } else if (typeof ref === 'function') {
              ref(component);
            } else if (Object.prototype.hasOwnProperty.call(ref, 'current')) {
              ref.current = component;
            }
          }
        }
        this.instances[name] = component;
      }
```

#### 解决方案

给函数组件添加forwardRef，转发ref到子组件

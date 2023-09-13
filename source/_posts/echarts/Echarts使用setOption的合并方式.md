---
title: Echarts使用setOption的合并方式
date: 2023-09-13 10:15:15
tags:
  - echarts
categories:
  - echarts
---

## 合并方式

### 普通合并

#### 触发条件：

- 未设置 notMerge 参数
- 未设置 replaceMerge 参数

#### 合并策略

对于一种类型的组件（如：xAxis, series），新来的 option 中的每个“组件描述”（如：{type: 'xAxis', id: 'xx', name: 'kk', ...}）会被尽量合并到已存在的组件中。剩余的情况，会在组件列表尾部创建新的组件。整体规则细节如下：

1. 先依次对 option 中每个有声明 id 或者 name 的“组件描述”，寻找能匹配其 id 或者 name 的已有的组件，找到的话则合并。
2. 再依次对 option 中剩余的“组件描述”，寻找还未执行过前一条的已有组件，找到的话则合并。
3. 其他 option 中剩余的“组件描述”，用于在组件列表尾部创建新组件。

_特点_

1. 永远不会删除已存在的组件。也就是说，只支持增加，或者更新组件。
2. 组件的索引（componentIndex）永远不会改变。
3. 如果 id 和 name 没有在 option 中被指定（这是经常出现的情况），组件会按照它在 option 中的顺序一一合并到已有组件中。这种设定比较符合直觉。

#### 示例

```json
// 已有组件：
{
    xAxis: [
        { id: 'm', interval: 5 },
        { id: 'n', name: 'nnn', interval: 6 }
        { id: 'q', interval: 7 }
    ]
}
// 新来的 option ：
chart.setOption({
    xAxis: [
        // id 没有指定。会寻找到第一个没有进行过合并的已有组件，进行合并。
        // 即合并到 `id: 'q'`。
        { interval: 77 },
        // id 没有指定。最终会创建新组件。
        { interval: 88 },
        // id 没有指定，但是 name 指定了。会被合并到已有的 `name: 'nnn'` 组件。
        { name: 'nnn', interval: 66 },
        // id 指定了，会被合并到已有的 `id: 'm'` 组件。
        { id: 'm', interval: 55 }
    ]
});
// 结果组件：
{
    xAxis: [
        { id: 'm', interval: 55 },
        { id: 'n', name: 'nnn', interval: 66 },
        { id: 'q', interval: 77 },
        { interval: 88 }
    ]
}
```

### 替换合并

#### 触发条件

- 未设置 notMerge 参数
- replaceMerge 指定组件类型

#### 合并策略

对于一种类型的组件（如：xAxis, series），只有 option 中指定了 id 并且已有组件中有此 id 时，已有组件会和 option 相应组件描述进行合并。否则，已有组件都会删除，新组件会被根据 option 创建。细节规则如下：

1. 先依次对 option 中每个有声明 id 的“组件描述”，寻找能匹配其 id 或者 name 的已有的组件，找到的话则合并。
2. 删除其他没匹配到的已有组件。
3. 依次对 option 中剩余的“组件描述”，创建新组件，填入刚因删除而空出来的位置上，或者增加到末尾。

_特点_ ：

1. 与普通合并相比，支持了组件删除。
2. 已有组件的索引永远不会变。这是为了保证，option 或者 API 中的 index 引用（例如：xAxisIndex: 2）仍能正常一致得使用。
3. 整个处理过程结束后，可能存在一些“洞”，也就是说，在组件列表中的某些 index 上，并没有组件存在（被删除了）。但是这是可以被开发者预期和控制的。

#### 示例

```json
// 已有组件：
{
    xAxis: [
        { id: 'm', interval: 5, min: 1000 },
        { id: 'n', name: 'nnn', interval: 6, min: 1000 }
        { id: 'q', interval: 7, min: 1000 }
    ]
}
// 新来的 option :
chart.setOption({
    xAxis: [
        { interval: 111 },
        // id 已经指定了。因此会被合并进已有的组件 `id: 'q'`。
        { id: 'q', interval: 77 },
        // id 已经指定了。但是已有组件没有此 id 。
        { id: 't', interval: 222 },
        { interval: 333 }
    ]
}, { replaceMerge: 'xAxis' });
// 结果组件：
{
    xAxis: [
        // 原来的 id 为 'm' 的组件，被移除。
        // 替换为新的组件。新组件中，并没有原来的 `min: 1000` 了。
        { interval: 111 },
        // 原来的 id 为 'n' 的组件，被移除。
        // 替换为新的组件。新组件中，并没有原来的 `min: 1000` 了。
        { id: 't', interval: 222 },
        // 原来的组件没有被移除，而是和 option 中的组件描述进行了合并。
        // 所以 `min: 1000` 被保留了。
        { id: 'q', interval: 77, min: 1000 },
        // 新添加的组件。
        { interval: 333 }
    ]
}
```

### 删除组件

#### 触发条件

- 设置 notMerge 为 true

#### 合并策略

所有组件都会被删除，然后根据新 option 创建所有新组件

## 参考

1. https://echarts.apache.org/zh/api.html#echartsInstance.setOption

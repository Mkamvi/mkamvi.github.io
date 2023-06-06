---
title: 关于Github Actions
date: 2023-06-06 09:44:22
tags:
  - github
  - gh-actions
categories:
  - github
---

### Github Actions 的组件

##### 工作流

工作流程由签入到存储库的 YAML 文件定义，并在存储库中的事件触发时运行，也可以手动触发，或按定义的时间表触发。工作流程在存储库的 .github/workflows 目录中定义，存储库可以有多个工作流程，每个工作流程都可以执行不同的任务集。

##### 事件

事件是存储库中触发工作流程运行的特定活动。 例如，当有人创建拉取请求、打开议题或将提交推送到存储库时。

##### 作业

作业是工作流中在同一运行器上执行的一组步骤。 每个步骤要么是一个将要执行的 shell 脚本，要么是一个将要运行的动作。 步骤按顺序执行，并且相互依赖。 由于每个步骤都在同一运行器上执行，因此您可以将数据从一个步骤共享到另一个步骤。 例如，可以有一个生成应用程序的步骤，后跟一个测试已生成应用程序的步骤。

##### 操作

操作是用于 GitHub Actions 平台的自定义应用程序，它执行复杂但经常重复的任务。 使用操作可帮助减少在工作流程文件中编写的重复代码量。

##### 运行程序

运行程序是触发工作流时运行工作流的服务器。 每个运行器一次可以运行一个作业。 GitHub 提供 Ubuntu Linux、Microsoft Windows 和 macOS 运行器来运行您的工作流程；每个工作流程运行都在新预配的全新虚拟机中执行。

##### 示例

```YAML
# .github/workflows/*.yml

name: learn-github-actions  # 工作流名称
run-name: ${{ github.actor }} is learning GitHub Actions  # 工作流运行名称
on: [push]  # 触发器，使用push事件
jobs:  # 工作流下的所有作业
  check-bats-version:  # 定义一个作业名称
    runs-on: ubuntu-latest  # 运行程序
    steps:  # 作业下的所有步骤
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '14'
      - run: npm install -g bats  # 操作(执行命令)
      - run: bats -v
```

### 查找和自定义操作

##### 使用 GitHub Marketplace

##### 从相同仓库添加操作

使用相对路径

```
|-- hello-world (repository)
|   |__ .github
|       └── workflows
|           └── my-first-workflow.yml
|       └── actions
|           |__ hello-world-action
|               └── action.yml
```

```YAML
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      # This step checks out a copy of your repository.
      - uses: actions/checkout@v3
      # This step references the directory that contains the action.
      - uses: ./.github/actions/hello-world-action
```

action.yml 文件用于提供操作的元数据。

##### 从不同仓库添加操作

```
jobs:
  my_first_job:
    steps:
      - name: My first step
        uses: actions/setup-node@v3
```

##### 对自定义操作使用发行版管理

1. 使用标签
2. 使用 SHA
3. 使用分支

```YAML
steps:
  - uses: actions/javascript-action@mai
```

##### 对操作使用输入和输出

---
title: 上下文 - Github Actions
date: 2023-06-08 17:15:03
tags:
  - github
  - gh-actions
categories:
  - github
---

### 关于上下文

上下文是一种访问工作流运行、变量、运行器环境、作业及步骤相关信息的方式。 每个上下文都是一个包含属性的对象，属性可以是字符串或其他对象。

##### 使用表达式访问上下文

```YAML
${{ <context> }}
```

##### 访问上下文的两种方式

1. github['sha']
2. github.sha

##### 上下文类型

1. 默认环境变量：仅存在于执行作业的运行器上
2. 上下文：你可以在工作流的任何时间点使用大多数上下文

```YAML
name: CI
on: push
jobs:
  prod-check:
    if: ${{ github.ref == 'refs/heads/main' }}
    runs-on: ubuntu-latest
    steps:
      - run: echo "Deploying to production server on branch $GITHUB_REF"
```

##### 可用的上下文

1. github:

   上下文包含有关工作流运行和触发运行的事件的信息。 还可以读取环境变量中的大多数 github 上下文数据

```JSON
{
  action: 正在运行的操作的名称，或步骤的id
  action_path: 操作所在的路径,
  action_ref: 对于执行操作的步骤，这是正在执行的操作的引用,
  action_repository: 对于执行操作的步骤，这是操作的所有者和存储库名称
  action_status: 对于复合操作，这是复合操作的当前结果
  actor: 触发初始工作流运行的用户的用户名
}
```

```YAML
name: Run CI
on: [push, pull_request]

jobs:
  normal_ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run normal CI
        run: ./run-tests

  pull_request_ci:
    runs-on: ubuntu-latest
    if: ${{ github.event_name == 'pull_request' }}
    steps:
      - uses: actions/checkout@v3
      - name: Run PR CI
        run: ./run-additional-pr-ci
```

2. env

   env 上下文包含已在工作流、作业或步骤中设置的变量

```JSON
{
  <env_name>: 特定环境变量的值
}
```

```YAML
name: Hi Mascot
on: push
env:
  mascot: Mona
  super_duper_var: totally_awesome

jobs:
  windows_job:
    runs-on: windows-latest
    steps:
      - run: echo 'Hi ${{ env.mascot }}'  # Hi Mona
      - run: echo 'Hi ${{ env.mascot }}'  # Hi Octocat
        env:
          mascot: Octocat
  linux_job:
    runs-on: ubuntu-latest
    env:
      mascot: Tux
    steps:
      - run: echo 'Hi ${{ env.mascot }}'  # Hi Tux
```

3. vars

   vars 上下文的内容是配置变量名称与其值的映射。

```YAML
on:
  workflow_dispatch:
env:
  # Setting an environment variable with the value of a configuration variable
  env_var: ${{ vars.ENV_CONTEXT_VAR }}

jobs:
  display-variables:
    name: ${{ vars.JOB_NAME }}
    # You can use configuration variables with the `vars` context for dynamic jobs
    if: ${{ vars.USE_VARIABLES == 'true' }}
    runs-on: ${{ vars.RUNNER }}
    environment: ${{ vars.ENVIRONMENT_STAGE }}
    steps:
    - name: Use variables
      run: |
        echo "repository variable : $REPOSITORY_VAR"
        echo "organization variable : $ORGANIZATION_VAR"
        echo "overridden variable : $OVERRIDE_VAR"
        echo "variable from shell environment : $env_var"
      env:
        REPOSITORY_VAR: ${{ vars.REPOSITORY_VAR }}
        ORGANIZATION_VAR: ${{ vars.ORGANIZATION_VAR }}
        OVERRIDE_VAR: ${{ vars.OVERRIDE_VAR }}

    - name: ${{ vars.HELLO_WORLD_STEP }}
      if: ${{ vars.HELLO_WORLD_ENABLED == 'true' }}
      uses: actions/hello-world-javascript-action@main
      with:
        who-to-greet: ${{ vars.GREET_NAME }}
```

4. job

   job 上下文包含当前正在运行的作业相关信息

```JSON
{
  // 作业的容器相关信息
  container: {
    id: 容器的 ID,
    network: 容器网络的 ID,
  },
  // 为作业创建的服务容器
  services: {
    id: 服务容器的 ID,
    network: 服务容器网络的 ID,
    ports: 服务容器显露的端口,
    status: 作业的当前状态 success | failure | cancelled
  }
}
```

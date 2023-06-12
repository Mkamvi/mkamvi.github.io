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

5. jobs

   此示例可重用工作流使用 jobs 上下文设置可重用工作流的输出。 请注意输出如何从步骤流向作业，然后流向 workflow_call 触发器

```YAML
name: Reusable workflow

on:
  workflow_call:
    # Map the workflow outputs to job outputs
    outputs:
      firstword:
        description: "The first output string"
        value: ${{ jobs.example_job.outputs.output1 }}
      secondword:
        description: "The second output string"
        value: ${{ jobs.example_job.outputs.output2 }}

jobs:
  example_job:
    name: Generate output
    runs-on: ubuntu-latest
    # Map the job outputs to step outputs
    outputs:
      output1: ${{ steps.step1.outputs.firstword }}
      output2: ${{ steps.step2.outputs.secondword }}
    steps:
      - id: step1
        run: echo "firstword=hello" >> $GITHUB_OUTPUT
      - id: step2
        run: echo "secondword=world" >> $GITHUB_OUTPUT
```

6. steps

   steps 上下文包含有关当前作业中已指定 id 且已运行的步骤的信息。

```YAML
name: Generate random failure
on: push
jobs:
  randomly-failing-job:
    runs-on: ubuntu-latest
    steps:
      - id: checkout
        uses: actions/checkout@v3
      - name: Generate 0 or 1
        id: generate_number
        run:  echo "random_number=$(($RANDOM % 2))" >> $GITHUB_OUTPUT
      - name: Pass or fail
        run: |
          if [[ ${{ steps.generate_number.outputs.random_number }} == 0 ]]; then exit 0; else exit 1; fi
```

7. runner

   runner 上下文包含正在执行当前作业的运行器相关信息。

```YAML
name: Build
on: push

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build with logs
        run: |
          mkdir ${{ runner.temp }}/build_logs
          ./build.sh --log-path ${{ runner.temp }}/build_logs
      - name: Upload logs on fail
        if: ${{ failure() }}
        uses: actions/upload-artifact@v3
        with:
          name: Build failure logs
          path: ${{ runner.temp }}/build_logs
```

8. secrets

   secrets 上下文的以下示例内容显示自动 GITHUB_TOKEN，以及可用于工作流运行的两个其他机密。

```YAML
name: Pull request labeler
on: [ pull_request_target ]

jobs:
  triage:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: actions/labeler@v4
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
```

9. strategy

   对于具有矩阵的工作流，strategy 上下文包含有关当前作业的矩阵执行策略的信息。

```YAML
name: Test matrix
on: push

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        test-group: [1, 2]
        node: [14, 16]
    steps:
      - uses: actions/checkout@v3
      - run: npm test > test-job-${{ strategy.job-index }}.txt
      - name: Upload logs
        uses: actions/upload-artifact@v3
        with:
          name: Build log for job ${{ strategy.job-index }}
          path: test-job-${{ strategy.job-index }}.txt
```

10. matrix

    对于具有矩阵的工作流，matrix 上下文包含工作流程文件中定义的适用于当前作业的矩阵属性。 例如，如果使用 os 和 node 键配置矩阵，则 matrix 上下文对象包含 os 和 node 属性，该属性具有用于当前作业的值

```YAML
name: Test matrix
on: push

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest]
        node: [14, 16]
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node }}
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
```

11. needs

    needs 上下文包含定义为当前作业直接依赖项的所有作业的输出。 请注意，这不包括隐式依赖作业（例如依赖作业的依赖作业）

```YAML
name: Build and deploy
on: push

jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      build_id: ${{ steps.build_step.outputs.build_id }}
    steps:
      - uses: actions/checkout@v3
      - name: Build
        id: build_step
        run: |
          ./build
          echo "build_id=$BUILD_ID" >> $GITHUB_OUTPUT
  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: ./deploy --build ${{ needs.build.outputs.build_id }}
  debug:
    needs: [build, deploy]
    runs-on: ubuntu-latest
    if: ${{ failure() }}
    steps:
      - uses: actions/checkout@v3
      - run: ./debug
```

12. inputs

    inputs 上下文包含传递给操作可重用工作流或手动触发的工作流的输入属性。

```YAML
name: Reusable deploy workflow
on:
  workflow_call:
    inputs:
      build_id:
        required: true
        type: number
      deploy_target:
        required: true
        type: string
      perform_deploy:
        required: true
        type: boolean

jobs:
  deploy:
    runs-on: ubuntu-latest
    if: ${{ inputs.perform_deploy }}
    steps:
      - name: Deploy build to target
        run: deploy --build ${{ inputs.build_id }} --target ${{ inputs.deploy_target }}
```

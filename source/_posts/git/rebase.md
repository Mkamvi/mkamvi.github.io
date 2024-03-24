---
title: Rebase - Git
date: 2024-03-24 07:40:12
tags:
  - Git
categories:
  - Git
---

## Rebase

“确定将main变基到develop分支吗”

这句话的含义是将main分支的代码更新到与develop提交一致的记录，即将develop的分支的commit在main分支上重新提交一遍

git rebase A B 意思是：

将在B上的提交基于A的提交重新提一遍，然后重新指向B

如果你正在A分支
git rebase => git rebase origin/A A

所谓变基，即修改基础提交(某个历史提交)

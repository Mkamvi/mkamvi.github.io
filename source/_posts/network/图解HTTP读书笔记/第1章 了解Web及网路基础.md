---
title: 第1章 了解Web及网络基础 - 计算机网络 · 《图解HTTP》
date: 2024-03-18 08:05:01
tags:
  - 计算机网络
categories:
  - 计算机网络
---

## 网络分层

### 应用层

应用层决定了向用户提供应用服务时的通信活动，如FTP、DNS、HTTP

### 传输层

传输层对上层应用层，提供处于网络连接中的两台计算机之间的数据传输，传输层有两个性质不同的协议：TCP和UDP

### 网络层

网络层用来处理在网络上流动的数据包，数据包是网络上传输的最小单位，该层规定了通过怎样的路径到达对方计算机，并把数据包传送给对方；与对方计算机之间通过多台计算机或网络设备进行传输时，网络层所起的作用就是在众多的选项内选择一条传输路线

### 链路层

用来处理连接网络的硬件部分，包括控制操作系统、硬件的设备驱动、(NIC，网络适配器，即网卡)，及光纤等物理可见部分

### TCP三次握手

1. 发送方发送标有SYN的数据包发送待确认

2. 接收方发送标有SYN/ACK的数据包确认

3. 发送方发送标有ACK的数据包确认

### HTTP协议与其他协议的关系

1. DNS
2. TCP
3. IP

### URI和URL

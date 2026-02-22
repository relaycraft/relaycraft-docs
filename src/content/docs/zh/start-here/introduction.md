---
title: 介绍
description: 欢迎使用 RelayCraft - AI 原生的 Web 调试代理。
---

**RelayCraft** 是一款专为开发者、测试人员和安全研究人员设计的现代、跨平台 Web 调试代理。它允许您捕获、检查、修改和重放客户端与服务器之间的网络流量。

与传统工具不同，RelayCraft 以 **AI 为核心** 构建，通过自然语言让规则创建、流量分析和脚本编写等复杂任务变得触手可及。

## 为什么选择 RelayCraft?

### 🤖 AI 驱动的工作流
无需再与复杂的正则或 Python 语法纠缠。只需告诉 RelayCraft 您想要做什么：
-   *"阻止所有第三方跟踪脚本"*
-   *"在结账接口模拟 500 错误"*
-   *"解释为什么这个请求失败了"*

### ⚡️ 高性能
RelayCraft 基于 **Rust** (核心引擎) 和 **Tauri** (UI) 构建，轻量且极速。它能以极低的内存占用处理每秒数千个请求。

### 🔌 可扩展生态
RelayCraft 不仅仅是一个工具，它是一个平台。
-   **Python 脚本**: 利用 `mitmproxy` 的全部能力编写自定义逻辑。
-   **插件系统**: 使用自定义 React 组件扩展 UI。
-   **插件市场**: 一键发现并安装社区插件。

## 主要功能

-   **流量监控**: 实时检查 HTTP/HTTPS 流量。
-   **规则引擎**: 可视化、无代码的流量操作（本地映射、远程映射、重写）。
-   **请求构造器**: 手动构建和测试 API 请求。
-   **脚本能力**: 使用 Python 进行高级拦截。
-   **跨平台**: 原生支持 macOS、Windows 和 Linux。

## 下一步

-   [核心概念](/zh/start-here/core-concepts): 了解 RelayCraft 的工作原理。
-   [快速开始](/zh/start-here/getting-started): 安装并配置代理。
-   [流量监控](/zh/core-features/traffic-monitor): 开始检查您的流量。

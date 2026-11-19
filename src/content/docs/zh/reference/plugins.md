---
title: 插件与 API
description: RelayCraft 插件模型、能力边界、API 契约与权限模型的一体化参考。
---

:::tip[插件开发指南]
完整的插件开发指南（包括目录结构、清单文件、构建模式、示例代码）请查看 [CONTRIBUTING.md](https://github.com/relaycraft/relaycraft-plugins/blob/main/CONTRIBUTING.zh-CN.md)。

如需更新本文档，请先参考上述源文件中的最新内容。
:::

本页是 RelayCraft 插件能力与 `RelayCraft.api` 的统一参考页。

## 插件可扩展范围

- 左侧导航页面（`api.ui.registerPage`）
- 标准 UI 插槽（`api.ui.registerSlot`）
- 流量右键菜单动作（`api.ui.registerContextMenuItem`）
- 规则自动化——创建、编辑、停用插件自己拥有的 mock（`api.rules.createMock`、`getOwnMock`、`disableMock`）
- 流量分析（`api.traffic.listFlows`、`api.traffic.getFlow`）
- 运行时状态感知（`api.host.getRuntime`）

## 运行时入口

插件 UI 代码会收到：

- `RelayCraft.api`：插件作用域 API
- `RelayCraft.components`：宿主提供的组件集合
- `RelayCraft.icons`：宿主提供的图标集合

`ProxyPilot` 保留为 `RelayCraft` 的兼容别名。

## Manifest 基础结构

每个插件通过 `plugin.yaml` 声明元信息、能力与权限。

```yaml
manifestVersion: "1.0"
id: "com.example.my-plugin"
name: "我的插件"
version: "0.1.0"
entry:
  ui: "dist/index.js"
permissions:
  - traffic:read
  - rules:write
capabilities:
  ui:
    pages:
      - id: "my-page"
        title: "我的页面"
        icon: "Puzzle"
        path: "/my-page"
```

## 权限模型

受限 API 在 `permissions` 未声明时会被宿主拦截。

| API 方法 | 所需权限 |
| :--- | :--- |
| `ai.chat`、`ai.chatStream` | `ai:chat` |
| `http.send` | `network:outbound` |
| `proxy.getStatus` | `proxy:read` |
| `stats.getProcessStats` | `stats:read` |
| `storage.get`、`storage.list` | `storage:read` |
| `storage.set`、`storage.delete`、`storage.clear` | `storage:write` |
| `rules.list`、`rules.get` | `rules:read` |
| `rules.createMock`、`rules.disableMock`、`rules.getOwnMock` | `rules:write` |
| `traffic.listFlows`、`traffic.getFlow` | `traffic:read` |

`host.getRuntime` 以及 `ui`/`theme`/`i18n`/`log`/`events`/`settings` 调用不需要额外权限。

## 命名空间总览

### i18n

- `t(key, options?)`
- `language`
- `onLanguageChange(callback)`——返回取消订阅函数
- `registerLocale(lang, resources)`

### theme

- `register(theme)`
- `set(themeId)`

### ui

- `registerPage(page)`
- `registerSlot(slotId, options)`——`options.component`
- `registerContextMenuItem(config)`
- `toast(message, type?)`
- `components`——宿主共享组件：`Editor`、`DiffEditor`、`Markdown`

### ai

- `chat(messages)`
- `chatStream(messages, onChunk, options?)`
- `isEnabled()`

### stats

- `getProcessStats()`

### proxy

- `getStatus()`

### settings

- `get(key?)`——读取插件自身的设置

### log

- `info(message, context?)`
- `warn(message, context?)`
- `error(message, error?)`

### http

- `send(request)`

### storage

- `get(key)`
- `set(key, value)`
- `delete(key)`
- `list(prefix?)`
- `clear()`

### events

- `on(eventName, callback)`——返回取消订阅函数

### rules

- `list(filter?)`
- `get(id)`
- `createMock(config)`——返回新规则 ID
- `getOwnMock(ruleId)`——获取本插件创建的 mock，用于编辑
- `disableMock(ruleId)`——停用本插件创建的 mock

### traffic

- `listFlows(filter?)`
- `getFlow(id, options?)`

### host

- `getRuntime()`

## UI 插槽

标准插槽名称：

- `sidebar-top`
- `sidebar-bottom`
- `status-bar-left`
- `status-bar-center`
- `status-bar-right`
- `flow-detail-tabs`
- `flow-detail-actions`

## Traffic API 数据结构

### listFlows(filter?)

过滤字段：

- `sessionId`、`method`、`host`、`urlPattern`、`status`
- `offset`、`limit`

返回字段：

- `flows[]`
- `total`、`offset`、`limit`、`hasMore`

### getFlow(id, options?)

可选参数：

- `includeBodies`（默认 `false`）
- `maxBodyBytes`（默认 `128KB`，宿主硬上限 `2MB`）

返回值包含 request/response 元数据与规则命中信息。

## 兼容性说明

- RelayCraft 保持 v1 向后兼容。
- 新能力以增量方式扩展。
- 权限检查由宿主桥在运行时强制执行。

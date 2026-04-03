---
title: 插件与 API
description: RelayCraft 插件模型、能力边界、API 契约与权限模型的一体化参考。
---

本页是 RelayCraft 插件能力与 `RelayCraft.api` 的统一参考页。

## 插件可扩展范围

- 左侧导航页面（`api.ui.registerPage`）
- 标准 UI 插槽（`api.ui.registerSlot`）
- 流量右键菜单动作（`api.ui.registerContextMenuItem`）
- 规则自动化（`api.rules.createMock`）
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
| `stats.getProcessStats` | `stats:read` |
| `rules.list` | `rules:read` |
| `rules.get` | `rules:read` |
| `rules.createMock` | `rules:write` |
| `traffic.listFlows` | `traffic:read` |
| `traffic.getFlow` | `traffic:read` |

`host.getRuntime` 不需要额外权限。

## 命名空间总览

### i18n

- `t(key, options?)`
- `changeLanguage(lng)`
- `getCurrentLanguage()`

### theme

- `register(theme)`
- `remove(themeName)`
- `list()`

### ui

- `registerPage(page)`
- `unregisterPage(pageId)`
- `registerSlot(slotName, component, props?)`
- `unregisterSlot(slotId)`
- `registerContextMenuItem(item)`
- `unregisterContextMenuItem(itemId)`
- `toast(message, type?)`

### ai

- `chat(messages)`
- `complete(prompt, options?)`

### stats

- `getProcessStats()`

### proxy

- `getStatus()`
- `start()`
- `stop()`
- `restart()`

### settings

- `get(key?)`
- `set(key, value)`
- `watch(key, cb)`

### log

- `info(message, context?)`
- `warn(message, context?)`
- `error(message, context?)`
- `debug(message, context?)`

### http

- `send(request)`

### storage

- `get(key)`
- `set(key, value)`
- `remove(key)`
- `clear()`
- `list()`

### events

- `on(eventName, callback)`
- `off(eventName, callback)`
- `emit(eventName, payload)`

### rules

- `list(filter?)`
- `get(id)`
- `createMock(config)`

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

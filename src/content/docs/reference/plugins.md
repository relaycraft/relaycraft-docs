---
title: Plugins & API
description: Unified reference for RelayCraft plugin model, capabilities, API contracts, and permissions.
---

This page is the unified reference for RelayCraft plugin capabilities and `RelayCraft.api`.

## What Plugins Can Extend

- Left sidebar pages (`api.ui.registerPage`)
- Standard UI slots (`api.ui.registerSlot`)
- Traffic context menu actions (`api.ui.registerContextMenuItem`)
- Rule automation (`api.rules.createMock`)
- Traffic analytics (`api.traffic.listFlows`, `api.traffic.getFlow`)
- Runtime-aware dashboards (`api.host.getRuntime`)

## Runtime Entry

Plugin UI code receives:

- `RelayCraft.api`: scoped plugin API
- `RelayCraft.components`: curated host UI components
- `RelayCraft.icons`: curated icon set

`ProxyPilot` is kept as a compatibility alias of `RelayCraft`.

## Manifest Essentials

Each plugin defines metadata, capabilities, and permissions in `plugin.yaml`.

```yaml
manifestVersion: "1.0"
id: "com.example.my-plugin"
name: "My Plugin"
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
        title: "My Page"
        icon: "Puzzle"
        path: "/my-page"
```

## Permission Model

Restricted API calls are blocked unless the permission is declared in `permissions`.

| API Method | Required Permission |
| :--- | :--- |
| `stats.getProcessStats` | `stats:read` |
| `rules.list` | `rules:read` |
| `rules.get` | `rules:read` |
| `rules.createMock` | `rules:write` |
| `traffic.listFlows` | `traffic:read` |
| `traffic.getFlow` | `traffic:read` |

`host.getRuntime` does not require additional permission.

## Namespace Overview

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

## UI Slots

Standard slot names:

- `sidebar-top`
- `sidebar-bottom`
- `status-bar-left`
- `status-bar-center`
- `status-bar-right`
- `flow-detail-tabs`
- `flow-detail-actions`

## Traffic API Shape

### listFlows(filter?)

Filter fields:

- `sessionId`, `method`, `host`, `urlPattern`, `status`
- `offset`, `limit`

Response fields:

- `flows[]`
- `total`, `offset`, `limit`, `hasMore`

### getFlow(id, options?)

Options:

- `includeBodies` (default `false`)
- `maxBodyBytes` (default `128KB`, host hard cap `2MB`)

Response includes request/response metadata and rule hit info.

## Compatibility Notes

- RelayCraft keeps v1 APIs backward compatible.
- New APIs are additive.
- Permission checks are enforced at runtime by the host bridge.

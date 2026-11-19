---
title: Plugins & API
description: Unified reference for RelayCraft plugin model, capabilities, API contracts, and permissions.
---

:::tip[Plugin Development Guide]
For the complete plugin development guide (including directory structure, manifest, build mode, and code examples), see [CONTRIBUTING.md](https://github.com/relaycraft/relaycraft-plugins/blob/main/CONTRIBUTING.md).

When updating this page, please refer to the source file above for the latest content.
:::

This page is the unified reference for RelayCraft plugin capabilities and `RelayCraft.api`.

## What Plugins Can Extend

- Left sidebar pages (`api.ui.registerPage`)
- Standard UI slots (`api.ui.registerSlot`)
- Traffic context menu actions (`api.ui.registerContextMenuItem`)
- Rule automation — create, edit, and disable mocks the plugin owns (`api.rules.createMock`, `getOwnMock`, `disableMock`)
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
| `ai.chat`, `ai.chatStream` | `ai:chat` |
| `http.send` | `network:outbound` |
| `proxy.getStatus` | `proxy:read` |
| `stats.getProcessStats` | `stats:read` |
| `storage.get`, `storage.list` | `storage:read` |
| `storage.set`, `storage.delete`, `storage.clear` | `storage:write` |
| `rules.list`, `rules.get` | `rules:read` |
| `rules.createMock`, `rules.disableMock`, `rules.getOwnMock` | `rules:write` |
| `traffic.listFlows`, `traffic.getFlow` | `traffic:read` |

`host.getRuntime` and `ui`/`theme`/`i18n`/`log`/`events`/`settings` calls do not require additional permission.

## Namespace Overview

### i18n

- `t(key, options?)`
- `language`
- `onLanguageChange(callback)` — returns an unsubscribe function
- `registerLocale(lang, resources)`

### theme

- `register(theme)`
- `set(themeId)`

### ui

- `registerPage(page)`
- `registerSlot(slotId, options)` — `options.component`
- `registerContextMenuItem(config)`
- `toast(message, type?)`
- `components` — shared host components: `Editor`, `DiffEditor`, `Markdown`

### ai

- `chat(messages)`
- `chatStream(messages, onChunk, options?)`
- `isEnabled()`

### stats

- `getProcessStats()`

### proxy

- `getStatus()`

### settings

- `get(key?)` — read the plugin's own settings

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

- `on(eventName, callback)` — returns an unsubscribe function

### rules

- `list(filter?)`
- `get(id)`
- `createMock(config)` — returns the new rule ID
- `getOwnMock(ruleId)` — fetch a mock this plugin created, for editing
- `disableMock(ruleId)` — disable a mock this plugin created

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

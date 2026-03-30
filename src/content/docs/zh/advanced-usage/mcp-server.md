---
title: MCP 服务器
description: 通过 Model Context Protocol 将 AI 助手接入 RelayCraft，实现流量查询、请求重放和规则管理。
sidebar:
  order: 3
---

RelayCraft 内置了一个 **MCP（Model Context Protocol）服务器**，让 AI 助手（如 Claude、Cursor 或任何兼容 MCP 的客户端）能够直接与代理会话交互。AI 可以在对话中查询捕获的流量、重放并修改请求、创建或切换规则，无需离开对话界面。

## 启用 MCP 服务器

1. 打开 **设置 → 外部集成**。
2. 开启开关。RelayCraft 会在配置的端口（默认 `7090`）启动 HTTP 服务。
3. 复制面板中显示的 **Bearer Token**，写操作需要用到它。

## 连接客户端

将 MCP 客户端指向：

```
http://localhost:7090/mcp
```

以 Claude Desktop 为例，在 `claude_desktop_config.json` 中添加：

```json
{
  "mcpServers": {
    "relaycraft": {
      "type": "http",
      "url": "http://localhost:7090/mcp",
      "headers": {
        "Authorization": "Bearer <your-token>"
      }
    }
  }
}
```

服务器使用 **JSON-RPC 2.0 over HTTP POST**，遵循 MCP 协议规范（`2024-11-05`）。

## 可用工具

### 只读工具

这些工具无需认证，可安全暴露给任何 MCP 客户端。

#### `list_sessions`

列出所有已录制的调试会话。

```
list_sessions()
→ 返回 Session ID、名称、时间戳、Flow 数量
```

#### `list_flows`

查询会话中的 Flow，支持多种过滤条件。

| 参数 | 类型 | 说明 |
|------|------|------|
| `session_id` | string? | 目标会话。不填则使用当前活跃会话。 |
| `limit` | integer | 最多返回条数。默认 `50`，最大 `200`。 |
| `method` | string? | 按 HTTP 方法过滤：`GET`、`POST` 等。 |
| `status` | string? | 按状态码或区间过滤：`404`、`4xx`、`5xx`。 |
| `domain` | string? | Host 子串匹配。 |
| `has_error` | boolean? | 仅返回含错误的 Flow。 |
| `content_type` | string? | 响应 `Content-Type` 子串匹配。 |

#### `get_flow`

获取单个 Flow 的完整详情——请求头、响应头、请求体、响应体。

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | string | Flow ID，来自 `list_flows` 或 `search_flows`。 |

超过 100 KB 的响应体会被截断。

#### `search_flows`

按关键词搜索 Flow。默认搜索完整 URL，通过 `search_in` 参数可搜索请求/响应体或 Header 内容。

| 参数 | 类型 | 说明 |
|------|------|------|
| `query` | string | 搜索关键词。 |
| `search_in` | string | 搜索位置：`url`（默认）、`response_body`、`request_body`、`header`。 |
| `case_sensitive` | boolean | 是否区分大小写。默认 `false`。 |
| `session_id` | string? | 目标会话。 |
| `limit` | integer | 最多返回条数。默认 `20`，最大 `50`。 |

Body 和 Header 搜索最多扫描最近的 5000 条 Flow；URL 搜索为即时操作。

```
# 找出响应体中含有 "NullPointerException" 的请求
search_flows(query="NullPointerException", search_in="response_body")

# 找出 Header 中携带特定 Token 的请求
search_flows(query="Bearer eyJ", search_in="header")
```

#### `get_session_stats`

汇总指定会话的统计信息——总 Flow 数、错误率、Top 域名、状态码分布、最慢请求。

| 参数 | 类型 | 说明 |
|------|------|------|
| `session_id` | string? | 目标会话。不填则使用当前活跃会话。 |

#### `list_rules`

列出所有规则的关键信息（ID、名称、类型、URL 匹配、启用状态、来源）。

```
list_rules()
→ 用于后续 delete/toggle 等操作前先拿到 rule_id
```

---

### 写操作工具

写操作工具需要在请求头中携带 **`Authorization: Bearer <token>`**。

#### `replay_request`

通过代理重放一条已捕获的请求，支持在发送前修改任意字段。重放后的请求会出现在流量列表中，可用 `get_flow` 查看响应。

| 参数 | 类型 | 说明 |
|------|------|------|
| `flow_id` | string | 要重放的 Flow ID。 |
| `modifications.url` | string? | 覆盖完整 URL，包括协议、Host、路径和 Query 参数。 |
| `modifications.method` | string? | 覆盖 HTTP 方法。 |
| `modifications.headers` | object? | 新增或覆盖请求头的键值对。 |
| `modifications.body` | string? | 替换请求体。 |

```
# 重放但切换到 v2 接口并替换认证头
replay_request(
  flow_id="abc123",
  modifications={
    "url": "https://api.example.com/v2/users",
    "headers": {"Authorization": "Bearer new-token"}
  }
)
```

#### `create_rule`

创建一条代理规则，立即生效。

| 参数 | 类型 | 说明 |
|------|------|------|
| `type` | string | 规则类型（见下表）。 |
| `name` | string | 规则名称。 |
| `url_pattern` | string | 匹配的 URL 子串。 |
| `method` | string? | 可选，按 HTTP 方法过滤。 |

**规则类型及附加参数：**

| 类型 | 附加参数 |
|------|---------|
| `map_local` | `mock_body`、`mock_content_type`（默认 `application/json`）、`mock_status`（默认 `200`） |
| `map_remote` | `target_url`（必填） |
| `rewrite_body` | `rewrite_target`（`request`/`response`）、`rewrite_mode`（`set`/`replace`/`regex_replace`/`status_code`）、`rewrite_content`、`rewrite_pattern`、`rewrite_replacement`、`rewrite_status`、`rewrite_content_type` |
| `rewrite_header` | `header_phase`（`request`/`response`）、`header_operation`（`add`/`set`/`remove`）、`header_name`、`header_value` |
| `throttle` | `bandwidth_kbps`、`delay_ms` |
| `block_request` | _（无附加参数）_ |

#### `delete_rule`

按 ID 删除规则。

| 参数 | 类型 | 说明 |
|------|------|------|
| `rule_id` | string | 要删除的规则 ID。 |

#### `toggle_rule`

启用或禁用规则，不删除。

| 参数 | 类型 | 说明 |
|------|------|------|
| `rule_id` | string | 目标规则 ID。 |
| `enabled` | boolean | `true` 启用，`false` 禁用。 |

## 典型工作流

以下是一个由 AI 驱动的调试过程示例：

1. **捕获流量** — 在 RelayCraft 拦截的同时运行你的应用。
2. 问 AI："找出 api.example.com 的所有 5xx 错误"
   → `list_flows(domain="api.example.com", status="5xx")`
3. 问 AI："给我看第一个错误的完整请求和响应"
   → `get_flow(id="...")`
4. 问 AI："重放这个请求，但换一个 Authorization 头"
   → `replay_request(flow_id="...", modifications={headers: {...}})`
5. 问 AI："先把这个接口 Mock 成固定的 200 响应，等我修好后端"
   → `create_rule(type="map_local", ...)`

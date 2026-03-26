---
title: MCP Server
description: Connect AI agents to RelayCraft via the Model Context Protocol to query traffic, replay requests, and manage rules programmatically.
sidebar:
  order: 3
---

RelayCraft includes a built-in **MCP (Model Context Protocol) server** that lets AI assistants — such as Claude, Cursor, or any MCP-compatible client — interact directly with your proxy session. The AI can query captured traffic, replay requests with modifications, and create or toggle rules, all from a natural language conversation.

## Enabling the MCP Server

1. Open **Settings → Integrations → MCP Server**.
2. Toggle it on. RelayCraft starts an HTTP server on the configured port (default `7090`).
3. Copy the **Bearer token** shown in the panel — you'll need it for write operations.

## Connecting a Client

Configure your MCP client to point to:

```
http://127.0.0.1:7090/mcp
```

For Claude Desktop, add an entry to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "relaycraft": {
      "url": "http://127.0.0.1:7090/mcp",
      "headers": {
        "Authorization": "Bearer <your-token>"
      }
    }
  }
}
```

The server uses **JSON-RPC 2.0** over HTTP POST and follows the MCP protocol spec (`2024-11-05`).

## Available Tools

### Read Tools

These tools do not require authentication and are safe to expose to any MCP client.

#### `list_sessions`

List all recorded debugging sessions.

```
list_sessions()
→ Session IDs, names, timestamps, flow counts
```

#### `list_flows`

Query flows in a session with optional filters.

| Parameter | Type | Description |
|-----------|------|-------------|
| `session_id` | string? | Session to query. Omit for the active session. |
| `limit` | integer | Max flows to return. Default `50`, max `200`. |
| `method` | string? | Filter by HTTP method: `GET`, `POST`, etc. |
| `status` | string? | Filter by status code or range: `404`, `4xx`, `5xx`. |
| `domain` | string? | Substring match on the host. |
| `has_error` | boolean? | Return only flows that have errors. |
| `content_type` | string? | Substring match on the response `Content-Type`. |

#### `get_flow`

Get full details of a single flow — headers, request body, response body.

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Flow ID from `list_flows` or `search_flows`. |

Response bodies larger than 100 KB are truncated.

#### `search_flows`

Search flows by keyword. By default, matches against the full URL. Use `search_in` to search inside request/response bodies or headers instead.

| Parameter | Type | Description |
|-----------|------|-------------|
| `query` | string | Keyword to search for. |
| `search_in` | string | Where to search: `url` (default), `response_body`, `request_body`, `header`. |
| `case_sensitive` | boolean | Case-sensitive match. Default `false`. |
| `session_id` | string? | Session to search within. |
| `limit` | integer | Max results. Default `20`, max `50`. |

Body and header searches scan up to the 5 000 most recent flows. URL search is instant.

```
# Find all flows whose response body mentions "NullPointerException"
search_flows(query="NullPointerException", search_in="response_body")

# Find flows passing a specific token in a header
search_flows(query="Bearer eyJ", search_in="header")
```

#### `get_session_stats`

Aggregate statistics for a session — total flows, error rate, top domains, status distribution, slowest requests.

| Parameter | Type | Description |
|-----------|------|-------------|
| `session_id` | string? | Session to summarise. Omit for the active session. |

---

### Write Tools

Write tools require the **`Authorization: Bearer <token>`** header.

#### `replay_request`

Replay a captured request through the proxy, optionally with modifications. The replayed request appears in the traffic list so you can inspect the response with `get_flow`.

| Parameter | Type | Description |
|-----------|------|-------------|
| `flow_id` | string | Flow to replay. |
| `modifications.url` | string? | Override the full URL including scheme, host, path, and query string. |
| `modifications.method` | string? | Override the HTTP method. |
| `modifications.headers` | object? | Key-value pairs to add or override request headers. |
| `modifications.body` | string? | Replacement request body. |

```
# Replay with a different endpoint
replay_request(
  flow_id="abc123",
  modifications={
    "url": "https://api.example.com/v2/users",
    "headers": {"Authorization": "Bearer new-token"}
  }
)
```

#### `create_rule`

Create a proxy rule that takes effect immediately.

| Parameter | Type | Description |
|-----------|------|-------------|
| `type` | string | Rule type (see below). |
| `name` | string | Descriptive rule name. |
| `url_pattern` | string | URL substring to match. |
| `method` | string? | Optional HTTP method filter. |

**Rule types and their extra parameters:**

| Type | Extra Parameters |
|------|-----------------|
| `map_local` | `mock_body`, `mock_content_type` (default `application/json`), `mock_status` (default `200`) |
| `map_remote` | `target_url` (required) |
| `rewrite_body` | `rewrite_target` (`request`/`response`), `rewrite_mode` (`set`/`replace`/`regex_replace`/`status_code`), `rewrite_content`, `rewrite_pattern`, `rewrite_replacement`, `rewrite_status`, `rewrite_content_type` |
| `rewrite_header` | `header_phase` (`request`/`response`), `header_operation` (`add`/`set`/`remove`), `header_name`, `header_value` |
| `throttle` | `bandwidth_kbps`, `delay_ms` |
| `block_request` | _(no extra params)_ |

#### `delete_rule`

Delete a rule by ID.

| Parameter | Type | Description |
|-----------|------|-------------|
| `rule_id` | string | ID of the rule to delete. |

#### `toggle_rule`

Enable or disable a rule without deleting it.

| Parameter | Type | Description |
|-----------|------|-------------|
| `rule_id` | string | Rule to toggle. |
| `enabled` | boolean | `true` to enable, `false` to disable. |

## Example Workflow

Here is a typical debugging session driven by an AI agent:

1. **Capture traffic** — run your app while RelayCraft is intercepting.
2. Ask the AI: *"Find all 5xx errors from api.example.com"*
   → `list_flows(domain="api.example.com", status="5xx")`
3. Ask: *"Show me the full request and response for the first error"*
   → `get_flow(id="...")`
4. Ask: *"Replay it but change the Authorization header"*
   → `replay_request(flow_id="...", modifications={headers: {...}})`
5. Ask: *"Mock that endpoint to return a fixed 200 response while I fix the backend"*
   → `create_rule(type="map_local", ...)`

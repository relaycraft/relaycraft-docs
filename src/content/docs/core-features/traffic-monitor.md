---
title: Traffic Monitor
description: Inspect, filter, and analyze network traffic in real-time.
---

The Traffic Monitor is the central hub of RelayCraft, providing a real-time view of all HTTP and HTTPS traffic passing through the proxy. It allows you to inspect request details, filter for specific flows, and analyze performance.

## Main Interface

The traffic view displays a list of network requests with key information:
-   **Source**: The app or process that made the request, shown as an icon (real app marks for known browsers and tools). Hover to see the process name and PID.
-   **Method**: HTTP method (GET, POST, etc.).
-   **Status**: HTTP status code (200, 404, 500, etc.) with color coding.
-   **Host & Path**: The destination server and resource path.
-   **Size**: Response body size.
-   **Time**: Duration of the request.
-   **Type**: Content type (JSON, HTML, Image, etc.).

## Filtering Traffic

Use the **Filter Bar** at the top to narrow down the traffic list.

### Basic Filtering
Type any text to match against the URL, method, or status code.
-   `api` matches requests containing "api".
-   `POST` matches POST requests.
-   `404` matches requests with status 404.

### Advanced Search Syntax

RelayCraft supports powerful advanced search syntax for precise traffic filtering.

**Keywords**:
-   `method:POST` - Only show POST requests (alias `m:`).
-   `status:4xx` - Show requests with status codes 400-499 (supports `2xx`, `3xx`, `4xx`, `5xx`; alias `s:`).
-   `status:4xx,5xx` - Comma-separated union inside a single keyword.
-   `domain:api` - Substring match on the host (aliases `d:`, `host:`).
-   `source:chrome` - Match the traffic source: client IP, app name, or process name (alias `src:`).
-   `process:curl` - Match the local process name exactly (alias `proc:`).
-   `pid:4321` - Match the exact process ID.
-   `ip:192.168` - Match client or server IP.
-   `type:json` - Show requests with Content-Type as JSON (alias `t:`).
-   `header:authorization` - Match header names or values; `header:key:value` matches a specific header (alias `h:`).
-   `body:token` - Search inside response bodies (alias `resbody:`).
-   `reqbody:email` - Search inside request bodies (alias `rb:`).
-   `size:>1mb` - Show requests with response body larger than 1MB (supports `kb`, `mb`, `gb`; alias `sz:`).
-   `duration:>500ms` - Show requests taking longer than 500ms (supports `ms`, `s`, `m`; alias `dur:`).
-   `-domain:google` - Exclude requests where the domain contains "google" (also `!domain:google`).

**Query Logic**:
-   **Intersection (AND)**: Separate different conditions with spaces.
    -   Example: `method:POST type:json` (Must be POST AND JSON).
-   **Union (OR)**: Enter multiple conditions of the same type.
    -   Example: `status:4xx status:5xx` (Show 4xx OR 5xx requests).
-   **Exclusion**: Prefix the condition with `-`.
    -   Example: `-domain:google` (Exclude Google-related requests).
-   **Comparison**: Supports `>` (greater than) and `<` (less than).
    -   Example: `size:>1mb` (Larger than 1MB).

### Advanced Options
-   **Regex**: Enable Regular Expression mode for complex pattern matching.
-   **Case Sensitive**: Toggle case sensitivity for the filter.
-   **Only Matched**: Hide unmatched requests entirely instead of just dimming them.

### AI Filter
Click the **AI Assistant** icon in the filter bar to generate filter patterns using natural language.
-   Example: *"Show me all failed POST requests to api.example.com"*

## Capture Scope

Filtering changes what you *see*. Capture scope changes what gets *recorded*. Click the **Capture scope** button next to the filter bar to limit capture to specific processes:

-   **Include**: Comma-separated process names — only traffic from these processes is recorded.
-   **Exclude**: Comma-separated process names — traffic from these processes is dropped.
-   **Recent processes**: One-click suggestions built from recently observed sources.

Scope applies at the engine level, so excluded traffic never reaches the session. To quickly scope to a single app, right-click any flow and choose **Record only `<process>`**.

## Flow Details

Clicking on any request in the list opens the **Flow Detail** panel on the right.

### Request & Response
-   **Headers**: View and copy HTTP headers.
-   **Body**: Inspect the request/response body with syntax highlighting for JSON, XML, HTML, etc.
    -   Supports pretty-printing for minified code.
    -   Image preview for image responses.
-   **Cookies**: View parsed cookies.

### Overview
-   **Timing**: Detailed breakdown of the request lifecycle (DNS, TCP, SSL, TTFB, Download).
-   **General**: Protocol version, TLS version, connection details, and the source process/app attribution.

### Diagnostic Package

From the flow detail panel you can export a **metadata-only diagnostic package** — a sanitized snapshot of the flow (timing, headers, rule hits, engine state) designed to be shared when asking for help. Request/response bodies are never included.

## Context Actions

Right-click on any request to access quick actions:

-   **Copy**: Copy URL, cURL command, or Request/Response body.
-   **Replay**: Resend the request immediately.
-   **Compose**: Edit the request in the Composer before sending.
-   **Create Rule**: Quickly create a Map Local or Rewrite rule based on this request.
-   **Add Breakpoint**: Stop future requests matching this URL to modify them on the fly.
-   **Record Only `<process>`**: Apply a capture scope that records only the process that produced this flow.

## Breakpoints

Breakpoints allow you to pause a request or response to modify it before it proceeds.

1.  **Set a Breakpoint**: Right-click a request or use the Breakpoint Manager.
2.  **Trigger**: When a matching request is made, RelayCraft pauses execution.
3.  **Edit**: You can modify headers, body, or status code in the suspended state.
4.  **Resume**: Click "Resume" to send the modified request/response to its destination.

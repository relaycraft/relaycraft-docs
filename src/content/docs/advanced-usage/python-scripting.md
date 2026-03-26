---
title: Python Scripting
description: Extend RelayCraft with custom Python scripts using the mitmproxy API.
---

RelayCraft allows you to extend its functionality using Python scripts. These scripts are standard `mitmproxy` addons, giving you full control over the traffic interception process.

## Managing Scripts

The **Script Manager** allows you to create, edit, and toggle scripts.

1.  **Create**: Click the `+` button to create a new script.
2.  **Edit**: Use the built-in editor to write your Python code.
3.  **Enable/Disable**: Toggle scripts on or off using the switch next to the script name.
4.  **Restart**: Because scripts are loaded into the core engine, **you must restart the proxy** for any changes (edits or toggles) to take effect. RelayCraft will prompt you when a restart is needed.

## Writing Scripts

Scripts in RelayCraft follow the standard [mitmproxy addon structure](https://docs.mitmproxy.org/stable/addons-overview/).

### Basic Structure

A basic script looks like this:

```python
from mitmproxy import http

class Addon:
    def request(self, flow: http.HTTPFlow):
        # Called when a client request is received
        if "example.com" in flow.request.pretty_host:
            flow.request.headers["X-Custom-Header"] = "RelayCraft"

    def response(self, flow: http.HTTPFlow):
        # Called when a server response is received
        if flow.response.status_code == 404:
            flow.response.status_code = 200
            flow.response.text = "Fixed by RelayCraft!"

addons = [Addon()]
```

### Key Events

-   `request(flow)`: Modify the request before it is sent to the server.
-   `response(flow)`: Modify the response before it is returned to the client.
-   `error(flow)`: Handle connection errors.

#### WebSocket Events

When a connection is upgraded to WebSocket, three additional hooks are available:

-   `websocket_start(flow)`: Called once when the WebSocket handshake completes and the connection is established.
-   `websocket_message(flow)`: Called for every frame. The latest frame is `flow.websocket.messages[-1]`.
-   `websocket_end(flow)`: Called once when the connection closes.

Use `websocket_start` and `websocket_end` to initialise and clean up per-connection state. Use `websocket_message` to inspect or modify individual frames.

## AI Script Assistant

RelayCraft includes an **AI Script Assistant** to help you write code.
1.  Open the Script Editor.
2.  Click the **AI** button or use the Command Center.
3.  Describe what you want to do (e.g., *"Modify all JSON responses from api.test.com to add a 'debug': true field"*).
4.  The AI will generate the Python code for you.

## Examples

### 1. Log Requests to File

```python
from mitmproxy import http

class Logger:
    def request(self, flow: http.HTTPFlow):
        with open("/tmp/requests.log", "a") as f:
            f.write(f"{flow.request.method} {flow.request.url}\n")

addons = [Logger()]
```

### 2. Random Delay (Chaos Engineering)

```python
import time
import random
from mitmproxy import http

class RandomDelay:
    def request(self, flow: http.HTTPFlow):
        if random.random() < 0.3: # 30% chance
            time.sleep(2) # Delay for 2 seconds

addons = [RandomDelay()]
```

### 3. WebSocket — Track Per-Connection Stats

```python
import time
from mitmproxy import http

class WebSocketStats:
    def __init__(self):
        self._conns = {}

    def websocket_start(self, flow: http.HTTPFlow):
        self._conns[flow.id] = {"start": time.time(), "count": 0}

    def websocket_message(self, flow: http.HTTPFlow):
        msg = flow.websocket.messages[-1]
        if flow.id in self._conns:
            self._conns[flow.id]["count"] += 1
        # Example: inject a debug field into JSON text frames from the server
        if not msg.from_client and msg.is_text:
            import json
            try:
                data = json.loads(msg.content)
                data["__rc_seq"] = self._conns.get(flow.id, {}).get("count", 0)
                msg.content = json.dumps(data)
            except (json.JSONDecodeError, TypeError):
                pass

    def websocket_end(self, flow: http.HTTPFlow):
        info = self._conns.pop(flow.id, None)
        if info:
            duration = time.time() - info["start"]
            print(f"[WS] {flow.request.host} — {info['count']} frames in {duration:.1f}s")

addons = [WebSocketStats()]
```

### 4. WebSocket — Block Specific Frames

```python
from mitmproxy import http
from mitmproxy.websocket import WebSocketMessage

class WebSocketFilter:
    def websocket_message(self, flow: http.HTTPFlow):
        msg = flow.websocket.messages[-1]
        # Drop any frame containing a sensitive keyword
        if msg.is_text and "internal_token" in msg.content:
            msg.drop()

addons = [WebSocketFilter()]
```

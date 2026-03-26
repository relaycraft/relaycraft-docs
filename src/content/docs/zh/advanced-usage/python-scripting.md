---
title: Python 脚本
description: 使用 mitmproxy API 编写 Python 脚本来扩展 RelayCraft 的功能。
---

RelayCraft 允许您使用 Python 脚本扩展其功能。这些脚本是标准的 `mitmproxy` 插件 (Addons)，让您能够完全控制流量拦截过程。

## 脚本管理

**脚本管理器** 允许您创建、编辑和开关脚本。

1.  **创建**: 点击 `+` 按钮创建一个新脚本。
2.  **编辑**: 使用内置编辑器编写 Python 代码。
3.  **启用/禁用**: 使用脚本名称旁边的开关来开启或关闭脚本。
4.  **重启**: 由于脚本被加载到核心引擎中，**您必须重启代理**才能使任何更改（编辑或开关）生效。RelayCraft 会在需要重启时提示您。

## 编写脚本

RelayCraft 中的脚本遵循标准的 [mitmproxy 插件结构](https://docs.mitmproxy.org/stable/addons-overview/)。

### 基本结构

一个基本的脚本如下所示：

```python
from mitmproxy import http

class Addon:
    def request(self, flow: http.HTTPFlow):
        # 当收到客户端请求时调用
        if "example.com" in flow.request.pretty_host:
            flow.request.headers["X-Custom-Header"] = "RelayCraft"

    def response(self, flow: http.HTTPFlow):
        # 当收到服务器响应时调用
        if flow.response.status_code == 404:
            flow.response.status_code = 200
            flow.response.text = "Fixed by RelayCraft!"

addons = [Addon()]
```

### 关键事件

-   `request(flow)`: 在请求发送到服务器之前修改它。
-   `response(flow)`: 在响应返回给客户端之前修改它。
-   `error(flow)`: 处理连接错误。

#### WebSocket 事件

当连接升级为 WebSocket 后，可使用以下三个额外的 Hook：

-   `websocket_start(flow)`: 握手完成、连接建立时调用一次。
-   `websocket_message(flow)`: 每条帧到达时调用。最新帧为 `flow.websocket.messages[-1]`。
-   `websocket_end(flow)`: 连接关闭时调用一次。

用 `websocket_start` 和 `websocket_end` 初始化和清理连接级别的状态，用 `websocket_message` 检查或修改每条帧。

## AI 脚本助手

RelayCraft 包含一个 **AI 脚本助手** 来帮助您编写代码。
1.  打开脚本编辑器。
2.  点击 **AI** 按钮或使用命令中心。
3.  描述您想要做什么（例如：*"修改所有来自 api.test.com 的 JSON 响应，添加一个 'debug': true 字段"*）。
4.  AI 将为您生成 Python 代码。

## 示例

### 1. 将请求日志记录到文件

```python
from mitmproxy import http

class Logger:
    def request(self, flow: http.HTTPFlow):
        with open("/tmp/requests.log", "a") as f:
            f.write(f"{flow.request.method} {flow.request.url}\n")

addons = [Logger()]
```

### 2. 随机延迟（混沌工程）

```python
import time
import random
from mitmproxy import http

class RandomDelay:
    def request(self, flow: http.HTTPFlow):
        if random.random() < 0.3: # 30% 概率
            time.sleep(2) # 延迟 2 秒

addons = [RandomDelay()]
```

### 3. WebSocket — 追踪每连接统计

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
        # 示例：向服务端下发的 JSON 文本帧注入调试字段
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
            print(f"[WS] {flow.request.host} — 共 {info['count']} 条帧，耗时 {duration:.1f}s")

addons = [WebSocketStats()]
```

### 4. WebSocket — 屏蔽特定帧

```python
from mitmproxy import http

class WebSocketFilter:
    def websocket_message(self, flow: http.HTTPFlow):
        msg = flow.websocket.messages[-1]
        # 丢弃包含敏感关键词的帧
        if msg.is_text and "internal_token" in msg.content:
            msg.drop()

addons = [WebSocketFilter()]
```

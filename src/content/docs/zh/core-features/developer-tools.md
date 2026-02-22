---
title: 请求构造器
description: 手动构建、测试和重放 HTTP 请求。
---

**请求构造器** 允许您直接从 RelayCraft 构建和发送自定义 HTTP 请求。它是测试 API、调试端点或复现问题的理想选择，无需使用 Postman 等外部工具。

## 创建请求

您可以从头开始创建一个新请求，也可以基于现有请求进行修改。

### 1. 从头开始
打开 **Composer** 标签页。您将看到一个清晰的界面来定义您的请求：
-   **方法**: GET, POST, PUT, DELETE, PATCH 等。
-   **URL**: 完整的目标 URL。
-   **Headers**: 添加自定义标头（例如 `Authorization`, `Content-Type`）。
-   **Body**: 定义请求负载。

### 2. 从流量列表
在 **流量监控** 中右键点击任何请求，选择 **编辑重发**。这会将所有详细信息（标头、正文、Cookie）复制到构造器中，允许您修改并重新发送。

## 请求体类型

RelayCraft 支持多种正文格式：

-   **无 (None)**: 用于 GET/DELETE 请求。
-   **JSON**: 带有语法高亮和验证的原始 JSON。
-   **Form Data**: 用于 `multipart/form-data` 的键值对（支持文件上传）。
-   **x-www-form-urlencoded**: 标准表单编码。
-   **Raw**: 纯文本、XML 或其他自定义格式。

## cURL 导入

已经有了 cURL 命令？
1.  点击 **导入 cURL** 按钮。
2.  粘贴您的命令。
3.  RelayCraft 会自动将其解析到构造器字段中。

## 响应视图

发送请求后，响应将显示在右侧面板（或底部面板，取决于布局）：
-   **状态**: 状态码和耗时。
-   **Headers**: 响应标头。
-   **Body**: 格式化的响应体（JSON, HTML, 图片等）。
-   **下载**: 将响应体保存到文件。

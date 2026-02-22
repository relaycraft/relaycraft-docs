---
title: Core Concepts
description: Understanding how RelayCraft works as a web debugging proxy.
---

Before diving into the features, it's helpful to understand what RelayCraft is and how it interacts with your network traffic. If you've used tools like Charles Proxy, Fiddler, or Whistle, many of these concepts will be familiar.

## What is a Web Debugging Proxy?

RelayCraft acts as an intermediary (a **Proxy Server**) between your client (browser, mobile app, or backend service) and the internet.

Instead of your app talking directly to a server, it talks to RelayCraft, which then talks to the server on your behalf. This architecture allows RelayCraft to:
1.  **Inspect**: See exactly what data is being sent and received.
2.  **Modify**: Change requests or responses on the fly.
3.  **Analyze**: Measure performance and detect errors.

## How It Works (HTTPS Decryption)

For standard HTTP traffic, RelayCraft simply forwards the text. However, most modern traffic is encrypted (HTTPS). To inspect HTTPS traffic, RelayCraft uses a technique called **MITM (Man-in-the-Middle) Proxying**.

1.  **Handshake**: When your client tries to connect to a secure server (e.g., `google.com`), RelayCraft intercepts the connection.
2.  **Certificate**: RelayCraft generates a dynamic security certificate for `google.com` and signs it with its own **Root Certificate Authority (CA)**.
3.  **Trust**: For this to work, your device must "trust" RelayCraft's Root CA. Once trusted, your device accepts RelayCraft's certificates as valid.
4.  **Decryption**: RelayCraft can now decrypt the traffic, show it to you in plain text, and re-encrypt it before sending it to the destination.

:::note[Security]
The Root CA is unique to your installation and is generated locally. RelayCraft never sends your private keys or traffic data to the cloud.
:::

## The Flow Lifecycle

In RelayCraft, a single request/response pair is called a **Flow**. A flow goes through several stages where you can intervene:

1.  **Request Phase**: The client sends a request.
    *   *Intervention*: You can modify headers, body, or URL *before* it leaves your computer.
    *   *Rules*: Map Remote, Rewrite Request.
2.  **Server Phase**: RelayCraft forwards the request to the server.
3.  **Response Phase**: The server sends a response.
    *   *Intervention*: You can modify the status code, body, or headers *before* it reaches the client.
    *   *Rules*: Map Local, Rewrite Response.
4.  **Client Phase**: The client receives the (potentially modified) response.

## Rules vs. Scripts

RelayCraft offers two ways to manipulate traffic:

### 1. Visual Rules
The **Rules Engine** is a no-code interface for common tasks.
-   **Best for**: Redirecting URLs, mocking API responses, modifying headers, and throttling speed.
-   **Example**: "Map `api.example.com/v1/user` to a local JSON file."

### 2. Python Scripts
For advanced scenarios, RelayCraft exposes the full power of **Python** and **mitmproxy**.
-   **Best for**: Complex logic, dynamic modification based on content, saving custom logs, or chaos engineering.
-   **Example**: "If the response body contains 'error', automatically retry the request 3 times."

## AI-Native Workflow

Unlike traditional proxies, RelayCraft is built with AI at its core.
-   **Natural Language Rules**: Instead of manually configuring regex, you can tell the AI: *"Block all tracking pixels."*
-   **Traffic Analysis**: Ask the AI to *"Explain why this request failed"* or *"Generate a TypeScript interface for this JSON response."*
-   **Script Generation**: The AI can write complex Python interceptor scripts for you.

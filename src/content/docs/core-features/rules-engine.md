---
title: Rules Engine
description: Manipulate network traffic with powerful visual rules.
---

RelayCraft's Rules Engine allows you to intercept, modify, and redirect network traffic without writing code. You can create rules to mock APIs, test edge cases, or debug complex scenarios.

## Rule Structure

Each rule consists of two main parts:
1.  **Matching Criteria**: Determines which requests trigger the rule.
2.  **Action**: Defines what happens when a request matches.

### Matching Criteria

-   **Method**: HTTP Method (GET, POST, PUT, DELETE, etc.) or "Any".
-   **URL Pattern**:
    -   Simple string match (e.g., `api.example.com`).
    -   Wildcards (e.g., `*.example.com/*`).
    -   Regular Expressions (e.g., `^https:\/\/api\..+\/v1\/`).

## Rule Types

RelayCraft provides six types of rules to handle network traffic:

### 1. Content Rewrite

Modify the content of the Request Body or Response Body.

-   **Target**: Choose to modify the **Request** (before sending) or **Response** (before returning to client).
-   **Modification Methods**:
    -   **Set Content**: Directly enter new content to completely replace the original Body.
    -   **Text Replace**: Simple string search and replace.
    -   **Regex Replace**: Advanced content replacement using regular expressions.
    -   **JSON Modification**: Targeted updates to JSON fields (e.g., set `data.vip` to `true`).

**Use Case**: Modifying API response data to test different UI states, or injecting parameters into a request.

### 2. Header Rewrite

Modify Request Headers or Response Headers.

-   **Actions**:
    -   **Add/Update**: Add a new header or update an existing header value (e.g., `Authorization`).
    -   **Delete**: Remove a specific header.

**Use Case**: Adding authentication tokens, modifying User-Agent, handling CORS headers.

### 3. Map Local

Redirect a request to a local file or custom content without sending it to the server.

-   **Source**:
    -   **File**: Select a file from your local disk (e.g., a JSON file).
    -   **Manual**: Enter the response body content directly in the editor.
-   **Status Code**: Custom HTTP status code (default: 200).
-   **Headers**: Custom response headers.

**Use Case**: Mocking backend API endpoints that haven't been implemented yet.

### 4. Map Remote

Redirect a request to a different URL.

-   **Target URL**: The new destination URL where the request will be forwarded (e.g., forward `prod.api.com` to `test.api.com`).

**Use Case**: Pointing production traffic to a staging server or development environment.

### 5. Weak Network

Simulate poor network conditions to test application robustness.

-   **Delay**: Add latency to requests or responses (in milliseconds).
-   **Bandwidth Limit**: Restrict upload or download speeds.
-   **Packet Loss**: Simulate a percentage of packet loss.

**Use Case**: Testing app performance under slow, high-latency, or unstable network conditions.

### 6. Request Blocking

Directly block a request from being sent to the server, or simulate a request failure.

-   **Behavior**:
    -   **Abort Connection**: Directly close the TCP connection to simulate a network error.
    -   **Return Error Code**: Return a specific HTTP error code (e.g., `404 Not Found`, `500 Internal Server Error`).

**Use Case**: Testing application error handling logic when the server is down or the network is interrupted.

## Managing Rules

-   **Groups**: Organize rules into groups for better management.
-   **Priority**: Rules are evaluated from top to bottom. The first matching rule applies (unless configured otherwise).
-   **Toggle**: You can quickly enable/disable individual rules or entire groups.

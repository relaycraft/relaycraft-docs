---
title: Request Composer
description: Manually craft, test, and replay HTTP requests.
---

The **Request Composer** allows you to build and send custom HTTP requests directly from RelayCraft. It's perfect for testing APIs, debugging endpoints, or reproducing issues without needing an external tool like Postman.

## Creating a Request

You can start a new request from scratch or base it on an existing one.

### 1. From Scratch
Open the **Composer** tab. You'll see a clean interface to define your request:
-   **Method**: GET, POST, PUT, DELETE, PATCH, etc.
-   **URL**: The full destination URL.
-   **Headers**: Add custom headers (e.g., `Authorization`, `Content-Type`).
-   **Body**: Define the request payload.

### 2. From Traffic List
Right-click any request in the **Traffic Monitor** and select **Compose**. This copies all details (headers, body, cookies) into the Composer, allowing you to modify and resend it.

## Request Body Types

RelayCraft supports multiple body formats:

-   **None**: For GET/DELETE requests.
-   **JSON**: Write raw JSON with syntax highlighting and validation.
-   **Form Data**: Key-value pairs for `multipart/form-data` (supports file uploads).
-   **x-www-form-urlencoded**: Standard form encoding.
-   **Raw**: Plain text, XML, or other custom formats.

## cURL Import

Already have a cURL command?
1.  Click the **Import cURL** button.
2.  Paste your command.
3.  RelayCraft automatically parses it into the Composer fields.

## Response View

After sending a request, the response appears in the right-hand panel (or bottom panel, depending on layout):
-   **Status**: Status code and time taken.
-   **Headers**: Response headers.
-   **Body**: Formatted response body (JSON, HTML, Image, etc.).
-   **Download**: Save the response body to a file.

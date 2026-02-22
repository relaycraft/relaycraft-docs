---
title: AI Assistant
description: Supercharge your workflow with RelayCraft's built-in AI capabilities.
---

RelayCraft is an **AI-Native** traffic inspector. Unlike traditional tools, it integrates Large Language Models (LLMs) directly into the workflow to help you analyze traffic, generate rules, and write scripts using natural language.

## Configuration

To use AI features, you need to configure an AI Provider.

1.  Go to **Settings > AI Assistant**.
2.  **Enable AI Features**: Toggle the switch to ON.
3.  **Select Provider**: Choose from supported providers:
    -   OpenAI
    -   Anthropic (Claude)
    -   DeepSeek
    -   Google (Gemini)
    -   Aliyun Bailian (Qwen)
    -   Moonshot AI
    -   OpenRouter
    -   Custom (compatible with OpenAI format, e.g., LocalAI, Ollama)
4.  **API Key**: Enter your API Key.
5.  **Model**: Select or type the model name (e.g., `gpt-4o`, `claude-3-5-sonnet`, `deepseek-chat`).

:::tip[Privacy]
RelayCraft communicates directly with the AI provider you configure. Your traffic data is **only** sent to the AI when you explicitly ask it to analyze a request or generate a rule based on a request.
:::

## Core Capabilities

### 1. Natural Language Command Center

Press `Ctrl+K` (or `Cmd+K` on macOS) to open the Command Center. You can type natural language instructions instead of searching through menus.

**Examples:**
-   "Show me all requests that returned 404"
-   "Find all JSON responses larger than 10KB"
-   "Clear the traffic list"
-   "Start capturing"

### 2. Intelligent Traffic Analysis

When viewing a specific request in the **Traffic Monitor**, you can ask the AI to analyze it.

-   **Explain Errors**: "Why did this request fail?"
-   **Analyze Structure**: "What is the structure of this JSON response?"
-   **Security Check**: "Are there any sensitive tokens in these headers?"

### 3. Rule Generation

Create complex modification rules without learning regex or specific UI steps.

**In Command Center or Chat:**
-   "Map all requests from `example.com/api` to my local file `/Users/me/data.json`"
-   "Block all images from `adserver.com`"
-   "Delay requests to `api.slow.com` by 2 seconds"

The AI will generate the appropriate rule configuration for you to review and apply.

### 4. Script Generation

RelayCraft supports Python scripting for advanced interception. The AI Assistant can write these scripts for you.

**Example Prompts:**
-   "Write a script to add an `Authorization: Bearer <token>` header to all requests to `api.my-app.com`."
-   "Create a script that modifies the response body, replacing 'false' with 'true' for the `isAdmin` field."

The AI will generate the Python code using the RelayCraft API, which you can save and run immediately.

## Smart Suggestions

RelayCraft provides context-aware suggestions:

-   **Regex Assistant**: When editing filters or rules, the AI can explain regex patterns or generate them from descriptions (e.g., "Match any subdomain of google.com").
-   **Search Assistant**: In the traffic list search box, AI can help convert natural language into complex filter conditions (e.g., typing "POST requests taking longer than 500ms" automatically converts to `method=POST && duration > 500`).
-   **Naming Assistant**: Automatically suggests descriptive names for your saved rules and scripts based on their content.

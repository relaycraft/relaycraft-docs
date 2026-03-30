---
title: Configuration
description: Customize RelayCraft settings and preferences.
---

You can access the settings panel by clicking the **Settings (gear)** icon in the sidebar or bottom of the screen.

## General

-   **Language**: Switch the UI language (English / Simplified Chinese).
-   **Always on Top**: Keep the RelayCraft window above other applications.
-   **Confirm on Exit**: Show a confirmation dialog before closing the app.
-   **Auto Start Capture**: Start traffic capture automatically on app launch.

## Network & Proxy

-   **Proxy Port**: Local proxy listening port (Default: `9090`, range `1024-65535`).
-   **Ignore SSL Certificate Validation**: Useful for intranet/self-signed test environments.
-   **Upstream Proxy**: Configure a proxy RelayCraft uses for outbound internet access.
    -   **Proxy URL**: e.g., `http://127.0.0.1:7890`
    -   **Check Connection**: Test whether the upstream proxy is reachable.

## MCP Server

-   **Enable MCP Server**: Start/stop the built-in MCP endpoint.
-   **MCP Port**: Default `7090`.
-   **Bearer Token**: Used by MCP write tools (`create_rule`, `replay_request`, `delete_rule`, `toggle_rule`).
-   **Config Snippet**: One-click copy for client config (Claude Desktop, Cursor, etc.).

## Certificates

-   **Trust Status**: Shows whether your OS trusts the RelayCraft Root CA.
-   **Install & Trust / Remove**: Install or remove the root certificate from the system trust store.
-   **Regenerate Root CA**: Generate a new CA certificate and private key.
-   **Open Certificate Directory**: Quickly locate local certificate files.

## Appearance

-   **Theme**: Light, Dark, or System Default.
-   **Display Density**:
    -   *Compact*: More rows, less padding.
    -   *Comfortable*: Balanced (Default).
    -   *Relaxed*: More spacing.

## Plugins

-   **Market**: Browse and install plugins.
-   **Installed**: Manage your active plugins.
-   **Install from File**: Install plugin packages directly from local files.

## Advanced & About

-   **View System Logs**: Open the built-in log viewer for Proxy/System/Script/Plugin/Crash logs.
-   **Verbose Mode**: Enable detailed runtime logs for deeper troubleshooting (restart required after changes).
-   **Open Config/Data/Logs Folders**: Jump directly to RelayCraft runtime directories.
-   **Check for Updates**: Manually check the latest version and update when available.

---
title: Configuration
description: Customize RelayCraft settings and preferences.
---

You can access the settings panel by clicking the **Settings (gear)** icon in the sidebar or bottom of the screen.

## Network

### Proxy Settings
-   **Port**: The local port RelayCraft listens on (Default: `9090`).
-   **SSL Proxying**: Enable/Disable HTTPS interception.
-   **Upstream Proxy**: If you are behind a corporate proxy, configure it here.
    -   **URL**: e.g., `http://corp-proxy:8080`
    -   **Bypass Domains**: *(Not supported in current version)* Comma-separated list of domains to bypass the upstream proxy (e.g., `localhost, 127.0.0.1`).

### Certificate
-   **Root Certificate Status**: Shows if the RelayCraft CA is trusted by your OS.
-   **Install/Reinstall**: Helper buttons to install the certificate on your system or export it for mobile devices.
-   **Regenerate**: Create a new Root CA (Note: This invalidates all previously trusted certificates).

## Appearance

-   **Theme**: Light, Dark, or System Default.
-   **Display Density**:
    -   *Compact*: More rows, less padding.
    -   *Comfortable*: Balanced (Default).
    -   *Relaxed*: More spacing.
-   **Language**: English, Chinese (Simplified).

## General

-   **Start on Boot**: Launch RelayCraft automatically when your computer starts.
-   **Close Behavior**: Minimize to tray or quit the application when closing the window.
-   **Updates**: Manually check for updates. You will be prompted if a new version is available (Automatic checks are not supported).
-   **Always on Top**: Keep the RelayCraft window above other applications.

## Plugins

-   **Market**: Browse and install plugins.
-   **Installed**: Manage your active plugins.
-   **Install from File**: Install plugin packages directly from local files.

---
title: Getting Started
description: Installation, initial setup, and certificate configuration for RelayCraft.
---

Welcome to RelayCraft! This guide will help you get up and running with the next-generation, AI-native web traffic inspector.

## Installation

RelayCraft is available for macOS, Windows, and Linux.

1.  Visit our [Releases Page](https://github.com/relaycraft/relaycraft/releases) or [Official Website](https://relaycraft.dev) to download the latest version for your operating system.
2.  **macOS**: Open the `.dmg` file and drag RelayCraft to your Applications folder.
3.  **Windows**: Run the installer `.exe` and follow the prompts.
4.  **Linux**: Use the `.AppImage` or `.deb` package provided.

## Initial Setup

When you first launch RelayCraft, it will start a local proxy server (default port: `9090`).

### 1. Configure Proxy

To inspect traffic from your computer, you need to route your network traffic through RelayCraft. You can choose to configure the **System Proxy** or use a **Browser Extension** (Recommended).

-   **Browser Extension (Recommended)**: For granular control, use a browser extension like **SwitchyOmega**:
    -   Create a new profile (e.g., "RelayCraft").
    -   Protocol: `HTTP`
    -   Server: `127.0.0.1`
    -   Port: `9090` (or your configured port).
    -   Apply changes and switch to this profile when you want to inspect traffic.

-   **System Proxy**: If you need to capture traffic from all applications, manually configure your OS proxy settings:
    -   Protocol: `HTTP`
    -   Server: `127.0.0.1`
    -   Port: `9090`

### 2. Install Root Certificate

To inspect **HTTPS** traffic (which is encrypted), you must install and trust the RelayCraft Root Certificate.

:::caution[Important]
Without the root certificate, RelayCraft cannot decrypt HTTPS traffic, and you will only see encrypted TCP streams or simple HTTP requests.
:::

#### macOS / Windows

1.  Click the **Certificate** icon (Shield) in the sidebar or go to **Settings > Certificates**.
2.  Click **Install & Trust Certificate**.
3.  Follow the system prompts to add the certificate to your trust store.
    -   **macOS**: You may need to enter your system password. Ensure the certificate is set to **"Always Trust"** in Keychain Access if not done automatically.
    -   **Windows**: The installer should place it in the "Trusted Root Certification Authorities" store.

#### iOS / Android (Mobile Inspection)

To inspect traffic from a mobile device:

1.  **Connect to same Wi-Fi**: Ensure your computer and mobile device are on the same network.
2.  **Configure Proxy on Mobile**:
    -   Go to Wi-Fi settings on your phone.
    -   Select your current network and find **Proxy** settings.
    -   Select **Manual**.
    -   **Server/Host**: Enter your computer's local IP address (displayed in RelayCraft's "Proxy Setup Guide").
    -   **Port**: `9090` (default).
3.  **Download Certificate**:
    -   Open a browser on your mobile device (Safari for iOS, Chrome for Android).
    -   Visit **[http://relay.guide](http://relay.guide)**.
    -   Download the certificate.
4.  **Install & Trust**:

    **iOS**:
    1.  Go to **Settings > Profile Downloaded** and install the profile.
    2.  Go to **Settings > General > About > Certificate Trust Settings**.
    3.  Toggle the switch for **RelayCraft CA** to **ON** (Enable full trust).

    **Android**:
    1.  Go to **Settings > Security > Encryption & credentials > Install a certificate > CA certificate**.
    2.  Select the downloaded file and install it.
    3.  *Note: Android 11+ may have stricter rules. Some apps with SSL pinning may not be inspectable.*

## Next Steps

Now that you are set up, explore the core features:

-   [**Traffic Monitor**](/core-features/traffic-monitor/): Learn how to inspect and filter requests.
-   [**Rules Engine**](/core-features/rules-engine/): Modify traffic with Map Local, Rewrite, and more.
-   [**AI Assistant**](/core-features/ai-assistant/): Use natural language to analyze and manipulate traffic.

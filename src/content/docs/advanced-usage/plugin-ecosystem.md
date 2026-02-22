---
title: Plugin Ecosystem
description: Extend the RelayCraft UI with custom plugins.
---

RelayCraft features a powerful **Plugin Ecosystem** that allows you to extend the user interface and functionality beyond the core features. While Python scripts handle the traffic interception logic, UI plugins allow you to build custom dashboards, data visualizers, or integration tools.

## The Plugin Market

The easiest way to get started is via the **Plugin Market**.
1.  Go to **Settings** > **Plugins** > **Market**.
2.  Browse available plugins from the community.
3.  Click **Install** to add a plugin to your workspace.

## Plugin Capabilities

Plugins in RelayCraft are essentially **React components** that run within the application context. They can:
-   **Visualize Data**: Create custom charts or graphs from traffic data.
-   **Decode Formats**: Add viewers for proprietary data formats (e.g., Protobuf, gRPC).
-   **Integrate Tools**: Connect RelayCraft to your team's issue tracker or documentation system.

## Managing Plugins

In the **Settings** > **Plugins** panel, you can:
-   **Enable/Disable**: Toggle plugins on or off without uninstalling them.
-   **Configure**: Some plugins expose their own settings (e.g., API keys, display preferences).
-   **Uninstall**: Remove plugins you no longer need.

## Developing Plugins

:::note[Coming Soon]
The Plugin SDK documentation is currently being finalized. Stay tuned for guides on how to build and publish your own plugins!
:::

For now, the plugin registry URL only supports the official plugin market. In the future, enterprise users will be able to configure a private registry to distribute internal tools to their team, or distribute plugins via plugin archives.

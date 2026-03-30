---
title: Troubleshooting
description: Solutions to common issues with RelayCraft.
---

## Connection Issues

### "Your connection is not private" / SSL Errors
This is the most common issue and usually means the RelayCraft **Root CA** is not properly installed or trusted.

**Solution:**
1.  Open **Certificates** from the sidebar, or go to **Settings > Certificates**.
2.  Click **Install & Trust Certificate**.
3.  Follow the system prompts to add the certificate to your **System Keychain** (macOS) or **Trusted Root Certification Authorities** (Windows).
4.  **Important**: On iOS/Android, you must also enable "Full Trust" for the installed certificate in your device settings.

### Port 9090 is in use
If RelayCraft fails to start the proxy, another application might be using port 9090.

**Solution:**
1.  Go to **Settings** > **Network**.
2.  Change the **Proxy Port** to something else (e.g., `8888` or `8080`).
3.  Restart RelayCraft.

### No Traffic Appearing
If the Traffic Monitor is empty:
1.  Check if your system or browser is configured to use the proxy (RelayCraft **does not set the system proxy automatically**, manual configuration is required).
2.  Ensure **Capture** is enabled (the Play/Pause button in the toolbar).
3.  Verify that you are not filtering out all traffic (clear the filter bar).

## Performance

### High Memory Usage
If RelayCraft is consuming too much memory:
1.  **Clear Session**: Click the trash icon to clear the current traffic list.
2.  **Disable Heavy Plugins**: Some visualization plugins might be resource-intensive.
3.  **Check Scripts**: Poorly written Python scripts (e.g., infinite loops or storing massive data in memory) can cause leaks.

## Rules & Scripts

### Rules Not Working
-   Check **Priority**: Rules are executed top-to-bottom. A higher rule might be matching first and stopping execution.
-   Check **Scope**: Ensure the rule is enabled and the matching criteria (URL, Method) are correct.

### Python Script Errors
-   Check the **Script Logs** (via **Settings > Advanced > Troubleshooting > View System Logs**) for Python tracebacks.
-   Ensure you have valid Python syntax.
-   Remember to **Restart Proxy** after editing scripts.

## Built-in Logs (Advanced)

RelayCraft provides a powerful built-in log query feature to help advanced users diagnose issues.

**Access**:
1.  Go to **Settings** > **Advanced**.
2.  Click **View System Logs**.
3.  (Optional) Enable **Verbose Mode** to log more detailed underlying core traffic logs.

**Log Panel**:
-   **Proxy Logs**: Operational logs of the core proxy service.
-   **System Logs**: System-level logs of the application itself.
-   **Script Logs**: Output and error messages from Python scripts.
-   **Plugin Logs**: Operational logs of installed plugins.
-   **Crash Logs**: Stack traces when the application crashes.

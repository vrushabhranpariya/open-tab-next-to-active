# Open Tab Next to Active 🧭

**Open Tab Next to Active** is a small browser extension that keeps your tabs organized by opening new tabs next to the currently active tab instead of at the far end of the tab strip.

---

## 🚀 Quick summary

- **What it does:** When you open a new tab (Ctrl+T), follow a link that opens a tab, or open a bookmark in a new tab, the new tab will be placed immediately to the right of the current tab.
- **Why it helps:** Keeps related tabs grouped and reduces the need to hunt for newly opened tabs across the tab bar.

---

## ✅ Features

- Opens new tabs immediately next to the active tab
- Works for keyboard-created tabs (Ctrl+T) and programmatic tab opens
- Avoids moving tabs during browser startup (no surprising tab moves on launch)
- Small, privacy-conscious extension with no external servers

---

## 🔧 How to use

1. Install the extension (Chrome/Chromium-based browsers).
2. Use your browser normally — press **Ctrl+T**, open links that create new tabs, or open bookmarks in new tabs. The extension will place the new tab next to the active one automatically.

**If Ctrl+T doesn't trigger the extension:** you may need to assign the keyboard shortcut to this extension. Open `chrome://extensions/shortcuts` (or go to Menu ▸ More tools ▸ Extensions ▸ Keyboard shortcuts) and set the **Open Tab Next to Active** action to **Ctrl+T** (or another available shortcut). Note that Chrome may reserve certain global shortcuts; if Ctrl+T is unavailable, choose a different shortcut.

> No additional configuration required (unless you need to assign the keyboard shortcut).

---

## ⚙️ Permissions

The extension requests the following permissions (see `manifest.json`):

- `tabs` — to create/move tabs next to the active tab
- `bookmarks` — to handle tab creation from bookmarks
- `storage` — to store a small local flag used to detect browser startup
- `commands` — to respond to keyboard shortcuts (e.g., Ctrl+T)

No other permissions are requested.

---

*Thank you for using Open Tab Next to Active — neat tabs, less hunting!*
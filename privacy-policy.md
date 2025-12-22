
## 🔒 Privacy Policy (for publishing)

**Effective date:** Replace with your publication date.

**Summary:** This extension does not collect, store, or transmit any personally identifiable information, telemetry, browsing history, or browsing data to external servers.

**Details:**

- Data collection: None. The extension does not send any data to third parties or remote servers.
- Local storage: The extension uses `chrome.storage.local` to save a single boolean flag (e.g., `isBrowserLaunch`) that helps it avoid repositioning tabs during browser startup. This data is stored locally on the user's device only and is not shared.
- Tab usage: The `tabs` API is used to create and move tabs, but URLs or tab contents are not recorded, stored, or transmitted by the extension.
- Error reporting: Errors are logged to the browser console only (no external error reporting services are used).
- Third-party services: This extension does not use third-party analytics, advertising, or tracking services.
- Data removal: Uninstalling the extension removes its stored local settings.

If you need a public-facing privacy policy URL for the store, create a hosted page containing the text above and link to it from the store listing.

---

## 📦 Publishing checklist

- Confirm `manifest.json` lists only required permissions
- Add a privacy policy link (public URL) on the store listing that mirrors the Privacy Policy above
- Provide a suitable extension icon and screenshots
- Use a clear and concise extension description in the store

---

## ❓ FAQ

Q: Will this move my tabs that were opened during startup?

A: No — the extension detects browser startup and will not reposition tabs created by the browser during launch to avoid unexpected tab moves.

Q: Does this extension share my tab URLs or history?

A: No. The extension uses the `tabs` API only to move/create tabs; it does not collect or transmit URLs or history.

---

## 📄 License

Licensed under the MIT License.

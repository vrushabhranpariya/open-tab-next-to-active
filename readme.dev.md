# Open Tab Next to Active - Chrome Extension

A Chrome extension that opens new tabs next to the currently active tab instead of at the end of the tab bar, improving workflow and tab organization.

## Features

✅ **Ctrl+Click on links** - Opens link in new tab next to current tab
✅ **Middle-click on links** - Opens link in new tab next to current tab
✅ **Middle-click on bookmarks** - Opens bookmark next to current tab
✅ **Ctrl+T keyboard shortcut** - Creates new tab next to current tab
✅ **Smart browser launch detection** - Doesn't interfere with initial tabs on browser startup

## Installation

### Step 1: Create Extension Files

Create a new folder (e.g., `open-tab-next`) and add these files:

1. **manifest.json** - Extension configuration
2. **background.js** - Background service worker
3. **content.js** - Content script for link handling

### Step 2: Create Icons (Optional)

Create simple icon files or download placeholder icons:
- `icon16.png` (16×16 pixels)
- `icon48.png` (48×48 pixels)
- `icon128.png` (128×128 pixels)

Or create a simple icon using this HTML in your browser:
```html
<canvas id="c" width="128" height="128"></canvas>
<script>
const c = document.getElementById('c');
const ctx = c.getContext('2d');
ctx.fillStyle = '#4285f4';
ctx.fillRect(0, 0, 128, 128);
ctx.fillStyle = '#fff';
ctx.font = 'bold 80px Arial';
ctx.textAlign = 'center';
ctx.fillText('→', 64, 90);
</script>
```
Right-click the canvas, save as PNG, and resize for different sizes.

### Step 3: Load Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right corner)
3. Click **Load unpacked**
4. Select your extension folder
5. The extension should now be active!

## How It Works

### Link Handling
- **Ctrl+Click**: Intercepts the click and opens the link in a new tab positioned right after the current tab
- **Middle-Click**: Same behavior as Ctrl+Click, but with the middle mouse button
- Both work on any clickable link in web pages

### Keyboard Shortcut
- **Ctrl+T**: Instead of opening a new tab at the end, it opens right next to your current tab
- This can be customized in `chrome://extensions/shortcuts`

### Bookmarks
- Middle-clicking bookmarks automatically positions them next to the active tab
- This leverages Chrome's native bookmark handling with the extension's positioning logic

### Browser Launch Protection
- The extension detects when Chrome first launches and waits 2 seconds before activating
- This prevents interference with restored session tabs or startup pages

## Technical Details

### Architecture
- **Manifest V3** - Uses the latest Chrome extension architecture
- **Service Worker** - Efficient background script that doesn't constantly run
- **Content Script** - Lightweight DOM event listeners with capture phase interception
- **Storage API** - Tracks browser launch state across restarts

### Performance Optimizations
- Event listeners use capture phase for early interception
- Limited DOM traversal depth (max 5 levels) when finding link elements
- Debounced tab handling to prevent race conditions
- Minimal permissions for better security

### Security
- Only allows http, https, and file protocols
- Blocks javascript:, data:, about:, and chrome: URLs
- Content script runs on document_start but with minimal overhead
- No external dependencies or CDN requests

## Customization

### Change Keyboard Shortcut
1. Go to `chrome://extensions/shortcuts`
2. Find "Open Tab Next to Active"
3. Click the pencil icon to customize the shortcut

### Modify Browser Launch Delay
In `background.js`, change the timeout value (default is 2000ms):
```javascript
setTimeout(() => {
  chrome.storage.local.set({ isBrowserLaunch: false });
}, 2000); // Change this value
```

## Troubleshooting

**Extension not working:**
- Check if Developer mode is enabled
- Look for errors in `chrome://extensions/` under your extension
- Check the console in background service worker (click "service worker" link)

**Tabs still opening at the end:**
- Make sure the extension is enabled
- Check if you're within the 2-second browser launch window
- Verify the extension has necessary permissions

**Links not intercepting:**
- Some sites use JavaScript-based navigation that may not trigger standard click events
- Try refreshing the page after enabling the extension
- Check browser console for any errors

## Browser Compatibility

- **Chrome**: Fully supported (Manifest V3)
- **Edge**: Should work (Chromium-based)
- **Brave**: Should work (Chromium-based)
- **Opera**: May work with minor adjustments

## License

Free to use and modify for personal or commercial purposes.

## Contributing

Found a bug or have a feature request? The code is designed to be easily extensible:
- Add more keyboard shortcuts in `manifest.json` commands section
- Modify positioning logic in `background.js` handleOpenTabNext function
- Add more click event handlers in `content.js`

---

**Made with ❤️ for better tab management**
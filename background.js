// Track if this is the first run after browser launch
let isBrowserLaunch = true;
let isHandlingNewTab = false;

// Initialize on installation
chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.local.set({ isBrowserLaunch: true });
});

// Reset browser launch flag after a short delay
chrome.runtime.onStartup.addListener(() => {
	chrome.storage.local.set({ isBrowserLaunch: true });

	// Clear the flag after 2 seconds (enough time for initial tabs to load)
	setTimeout(() => {
		chrome.storage.local.set({ isBrowserLaunch: false });
	}, 2000);
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'openTabNext') {
		handleOpenTabNext(message.url, sender.tab);
		sendResponse({ success: true });
	}
	return true;
});

// Handle Ctrl+T keyboard shortcut
chrome.commands.onCommand.addListener(async (command) => {
	if (command === 'new-tab' || command === 'new-tab-from-omnibox') {
		await handleNewTab();
	}
});

// Monitor tab creation to intercept and reposition
chrome.tabs.onCreated.addListener(async (tab) => {
	// Skip if we're already handling this tab or if it's browser launch
	if (isHandlingNewTab) return;

	const { isBrowserLaunch: isLaunch } = await chrome.storage.local.get('isBrowserLaunch');
	if (isLaunch) return;

	// Skip if tab already has an opener (already positioned correctly)
	if (tab.openerTabId !== undefined) return;

	// Get active tab to position next to it
	const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });

	if (activeTab && tab.id !== activeTab.id) {
		// Move the new tab next to the active tab
		await chrome.tabs.move(tab.id, { index: activeTab.index + 1 });
	}
});

// Handle bookmark clicks
chrome.bookmarks.onCreated.addListener(async (id, bookmark) => {
	// This is a basic implementation; actual bookmark click detection
	// is handled by browser behavior, we just ensure positioning
});

/**
 * Opens a new tab next to the active tab
 * @param {string} url - URL to open (optional)
 * @param {chrome.tabs.Tab} currentTab - Current tab object
 */
async function handleOpenTabNext(url, currentTab) {
	if (!currentTab) return;

	isHandlingNewTab = true;

	try {
		const { isBrowserLaunch: isLaunch } = await chrome.storage.local.get('isBrowserLaunch');

		// Skip if browser is just launching
		if (isLaunch) {
			isHandlingNewTab = false;
			return;
		}

		// Create new tab next to the current one
		await chrome.tabs.create({
			url: url,
			index: currentTab.index + 1,
			openerTabId: currentTab.id,
			active: false
		});
	} catch (error) {
		console.error('Error opening tab:', error);
	} finally {
		// Reset flag after a short delay
		setTimeout(() => {
			isHandlingNewTab = false;
		}, 100);
	}
}

/**
 * Handles Ctrl+T new tab creation
 */
async function handleNewTab() {
	const { isBrowserLaunch: isLaunch } = await chrome.storage.local.get('isBrowserLaunch');

	if (isLaunch) return;

	isHandlingNewTab = true;

	try {
		const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });

		if (activeTab) {
			await chrome.tabs.create({
				index: activeTab.index + 1,
				openerTabId: activeTab.id
			});
		}
	} catch (error) {
		console.error('Error creating new tab:', error);
	} finally {
		setTimeout(() => {
			isHandlingNewTab = false;
		}, 100);
	}
}

// Clear browser launch flag when a tab is activated
chrome.tabs.onActivated.addListener(async () => {
	const { isBrowserLaunch: isLaunch } = await chrome.storage.local.get('isBrowserLaunch');

	if (isLaunch) {
		// After any tab interaction, we can safely assume browser has launched
		setTimeout(() => {
			chrome.storage.local.set({ isBrowserLaunch: false });
		}, 1000);
	}
});
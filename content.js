/**
 * Content script to intercept link clicks and handle Ctrl+Click and Middle-Click
 */

// Capture clicks in the capture phase to intercept before default behavior
document.addEventListener('click', handleLinkClick, true);
document.addEventListener('auxclick', handleAuxClick, true);

/**
 * Handles regular clicks (for Ctrl+Click)
 * @param {MouseEvent} event - Click event
 */
function handleLinkClick(event) {
	// Only handle Ctrl+Click (or Cmd+Click on Mac)
	if (!event.ctrlKey && !event.metaKey) return;

	const link = findLinkElement(event.target);
	if (!link) return;

	const url = getLinkUrl(link);
	if (!url || !isValidUrl(url)) return;

	// Prevent default behavior
	event.preventDefault();
	event.stopPropagation();

	// Send message to background script to open tab
	chrome.runtime.sendMessage({
		action: 'openTabNext',
		url: url
	});
}

/**
 * Handles auxiliary clicks (middle-click = button 1)
 * @param {MouseEvent} event - Auxiliary click event
 */
function handleAuxClick(event) {
	// Only handle middle-click (button 1)
	if (event.button !== 1) return;

	const link = findLinkElement(event.target);
	if (!link) return;

	const url = getLinkUrl(link);
	if (!url || !isValidUrl(url)) return;

	// Prevent default middle-click behavior
	event.preventDefault();
	event.stopPropagation();

	// Send message to background script to open tab
	chrome.runtime.sendMessage({
		action: 'openTabNext',
		url: url
	});
}

/**
 * Finds the closest anchor element from the clicked target
 * @param {HTMLElement} element - Clicked element
 * @returns {HTMLAnchorElement|null} - Anchor element or null
 */
function findLinkElement(element) {
	// Traverse up the DOM tree to find an anchor tag
	let current = element;
	let depth = 0;
	const maxDepth = 5; // Limit traversal depth for performance

	while (current && depth < maxDepth) {
		if (current.tagName === 'A' && current.href) {
			return current;
		}
		current = current.parentElement;
		depth++;
	}

	return null;
}

/**
 * Extracts the URL from a link element
 * @param {HTMLAnchorElement} link - Link element
 * @returns {string} - URL string
 */
function getLinkUrl(link) {
	// Use href property which gives the absolute URL
	return link.href;
}

/**
 * Validates if a URL is openable in a new tab
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid
 */
function isValidUrl(url) {
	if (!url) return false;

	try {
		const urlObj = new URL(url);
		const protocol = urlObj.protocol;

		// Allow http, https, and file protocols
		// Block javascript:, data:, about:, chrome:, etc.
		const allowedProtocols = ['http:', 'https:', 'file:'];

		return allowedProtocols.includes(protocol);
	} catch (error) {
		return false;
	}
}

/**
 * Handle keyboard shortcuts
 */
document.addEventListener('keydown', (event) => {
	// Ctrl+T (or Cmd+T on Mac)
	if ((event.ctrlKey || event.metaKey) && event.key === 't') {
		// Let the background script handle this through chrome.commands
		// This listener is just for additional context if needed
	}
}, true);
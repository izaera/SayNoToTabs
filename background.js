const MAX_TABS = 1;

async function detachTabIfNeeded(tab) {
	const siblings = await browser.tabs.query({
		windowId: tab.windowId
	});

	if (siblings.length > MAX_TABS) { 
		const browserWindow = await browser.windows.get(tab.windowId);

		console.log(`>>> Moving tab ${tab.id} '${tab.url}' to a new window`);

		await browser.windows.create({
			incognito: browserWindow.incognito,
			tabId: tab.id
		});
	}
}

browser.tabs.onCreated.addListener(detachTabIfNeeded);

browser.tabs.onAttached.addListener(async (tabId, _attachInfo) => 
	detachTabIfNeeded(await browser.tabs.get(tabId))
);


const MAGIC_URL_POSTFIX = '&list=ULcxqQ59vzyTk'

chrome.browserAction.onClicked.addListener((tab)=>{
	//chrome.tabs.executeScript(null, {file: "testScript.js"})
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, (tabs)=>{
		let currentTab = tabs[0]
		let oldURL = currentTab.url
		console.log('url=', oldURL)


		let newUrl = oldURL + MAGIC_URL_POSTFIX
		chrome.tabs.update(currentTab.id, {url: newUrl})
	})
})

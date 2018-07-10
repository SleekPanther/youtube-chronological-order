
const MAGIC_URL_POSTFIX = '&list=ULcxqQ59vzyTk'

chrome.browserAction.onClicked.addListener(tab=>{
	appendToUrl()	
})

function appendToUrl(){
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, tabs=>{
		let currentTab = tabs[0]
		let oldURL = currentTab.url
		console.log('old url=', oldURL)


		let newUrl = oldURL + MAGIC_URL_POSTFIX
		chrome.tabs.update(currentTab.id, {url: newUrl})
	})
}

//Keyboard Shortcut
chrome.commands.onCommand.addListener(command => {
	if(command === 'appendToUrl'){
		appendToUrl()
	}
})
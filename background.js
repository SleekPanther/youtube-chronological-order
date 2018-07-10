
const MAGIC_URL_POSTFIX = '&list=ULcxqQ59vzyTk'
const YOUTUBE_VIDEO_URL_START = 'https://www.youtube.com/watch?v='
const regexMatchVideoId = /youtube.com\/watch\?v=([^&\?]*)/		//regular expression matches youtube.com/watch?v=[VIDEO_ID]	& captures the video ID since the ID is either the end of the string or ends at a question mark or ampersand

//Browser action instead of popup
chrome.browserAction.onClicked.addListener(tab=>{
	appendToUrl()
})

function appendToUrl(){
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, tabs=>{
		let currentTab = tabs[0]
		let oldURL = currentTab.url
		let videoId = oldURL.match(regexMatchVideoId)[1]	//get video id
		let newUrl = YOUTUBE_VIDEO_URL_START + videoId + MAGIC_URL_POSTFIX
		chrome.tabs.update(currentTab.id, {url: newUrl})
	})
}

//Keyboard Shortcut
chrome.commands.onCommand.addListener(command => {
	if(command === 'appendToUrl'){
		appendToUrl()
	}
})
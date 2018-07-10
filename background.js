//Only make extension icon visible on YouTube.com
const youtubeBaseUrl = 'youtube.com'	//lowercase matters
chrome.runtime.onInstalled.addListener(function() {
	// Replace all rules ...
	chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
		// With a new rule ...
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [
				new chrome.declarativeContent.PageStateMatcher({
					pageUrl: { hostContains: youtubeBaseUrl },
				})
			],
			// And shows the extension's page action
			actions: [ new chrome.declarativeContent.ShowPageAction() ]
		}])
	})
})


const MAGIC_URL_POSTFIX = '&list=ULcxqQ59vzyTk'		//thing to append to make it play chronlogically
const YOUTUBE_VIDEO_URL_START = 'https://www.youtube.com/watch?v='	//a youtube url without the videoID
const regexMatchVideoId = /youtube.com\/watch\?v=([^&\?]*)/		//regular expression matches youtube.com/watch?v=[VIDEO_ID]	& captures the video ID since the ID is either the end of the string or ends at a question mark or ampersand

//Browser action instead of popup
chrome.pageAction.onClicked.addListener(tab=>{
	appendToUrl()
})

function appendToUrl(){
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, tabs=>{
		let currentTab = tabs[0]
		let oldURL = currentTab.url
		let regexMatch = oldURL.match(regexMatchVideoId)
		if(!regexMatch){	//not a valid youtube video URL (prevents keyboard shotcut override)
			return
		}
		let videoId = regexMatch[1]	//get video id
		let newUrl = YOUTUBE_VIDEO_URL_START + videoId + MAGIC_URL_POSTFIX
		chrome.tabs.update(currentTab.id, {url: newUrl})	//update tab/reloads page with new location
	})
}

//Keyboard Shortcut
chrome.commands.onCommand.addListener(command => {
	if(command === 'appendToUrl'){
		appendToUrl()
	}
})
function et_escape(param)
{
	return encodeURIComponent(param);
}

function et_unescape(param)
{
	return decodeURIComponent(param);
}

et_addEvent(
    document,
    'click',
    function (event) {
        var target = event.target;
        if (target && target.classList && target.classList.contains('et-apple-wallet-link')) {
            var secureCode = _etracker.getConfigValue('secureCode');
            if (!secureCode) return;
            var coid = _etracker.getCoid();
            if (!coid) return;
            var downloadPassOrigin = window.et_downloadPassOrigin || 'https://api.signalize.com';
            var url = downloadPassOrigin + '/v1/download-pass?et=' + secureCode + '&coid=' + coid;
            location.assign(url);
        }
    }
);
        var arrOfLinksToPrepare = [];
var et_protocol = window._etracker.getConfigValue('protocol') || '//';

if(typeof(et_proxy_redirect) == 'undefined' || typeof(et_proxy_redirect) == 'unknown' || et_proxy_redirect == '')
{
	var et_server = et_protocol + 'www.etracker.de';
	var et_code_server = et_protocol + 'code.etracker.com';
}
else
{
	var et_server = et_proxy_redirect;
	var et_code_server = et_proxy_redirect;
}

var et_ver = '5.0';
var et_panelLink = et_server + '/app?et=';
var et_secureId = 'pTm6U3';

var et_maxUrlLength = (function () {
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
	return isIE ? 2000 : 8190;
})();

var et_deliveryHash = "d2mY4OeyjzbTCplVXLIeNOfrv1N0WZ3M";

var cc_autoPageNameRegistration = 'title';
var cc_getParamsWhiteList = [];
ET_Event = new etEvent("pTm6U3", et_server);
var cc_cntScript    = 'cntcc';
var cc_genericEventPath = '/api/v6/tracking/webEvents';
var cc_optInPath 	= '/api/v6/tracking/optIn';
var cc_cntCookie	= '/cntcookie.php';
var cc_deltaTime 	= 15913766047849-(new Date().getTime()*10);
var cc_codecVersion	= 1;
var cc_apiVersion	= '1.1.2';
var cc_articleDivider = '|';
var cc_itemDivider	= ';';

(function () {'use strict';window.et_ScrollDepthUtils={getPageName:function(){return et_getPageName();},isInIframe:function(){try{return window.self!==window.top;}catch(e){return true;}}};
'use strict';function ScrollPositionsContainer(timestamp){var _this=this;_this.buckets=_createNewBuckets();_this.tm=timestamp;_this.bucketChangeEvent=undefined;_this.lastBuckets=[];ScrollPositionsContainer.prototype.getPositions=function(){return _this.buckets;};ScrollPositionsContainer.prototype.reset=function(){_this.buckets=_createNewBuckets();};ScrollPositionsContainer.prototype.addStayTime=function(positionFrom,positionTo,timeMs){if(positionFrom < 0||positionTo < 0){return;}_this.tm=new Date().getTime();positionFrom=Math.floor(positionFrom);positionTo=Math.floor(positionTo);if(positionFrom > positionTo){var originalTo=positionTo;positionTo=positionFrom;positionFrom=originalTo;}var currentBuckets=[];for(var key in _this.buckets){if(positionFrom <=_this.buckets[key].to&&positionTo >=_this.buckets[key].from){_this.buckets[key].stayTime+=timeMs;currentBuckets.push(key);}}if(_bucketsChanged(currentBuckets,_this.lastBuckets)&&typeof _this.bucketChangeEvent==='function'){_this.bucketChangeEvent();}_this.lastBuckets=currentBuckets;};function _bucketsChanged(arr1,arr2){if(arr1.length===0||arr2.length===0){return false;}if(arr1.length!==arr2.length){return true;}for(var i=0;i < arr1.length;i++){if(arr1[i]!==arr2[i]){return true;}}return false;}ScrollPositionsContainer.prototype.subscribeToBucketChange=function(callback){_this.bucketChangeEvent=callback;};function _createNewBuckets(){var buckets={0:{stayTime:0},10:{stayTime:0},25:{stayTime:0},50:{stayTime:0},75:{stayTime:0},101:{stayTime:0}};var previousKey=0;for(var key in buckets){key=parseInt(key);buckets[previousKey].to=key-1;buckets[key].from=key;buckets[key].to=1000000;previousKey=key;}return buckets;}}
'use strict';var et_ScrollDepthEvent=function(eventObject,pageName){if(!(this instanceof et_ScrollDepthEvent)){return new et_ScrollDepthEvent(eventObject,pageName);}this.name='scrollDepth';this.pagename=pageName;this.version=1;this.eventData={'object':eventObject};};et_ScrollDepthEvent.prototype=new et_GenericEvent();et_ScrollDepthEvent.prototype.constructor=et_ScrollDepthEvent;et_ScrollDepthEvent.prototype.getEvent=function(){var originalObject=et_GenericEvent.prototype.getEvent.call(this)[0];originalObject[this.name]['pagename']=this.pagename;return[originalObject];};function ScrollDepthTracker(currentTm){var _this=this;_this.REFRESH_TIME_MS=1000;_this.STORAGE_KEY='et_scroll_depth';_this.STORAGE_MAX_AGE_MS=1*60*60*1000;_this.THROTTLING_TIME=5000;_this.STORAGE=localStorage;_this.lastUpdateTm=currentTm;_this.lastFlushedTm=undefined;_this.siteHeight=1;_this.scrollPositions=new ScrollPositionsContainer(currentTm);_this.startTracking=startTracking;_this.getScrollPositions=getScrollPositions;_this.getPageName=getPageName;_this.save=save;_this.load=load;_this.reset=reset;_this.sendStoredBuckets=sendStoredBuckets;function startTracking(){_this.scrollPositions.subscribeToBucketChange(_onScrollingBucketChange);var body=document.body;var html=document.documentElement||document.body;_this.siteHeight=Math.max(body.scrollHeight,body.offsetHeight,html.clientHeight,html.scrollHeight,html.offsetHeight);_this.load();et_addEvent(window,'scroll',_updateScrollPositions);setInterval(_updateScrollPositions,_this.REFRESH_TIME_MS);setInterval(save,_this.REFRESH_TIME_MS);}function _onScrollingBucketChange(){var nowTm=new Date().getTime();if(!_this.lastFlushedTm||nowTm-_this.lastFlushedTm >=_this.THROTTLING_TIME){_sendScrollDepthEventEvent();_this.lastFlushedTm=nowTm;}}function sendStoredBuckets(){_deleteExpiredEntries();var storedJson=_readJsonFromStorage();for(var key in storedJson){var bucketsToSend=_createBucketsArrayToSend(storedJson[key].buckets);_sendScrollDepthEventEvent(key,bucketsToSend);}_this.STORAGE.removeItem(_this.STORAGE_KEY);}function _sendScrollDepthEventEvent(pageName,buckets){if(!_etracker.isTrackingEnabled()){return;}pageName=pageName||getPageName();if(!buckets){buckets=_createBucketsArrayToSend(_this.scrollPositions.buckets);}_etracker.sendEvent(et_ScrollDepthEvent(encodeURIComponent(JSON.stringify(buckets)),pageName));_this.reset();}function _createBucketsArrayToSend(bucketsObj){var buckets=[];for(var bucketKey in bucketsObj){buckets.push({from:bucketsObj[bucketKey].from,to:bucketsObj[bucketKey].to,stayTime:bucketsObj[bucketKey].stayTime});}return buckets;}function reset(){_this.scrollPositions.reset();_this.save();}function _updateScrollPositions(){var currentPositions=_this.getScrollPositions();var newTm=new Date().getTime();var stayTime=newTm-_this.lastUpdateTm;_this.scrollPositions.addStayTime(currentPositions.from,currentPositions.to,stayTime);_this.lastUpdateTm=newTm;}function getPageName(){return window.et_ScrollDepthUtils.getPageName();}function save(){var pageName=_this.getPageName();if(pageName===undefined||!_this.scrollPositions||!_this.STORAGE){return;}_this.scrollPositions.tm=new Date().getTime();var storedJson=_readJsonFromStorage();storedJson[pageName]=_this.scrollPositions;_this.STORAGE.setItem(_this.STORAGE_KEY,JSON.stringify(storedJson));}function _deleteExpiredEntries(){var storedJson=_readJsonFromStorage();var now=new Date().getTime();for(var key in storedJson){if(now-storedJson[key].tm > _this.STORAGE_MAX_AGE_MS){delete storedJson[key];}}_this.STORAGE.setItem(_this.STORAGE_KEY,JSON.stringify(storedJson));}function load(){if(!_this.STORAGE){return;}_deleteExpiredEntries();var storedContent=_readJsonFromStorage();var pageName=_this.getPageName();if(storedContent[pageName]&&storedContent[pageName].buckets){var storedContentForPage=storedContent[pageName];if(storedContentForPage.buckets){for(var key in storedContentForPage.buckets){if(_this.scrollPositions.buckets[key]!==undefined){_this.scrollPositions.buckets[key].stayTime=storedContentForPage.buckets[key].stayTime;}}}}}function _readJsonFromStorage(){if(!_this.STORAGE){return{};}var storedContent=_this.STORAGE.getItem(_this.STORAGE_KEY);if(!storedContent){return{};}try{return JSON.parse(storedContent);}catch(e){return{};}}function getScrollPositions(){var scrollX=0,scrollY=0;if(typeof(window.pageYOffset)==='number'){scrollY=window.pageYOffset;scrollX=window.pageXOffset;}else if(document.body&&(document.body.scrollLeft||document.body.scrollTop)){scrollY=document.body.scrollTop;scrollX=document.body.scrollLeft;}else if(document.documentElement&&(document.documentElement.scrollLeft||document.documentElement.scrollTop)){scrollY=document.documentElement.scrollTop;scrollX=document.documentElement.scrollLeft;}return{from:scrollY/_this.siteHeight*100,to:(scrollY+_getViewportSize()['height'])/_this.siteHeight*100};}/***Gets the viewport size depending of browser capabilities *@returns{{width:*,height:*}}*/function _getViewportSize(){var viewPortWidth;var viewPortHeight;if(typeof window.innerWidth!=='undefined'){viewPortWidth=window.innerWidth;viewPortHeight=window.innerHeight;}else if(typeof document.documentElement!=='undefined'&&typeof document.documentElement.clientWidth!=='undefined'&&document.documentElement.clientWidth!==0){viewPortWidth=document.documentElement.clientWidth;viewPortHeight=document.documentElement.clientHeight;}else{viewPortWidth=document.getElementsByTagName('body')[0].clientWidth;viewPortHeight=document.getElementsByTagName('body')[0].clientHeight;}return{width:viewPortWidth,height:viewPortHeight};}}
'use strict';var SAMPLING_RATE=0.1;var shouldScrollDepthBeActive=false;_etracker.addEvent(function(){if(_etracker.isTrackingEnabled()){if(_isCookieSet()){shouldScrollDepthBeActive=_isCookieTrue();}else{shouldScrollDepthBeActive=Math.random()<=SAMPLING_RATE;_setCookie(shouldScrollDepthBeActive);}}if(shouldScrollDepthBeActive&&!window.et_ScrollDepthUtils.isInIframe()){var scrollDepth=new ScrollDepthTracker(new Date().getTime());scrollDepth.sendStoredBuckets();_etracker.addOnLoad(scrollDepth.startTracking);}});function _isCookieSet(){return !!document.cookie.match(/isSdEnabled=/);}function _isCookieTrue(){return !!document.cookie.match(/isSdEnabled=true/);}function _setCookie(isTrue){et_setCookieValue('isSdEnabled',isTrue,1,undefined,false);}
'use strict';(function(){if(window.et_ScrollDepthUtils.isInIframe()){var currentHeight=0;et_addEvent(window,'beforeunload',function(){_sendMessage('page-unloaded');});_etracker.addOnLoad(function(){currentHeight=_getPageHeight();var message={height:currentHeight};_sendMessage('page-loaded',message);});et_addEvent(window,'resize',function(){var newPageHeight=_getPageHeight();if(newPageHeight!==currentHeight){currentHeight=newPageHeight;var message={height:currentHeight};_sendMessage('height-changed',message);}});}function _sendMessage(type,payload){var message={type:type,payload:payload,url:window.location.href,pageName:window.et_ScrollDepthUtils.getPageName()};parent.postMessage(JSON.stringify(message),'*');}function _getPageHeight(){var body=document.body;var html=document.documentElement;return Math.max(body.scrollHeight,body.offsetHeight,html.clientHeight,html.scrollHeight,html.offsetHeight);}})();
})();function _etc_start()
{
	var c = "";

	if (typeof _etracker.setFirstPixelSent == 'function')
		_etracker.setFirstPixelSent();
	if (typeof _etracker.doWrapperCalls == 'function')
		_etracker.doWrapperCalls();

	var extra = {
		et_sbscr: '0'
	};

	if(typeof et_isSubscriber !== 'undefined' && et_isSubscriber) {
		et_isSubscriber["then"]( function(status) {
			extra['et_sbscr'] = status ? '1' : '0';
			et_cc('pTm6U3', extra); 
		})["catch"]( function(status) {
			et_cc('pTm6U3', extra);
		});
	} else {
		et_cc('pTm6U3'); 
	}
	
	etCommerce.etCommerceLoad('pTm6U3');
	etCommerce.doPreparedEvents();        et_setupPageExitBeacon('pTm6U3');
        prepareAnchors = new et_prepareAnchorsForEvents(arrOfLinksToPrepare);if(c != '') {var x = document.createElement('div');x.innerHTML = c;var et_bodyInterval = window.setInterval(function(){if(document.body) {window.clearInterval(et_bodyInterval);document.body.appendChild(x);}}, 1);}	}

	var et_OptInType = 0;
	var _etc = function() {
		if(et_checkOptInCookie()) {
			_etc_start();
		}
	};

_etracker.setReady();
!function(e,n){if("object"==typeof exports&&"object"==typeof module)module.exports=n();else if("function"==typeof define&&define.amd)define([],n);else{var t=n();for(var o in t)("object"==typeof exports?exports:e)[o]=t[o]}}(this,(function(){return e={913:function(){function e(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function n(n){for(var o=1;o<arguments.length;o++){var r=null!=arguments[o]?arguments[o]:{};o%2?e(Object(r),!0).forEach((function(e){t(n,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(r)):e(Object(r)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(r,e))}))}return n}function t(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var o="panelbear",r="".concat(o,"_enable"),a="".concat(o,"_disable"),i="".concat(o,"_debug"),d={analyticsHost:"https://api.panelbear.com",honorDNT:!1,debug:!1,autoTrack:!0,spaMode:"history",enabled:!0},c=(e,n,t)=>{var o=d.debug||L(i);if(t||o){var r="[Panelbear] ".concat(e);n?console.log(r,n):console.log(r)}},s="Pageview",l=()=>u(s),p=e=>{T((()=>{var t=(e=>{var t=e;if(d.beforeSend){var o;try{o=d.beforeSend(n({},e))}catch(e){console.error(e)}if(!o)return void c("Function beforeSend returned 'undefined', skipping event trigger");for(var r of(o.pid=e.pid,o.event=e.event,Object.keys(e)))t[r]=o[r]}return{p:t.pid,e:t.event,ur:t.url,sw:t.screen_width,re:t.referrer,so:t.utm_source,ca:t.utm_campaign,me:t.utm_medium,ul:t.user_language,tz:t.timezone,cs:t.connection_speed,dns:t.dns,conn:t.connect,ssl:t.ssl,ttfb:t.ttfb,dl:t.download,dcl:t.dom_content_loaded,rd:t.render,pl:t.page_load,ts:t.transfer_size,ua:t.override_user_agent,ip:t.override_ip,co:t.override_country_code}})(n({pid:d.site,event:e,url:m(),screen_width:window.screen&&window.screen.width,referrer:E(),utm_source:b(),utm_campaign:h(),utm_medium:_(),user_language:y(),timezone:S(),connection_speed:P()},O(e)));t&&f(t)&&v(t)}),"collect")},u=e=>{var n=()=>p(e);"complete"===document.readyState?setTimeout(n,0):(c("Document not ready, adding event listener"),window.addEventListener("load",(()=>{setTimeout(n,0)})))},w=()=>{var e=history.pushState;e&&!window.panelbear._historyPatched&&(c("Single page app mode is set to 'history', patching History API"),history.pushState=function(n){return"function"==typeof history.onpushstate&&history.onpushstate({state:n}),e.apply(history,arguments)},window.onpopstate=history.onpushstate=l,window.panelbear._historyPatched=!0)},v=e=>{var n="".concat(d.analyticsHost,"/api/_/events"),t=JSON.stringify(e);navigator.sendBeacon&&navigator.sendBeacon(n,t)||fetch(n,{body:t,method:"POST",credentials:"omit",keepalive:!0}),c("Sent event",e)},f=e=>{if(!d.site)return c("Bad configuration: missing site ID",void 0,!0),!1;if(e.e&&/^[a-zA-Z][a-zA-Z0-9\_\-\.]{0,63}$/.test(e.e)){if(window.localStorage&&window.localStorage.getItem(a)||!d.enabled)return c("Skipping event collection, Panelbear has been manually disabled on this browser.",void 0,!0),!1;var n="Skipping event collection, website is running locally. More info on https://panelbear.com/docs/local-development/?ref=console";if(!d.debug){if(d.honorDNT&&"doNotTrack"in window.navigator&&"1"===window.navigator.doNotTrack)return c("Honoring 'Do Not Track'"),!1;if(/^localhost$|^127(?:\.[0-9]+){0,2}\.[0-9]+$|^(?:0*\:)*?:?0*1$/.test(window.location.hostname))return c(n,void 0,!0),!1;if("file:"===window.location.protocol)return c(n,void 0,!0),!1;if("prerender"===window.document.visibilityState)return c("Skipping event collection, document is prerendering"),!1;if(window.navigator.webdriver)return c("Skipping event collection, navigation is automated"),!1}if(e.e===s){var t=window.panelbear._previousPath,o=e.ur;if(window.panelbear._previousPath=o,t&&t==o)return void c("Skipping duplicate pageview from being sent")}return!0}c("Invalid event name.",void 0,!0)},m=()=>{var e=d.includeURLFragment?window.location.hash:"";return window.location.protocol+"//"+window.location.hostname+window.location.pathname+e},g=e=>{var n=window.location.search.match(e);return n?n[2]:void 0},b=()=>g(/[?&](ref|source|utm_source)=([^?&]+)/),h=()=>g(/[?&](utm_campaign)=([^?&]+)/),y=()=>{var e=window.navigator;return e?e.userLanguage||e.language:void 0},S=()=>{try{return Intl.DateTimeFormat().resolvedOptions().timeZone}catch(e){return}},_=()=>g(/[?&](utm_medium)=([^?&]+)/),P=()=>navigator.connection&&"effectiveType"in navigator.connection?navigator.connection.effectiveType:void 0,k=e=>{try{if(e){var n=Math.ceil(e);if(isNaN(n)||n<0)return;return n}return}catch(e){return}},O=e=>{var n={};if(e!==s||window.panelbear._firstPageLoadSent)return n;try{var t=window.performance||window.mozPerformance||window.msPerformance||window.webkitPerformance||{};if(t.getEntriesByType){var o=t.getEntriesByType("navigation")[0];o&&(n={dns:o.domainLookupEnd-o.domainLookupStart,connect:o.connectEnd-o.connectStart,ssl:o.secureConnectionStart?o.requestStart-o.secureConnectionStart:void 0,ttfb:o.responseStart-o.requestStart,download:o.responseEnd-o.responseStart,dom_content_loaded:o.domContentLoadedEventEnd-o.responseEnd,render:o.domComplete-o.domContentLoadedEventEnd,page_load:o.loadEventStart,transfer_size:o.transferSize?o.transferSize/1e3:void 0})}if(0===Object.keys(n).length){var r=t.timing;r&&(n={dns:r.domainLookupEnd-r.domainLookupStart,connect:r.connectEnd-r.connectStart,ssl:r.secureConnectionStart?r.requestStart-r.secureConnectionStart:void 0,ttfb:r.responseStart-r.requestStart,download:r.responseEnd-r.responseStart,dom_content_loaded:r.domContentLoadedEventEnd-r.responseEnd,render:r.domComplete-r.domContentLoadedEventEnd,page_load:r.loadEventStart-r.navigationStart})}}catch(e){c("Error while loading performance metrics",e)}for(var a of Object.keys(n))n[a]=k(n[a]);return window.panelbear._firstPageLoadSent=!0,n},E=()=>{var e=document.referrer;if(e){var n=new URL(e);if(n.hostname.toLowerCase()===window.location.hostname.toLowerCase())return;return n.protocol+"//"+n.hostname+n.pathname}},j=(e,t)=>{switch(e){case"config":if(!t)return c("Passed empty config params");o=t,r=n({},d),a=n(n({},d),o),c("Updated configuration",d=a),d.autoTrack&&(c("Autotrack enabled"),"history"===d.spaMode&&w(),!r.site&&a.site&&(c("Triggering initial pageview"),l()));break;case"trackPageview":u("Pageview");break;case"track":u(t);break;default:return void c("Unknown command",e,!0)}var o,r,a},T=(e,n)=>{try{e()}catch(e){(new Image).src="".concat(d.analyticsHost,"/api/_/errors?s=").concat(d.site,"&h=").concat(n,"&m=").concat(encodeURIComponent(e.message))}},L=e=>window&&window.location.search.indexOf(e)>-1;T((()=>{(()=>{var e=L(r),n=L(a);if(e||n){if(!window.localStorage)return void c("Can't disable Panelbear. This browser does not support local storage.",void 0,!0);e&&(window.localStorage.removeItem(a),c("Panelbear has been enabled for this browser and website combination.",void 0,!0)),n&&(window.localStorage.setItem(a,"true"),c("Panelbear has been disabled for this browser and website combination.",void 0,!0))}})();var e=window.panelbearQ||window.panelbear&&window.panelbear.q||[];window.panelbear=j,window.panelbear.q=e;for(var n=0;n<e.length;n++)window.panelbear.apply(this,e[n])}),"browserInit")}},e[913](),{};var e}));
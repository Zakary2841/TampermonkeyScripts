// ==UserScript==
// @name         remove-title-notifications
// @namespace    distractions
// @version      0.1
// @description  Remove unread notification count from tab titles
// @author       Viswanath Sivakumar
// @match        *://*/*
// @grant        none
// @downloadURL https://raw.githubusercontent.com/Zakary2841/TampermonkeyScripts/main/Remove_Title_Notifications_from_Tabs.js
// @updateURL   https://raw.githubusercontent.com/Zakary2841/TampermonkeyScripts/main/Remove_Title_Notifications_from_Tabs.js
// ==/UserScript==


function removeCountFromTitle() {
    const re = /^\(\d+\)\s*(.*)/;
    const match = re.exec(document.title);
    if (match !== null) {
        document.title = match[1];
    }
}

function runOnMutation(domElementName, func) {
    var observer = new MutationObserver(function(mutations, observer) {
        observer.disconnect();
        func();
        observer.observe(target, config);
    });

    var target = document.querySelector(domElementName);
    if (!target) return; // Safety check if element is missing
    var config = { childList: true };
    observer.observe(target, config);
}

(function() {
    'use strict';
    removeCountFromTitle();
    runOnMutation('title', removeCountFromTitle);
})();

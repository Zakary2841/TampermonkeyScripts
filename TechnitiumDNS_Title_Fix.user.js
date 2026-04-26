// ==UserScript==
// @name         TechnitiumDNS Title Fix
// @namespace    Zakary2841.TampermonkeyScripts
// @version      1.0
// @description  Force change server name display in TechnitiumDNS web UI and title
// @author       Zakary2841
// @match        http://192.168.0.2:5380/*
// @grant        none
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/Zakary2841/TampermonkeyScripts/main/TechnitiumDNS_Title_Fix.user.js
// @updateURL    https://raw.githubusercontent.com/Zakary2841/TampermonkeyScripts/main/TechnitiumDNS_Title_Fix.user.js
// ==/UserScript==

(function() {
    'use strict';

    const desiredDisplay = 'Zakary-TechnitiumDNS';

    function fixTitle() {
        const span = document.getElementById('lblDnsServerDomain');
        if (span && span.textContent.includes('zakary-technitiumdns')) {
            span.textContent = ' - ' + desiredDisplay;
        }

        if (document.title.includes('zakary-technitiumdns')) {
            document.title = document.title.replace('zakary-technitiumdns', desiredDisplay);
        }
    }

    fixTitle();
    const observer = new MutationObserver(fixTitle);
    observer.observe(document.body, { childList: true, subtree: true });
})();

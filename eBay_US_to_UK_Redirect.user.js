// ==UserScript==
// @name         eBay US to UK Redirect
// @namespace    Zakary2841.TampermonkeyScripts
// @version      1.0.1
// @description  Redirects ebay.com to ebay.co.uk while preserving item IDs and search parameters
// @author       Zakary2841
// @match        *://*.ebay.com/*
// @match        *://ebay.com/*
// @grant        none
// @run-at       document-start
// @downloadURL  https://raw.githubusercontent.com/Zakary2841/TampermonkeyScripts/main/eBay_US_to_UK_Redirect.user.js
// @updateURL    https://raw.githubusercontent.com/Zakary2841/TampermonkeyScripts/main/eBay_US_to_UK_Redirect.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Get current URL components
    const currentUrl = new URL(window.location.href);
    const hostname = currentUrl.hostname.toLowerCase();

    // Only redirect if we're on ebay.com (not already on ebay.co.uk)
    if (hostname === 'ebay.com' || hostname.endsWith('.ebay.com')) {
        // Preserve the pathname (e.g., /itm/123456789), search (query string), and hash
        const newUrl = `https://www.ebay.co.uk${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`;

        // Perform the redirect
        window.location.replace(newUrl);
    }
})();

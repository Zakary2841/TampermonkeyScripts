// ==UserScript==
// @name         Home Assistant ESC to Close Dialogs
// @namespace    https://github.com/Zakary2841/TampermonkeyScripts
// @version      1.0
// @description  Press ESC to close any open Home Assistant dialog
// @match        *://*/*
// @grant        none
// @author       Zakary2841
// @downloadURL  https://raw.githubusercontent.com/Zakary2841/TampermonkeyScripts/main/Home_Assistant_ESC_to_Close_Dialogs.user.js
// @updateURL    https://raw.githubusercontent.com/Zakary2841/TampermonkeyScripts/main/Home_Assistant_ESC_to_Close_Dialogs.user.js
// ==/UserScript==

(function () {
    'use strict';

    // Check if Home Assistant in title or in root element. Else exit.
	if (!document.title.includes("Home Assistant")) {
		if (!document.querySelector('home-assistant')) return;}

    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;

        const dialogSelectors = [
            'ha-dialog[open]',
            'ha-more-info-dialog[open]',
            'ha-panel-config[open]',
            'mwc-dialog[open]',
            '[role="dialog"][open]',
            'dialog[open]',
            '[role="dialog"]:not([hidden])'
        ];

        for (const selector of dialogSelectors) {
            const dialogs = document.querySelectorAll(selector);

            for (const dialog of dialogs) {
                if (typeof dialog.close === 'function') {
                    dialog.close();
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }

                const closeBtn = dialog.querySelector(
                    '[dialog-action="close"], mwc-icon-button[label="Close"], button[aria-label="Close"]'
                );

                if (closeBtn) {
                    closeBtn.click();
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }

                if (dialog.hasAttribute('open')) {
                    dialog.removeAttribute('open');
                    dialog.dispatchEvent(new Event('cancel', { bubbles: true }));
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
            }
        }

        const backdrops = document.querySelectorAll(
            '.mdc-dialog__scrim, .scrim, [class*="backdrop"]'
        );

        for (const backdrop of backdrops) {
            if (backdrop.offsetParent !== null) {
                backdrop.click();
                e.preventDefault();
                e.stopPropagation();
                return;
            }
        }
    }, true);
})();
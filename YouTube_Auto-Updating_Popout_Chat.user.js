// ==UserScript==
// @name         YouTube Auto-Updating Popout Chat (CORS-safe)
// @namespace    Zakary2841.TampermonkeyScripts
// @version      3.0.1
// @description  Keep YouTube popout chat synced to the latest live stream using GM_xmlhttpRequest
// @match        https://www.youtube.com/live_chat?is_popout=1&v=*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      youtube.com
// @connect      www.youtube.com
// @author       Zakary2841
// @downloadURL https://raw.githubusercontent.com/Zakary2841/TampermonkeyScripts/main/YouTube_Auto-Updating_Popout_Chat.user.js
// @updateURL   https://raw.githubusercontent.com/Zakary2841/TampermonkeyScripts/main/YouTube_Auto-Updating_Popout_Chat.user.js
// ==/UserScript==

(function () {
    "use strict";

    // ===== CONFIG =====
    const channelHandle = "@ADeliciousMango";
    const checkIntervalMinutes = 10;
    // ===== END CONFIG =====

    let currentVideoId = new URL(location.href).searchParams.get("v");

    function extractVideoId(html) {
        let m;

        m = html.match(/<link[^>]+rel=["']canonical["'][^>]+watch\?v=([\w-]{11})/i);
        if (m) return m[1];

        m = html.match(/"videoId":"([\w-]{11})"/);
        if (m) return m[1];

        m = html.match(/shortlinkUrl[^>]+watch\?v=([\w-]{11})/i);
        if (m) return m[1];

        return null;
    }

    function checkForNewStream() {
        const url = `https://www.youtube.com/${channelHandle}/live`;

        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            onload: function (response) {
                const html = response.responseText;
                const newVid = extractVideoId(html);

                if (newVid && newVid !== currentVideoId) {
                    console.log("[YT-AutoChat] New stream detected:", newVid);
                    currentVideoId = newVid;
                    location.replace(
                        `https://www.youtube.com/live_chat?is_popout=1&v=${newVid}`
                    );
                } else {
                    console.log("[YT-AutoChat] No new stream detected");
                }
            },
            onerror: function (err) {
                console.error("[YT-AutoChat] Request failed", err);
            }
        });
    }

    // Initial run shortly after load
    setTimeout(() => {
        checkForNewStream();
        setInterval(
            checkForNewStream,
            checkIntervalMinutes * 60 * 1000
        );
    }, 500);

})();
// ==UserScript==
// @name         Press Enter To Submit
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically submits any dynamic question input by pressing ENTER
// @author       L0WK3Y-IAAN
// @match        *://*/*
// @grant        none
// @license MIT
// ==/UserScript==

(function () {
    'use strict';

    function setupInputListeners() {
        const inputs = document.querySelectorAll('input[id^="answer"]');

        inputs.forEach(input => {
            if (input.dataset.enterListenerAttached) return; // prevent duplicates

            input.dataset.enterListenerAttached = true;

            input.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const idSuffix = this.id.replace('answer', '');
                    const submitBtn = document.getElementById(`btnAnswer${idSuffix}`);
                    if (submitBtn) submitBtn.click();
                }
            });
        });
    }

    // Re-run listener setup as new elements may be loaded dynamically
    const observer = new MutationObserver(() => setupInputListeners());
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial setup
    setupInputListeners();
})();

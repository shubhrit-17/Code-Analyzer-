browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "extractCode") {
        const url = window.location.href;
        let platform = "unknown";
        let code = "";
        let language = "unknown";

        if (url.includes("leetcode.com")) {
            platform = "leetcode";
            // LeetCode uses Monaco editor
            let lines = document.querySelectorAll('.view-line');
            if (lines.length > 0) {
                code = Array.from(lines).map(line => line.textContent).join('\n');
            } else {
                // Fallback for newer Leetcode versions
                lines = document.querySelectorAll('div[class*="monaco-scrollable-element"] .view-line');
                if (lines.length > 0) {
                    code = Array.from(lines).map(el => el.textContent).join('\n');
                }
            }

            // Try to extract language
            const langBtn = document.querySelector('button[id*="headlessui-listbox-button"]');
            if (langBtn) language = langBtn.textContent;
        }
        else if (url.includes("hackerrank.com")) {
            platform = "hackerrank";
            // HackerRank uses CodeMirror
            const lines = document.querySelectorAll('.CodeMirror-line');
            if (lines.length > 0) {
                code = Array.from(lines).map(line => line.textContent).join('\n');
            }
        }
        else if (url.includes("codeforces.com")) {
            platform = "codeforces";
            // Codeforces uses a textarea or CodeMirror
            const textarea = document.getElementById('sourceCodeTextarea');
            if (textarea) {
                code = textarea.value;
            } else {
                const lines = document.querySelectorAll('.CodeMirror-line');
                if (lines.length > 0) {
                    code = Array.from(lines).map(line => line.textContent).join('\n');
                } else {
                    const pre = document.querySelector('pre#program-source-text');
                    if (pre) code = pre.textContent;
                }
            }
        }

        // General fallback
        if (!code) {
            code = window.getSelection().toString();
        }

        // Clean up code formatting
        if (code) {
            code = code.replace(/\u00a0/g, " "); // Replace non-breaking spaces
            // Monaco adds weird invisible characters sometimes, replace those
            code = code.replace(/\u200B/g, "");
        }

        sendResponse({
            code: code,
            platform: platform,
            language: language
        });

        // Mandatory for async sendResponse if needed, but here we run sync
        return false;
    }
});

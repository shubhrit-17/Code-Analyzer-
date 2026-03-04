document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('mainContent');
    const loadingState = document.getElementById('loadingState');
    const resultsState = document.getElementById('resultsState');

    const analyzeBtn = document.getElementById('analyzeBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const backBtn = document.getElementById('backBtn');
    const errorMsg = document.getElementById('errorMsg');

    // Check API Key
    browser.storage.local.get(['geminiApiKey']).then((result) => {
        if (!result.geminiApiKey) {
            showError("API Key is missing. Please click the ⚙️ icon to set it up.");
            analyzeBtn.disabled = true;
        }
    });

    settingsBtn.addEventListener('click', () => {
        browser.runtime.openOptionsPage();
    });

    backBtn.addEventListener('click', () => {
        resultsState.classList.add('hidden');
        mainContent.classList.remove('hidden');
        errorMsg.classList.add('hidden');
    });

    analyzeBtn.addEventListener('click', () => {
        errorMsg.classList.add('hidden');
        mainContent.classList.add('hidden');
        loadingState.classList.remove('hidden');

        // Get the active tab
        browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
            const activeTab = tabs[0];

            // Send message to content script to extract code
            browser.tabs.sendMessage(activeTab.id, { action: "extractCode" }).then(response => {
                if (!response || !response.code) {
                    showError("Could not find any code. Make sure you are on a supported coding platform and the code editor is visible.");
                    return;
                }

                // Send code to background script to call LLM API
                browser.runtime.sendMessage({
                    action: "analyzeCode",
                    code: response.code,
                    language: response.language,
                    platform: response.platform
                }).then(apiResponse => {
                    if (apiResponse.error) {
                        showError("Analysis failed: " + apiResponse.error);
                        return;
                    }
                    displayResults(apiResponse.data);
                }).catch(err => {
                    showError("Error communicating with background script.");
                    console.error(err);
                });

            }).catch(err => {
                showError("Please refresh the page and try again. Content script may not be loaded.");
                console.error(err);
            });
        }).catch(err => {
            showError("Error accessing tab: " + err.message);
        });
    });

    function showError(msg) {
        loadingState.classList.add('hidden');
        mainContent.classList.remove('hidden');
        errorMsg.textContent = msg;
        errorMsg.classList.remove('hidden');
    }

    function displayResults(data) {
        loadingState.classList.add('hidden');
        resultsState.classList.remove('hidden');

        document.getElementById('complexityResult').innerHTML = parseMarkdown(data.complexity || "No complexity data provided.");
        document.getElementById('optimizationResult').innerHTML = parseMarkdown(data.optimization || "No optimization tips provided.");
        document.getElementById('similarResult').innerHTML = parseMarkdown(data.similarQuestions || "No similar questions provided.");
    }

    function parseMarkdown(text) {
        if (!text) return "";
        let html = text;
        // Code block
        html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
        html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
        // Bold
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
        // Links
        html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
        // Bullet points (simple)
        html = html.replace(/^\* (.*)$/gm, '<ul><li>$1</li></ul>');
        html = html.replace(/<\/ul>\n<ul>/g, ''); // merge adjacent lists
        // Numbered lists
        html = html.replace(/^[0-9]+\. (.*)$/gm, '<ol><li>$1</li></ol>');
        html = html.replace(/<\/ol>\n<ol>/g, '');
        // New lines
        html = html.replace(/\n\n/g, '</p><p>');
        html = html.replace(/\n/g, '<br>');

        return `<p>${html}</p>`;
    }
});

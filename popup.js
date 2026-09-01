document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('mainContent');
    const loadingState = document.getElementById('loadingState');
    const resultsState = document.getElementById('resultsState');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const backBtn = document.getElementById('backBtn');
    const errorMsg = document.getElementById('errorMsg');

    // UI elements for results
    const timeValue = document.getElementById('timeValue');
    const spaceValue = document.getElementById('spaceValue');
    const timeRing = document.querySelector('.time-ring');
    const spaceRing = document.querySelector('.space-ring');
    
    const summaryText = document.getElementById('summaryText');
    const bottleneckCode = document.getElementById('bottleneckCode');
    const bottleneckWarning = document.getElementById('bottleneckWarning');
    const bottleneckHints = document.getElementById('bottleneckHints');
    
    const optimizeBtn = document.getElementById('optimizeBtn');
    const alreadyOptimizedMsg = document.getElementById('alreadyOptimizedMsg');
    const optimizedCodeContainer = document.getElementById('optimizedCodeContainer');
    const optimizedCode = document.getElementById('optimizedCode');
    
    const similarQuestionsList = document.getElementById('similarQuestionsList');

    // Check API Key
    browser.storage.local.get(['geminiApiKey']).then((result) => {
        if (!result.geminiApiKey) {
            showError("API Key is missing. Please click the gear icon to set it up.");
        }
    });

    settingsBtn.addEventListener('click', () => {
        browser.runtime.openOptionsPage();
    });

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            resultsState.classList.add('hidden');
            mainContent.classList.remove('hidden');
            errorMsg.classList.add('hidden');
        });
    }

    if (optimizeBtn) {
        optimizeBtn.addEventListener('click', () => {
            optimizedCodeContainer.classList.toggle('hidden');
        });
    }

    analyzeBtn.addEventListener('click', () => {
        errorMsg.classList.add('hidden');
        mainContent.classList.add('hidden');
        resultsState.classList.add('hidden');
        loadingState.classList.remove('hidden');

        // Get the active tab
        browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
            const activeTab = tabs[0];

            // Send message to content script to extract code
            browser.tabs.sendMessage(activeTab.id, { action: "extractCode" }).then(response => {
                if (!response || !response.code) {
                    showError("Could not find any code. Make sure you are on a supported coding platform.");
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

        // Update Time & Space
        timeValue.textContent = data.timeComplexity || "O(?)";
        spaceValue.textContent = data.spaceComplexity || "O(?)";

        const isTimeBad = (data.timeComplexity || "").includes("^2") || (data.timeComplexity || "").includes("^3") || (data.timeComplexity || "").includes("2^") || (data.timeComplexity || "").includes("!");
        timeRing.style.borderColor = isTimeBad ? "var(--error)" : "var(--success)";
        
        const isSpaceBad = (data.spaceComplexity || "").includes("n");
        spaceRing.style.borderColor = isSpaceBad ? "var(--error)" : "var(--success)";

        // Update Summary
        summaryText.textContent = data.summary || "No summary provided.";

        // Update Bottleneck
        if (data.bottleneck) {
            const codeLines = data.bottleneck.codeSnippet ? data.bottleneck.codeSnippet.split('\n') : [];
            let highlightedHTML = "";
            codeLines.forEach(line => {
                highlightedHTML += `<span class="highlight-line">${line}</span>\n`;
            });
            bottleneckCode.innerHTML = highlightedHTML;
            bottleneckWarning.textContent = `Lines ${data.bottleneck.lines || '?'}: ${data.bottleneck.explanation || 'Review for optimizations.'}`;
            bottleneckHints.textContent = data.bottleneck.hints || "No hints available.";
        } else {
            bottleneckCode.innerHTML = "";
            bottleneckWarning.textContent = "No specific bottleneck identified.";
            bottleneckHints.textContent = "";
        }

        // Update Optimization Section
        if (data.isOptimized) {
            optimizeBtn.classList.add('hidden');
            alreadyOptimizedMsg.classList.remove('hidden');
            optimizedCodeContainer.classList.add('hidden');
        } else {
            optimizeBtn.classList.remove('hidden');
            alreadyOptimizedMsg.classList.add('hidden');
            optimizedCodeContainer.classList.add('hidden'); // hidden by default until clicked
            optimizedCode.textContent = data.optimizedCode || "// No optimized code provided.";
        }

        // Update Similar Questions
        similarQuestionsList.innerHTML = "";
        if (data.similarQuestions && Array.isArray(data.similarQuestions)) {
            data.similarQuestions.forEach(q => {
                const a = document.createElement('a');
                a.className = 'question-link';
                a.href = q.link;
                a.target = "_blank";
                a.textContent = q.title;
                similarQuestionsList.appendChild(a);
            });
        }
    }
});

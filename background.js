browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "analyzeCode") {

        // Return true to indicate asynchronous response
        getApiKey().then(apiKey => {
            if (!apiKey) {
                sendResponse({ error: "API Key is missing. Please configure it in the extension settings." });
                return;
            }

            callGeminiAPI(apiKey, request.code, request.platform, request.language)
                .then(data => sendResponse({ data }))
                .catch(err => sendResponse({ error: err.message }));
        }).catch(err => {
            sendResponse({ error: "Could not access storage." });
        });

        return true;
    }
});

async function getApiKey() {
    try {
        const result = await browser.storage.local.get(['geminiApiKey']);
        return result.geminiApiKey;
    } catch (e) {
        return null;
    }
}

async function callGeminiAPI(apiKey, code, platform, language) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;

    const prompt = `You are an expert AI software engineer analyzing code for platforms like LeetCode, HackerRank, and Codeforces.
    Please analyze the following code. The platform is ${platform} and language is ${language}.
    
    Return EXACTLY a JSON object with this shape (no markdown wrapping, just the raw JSON object string):
    {
      "timeComplexity": "O(n^2)",
      "spaceComplexity": "O(1)",
      "summary": "Explain how the code works and justify the time and space complexity.",
      "bottleneck": {
        "lines": "14-15",
        "codeSnippet": "for (...) { ... }",
        "explanation": "O(n^2) impact due to nested iteration.",
        "hints": "Try using a Hash Map to avoid the inner loop."
      },
      "isOptimized": false,
      "optimizedCode": "function optimized(arr) { ... }",
      "similarQuestions": [
        {"title": "Two Sum", "link": "https://leetcode.com/problems/two-sum/"}
      ]
    }
    
    If the code is already perfectly optimized, set isOptimized to true and leave optimizedCode empty. Make the values reflect the actual analysis of the provided code.
    
    Code to analyze:
    \`\`\`
    ${code}
    \`\`\`
    `;

    const requestBody = {
        contents: [{
            parts: [{ text: prompt }]
        }],
        generationConfig: {
            temperature: 0.2,
            responseMimeType: "application/json"
        }
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to contact Gemini API");
    }

    const data = await response.json();
    try {
        let contentStr = data.candidates[0].content.parts[0].text;

        // Make parsing completely bulletproof by finding the start and end of the JSON object
        const firstBrace = contentStr.indexOf('{');
        const lastBrace = contentStr.lastIndexOf('}');

        if (firstBrace !== -1 && lastBrace !== -1) {
            contentStr = contentStr.substring(firstBrace, lastBrace + 1);
        }

        const parsedData = JSON.parse(contentStr);
        return parsedData;
    } catch (e) {
        console.error("Failed to parse response:", data, e);
        throw new Error("Invalid response from Gemini (could not parse as JSON)");
    }
}

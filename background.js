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
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const prompt = `You are an expert AI software engineer analyzing code for platforms like LeetCode, HackerRank, and Codeforces.
    Please analyze the following code. The platform is ${platform} and language is ${language}.
    
    Return EXACTLY a JSON object with this shape (no markdown wrapping, just the raw JSON object string):
    {
      "complexity": "Detailed explanation of Time and Space complexity formatted in concise markdown. Mention exactly O(...) notation.",
      "optimization": "Bullet points discussing how to optimize the code. Formatted in markdown.",
      "similarQuestions": "List 2-4 similar coding questions (with platform Links if possible) that require the same logic or pattern. Formatted in markdown."
    }
    
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
        const contentStr = data.candidates[0].content.parts[0].text;
        const parsedData = JSON.parse(contentStr);
        return parsedData;
    } catch (e) {
        console.error("Failed to parse response:", data);
        throw new Error("Invalid response from Gemini (could not parse as JSON)");
    }
}

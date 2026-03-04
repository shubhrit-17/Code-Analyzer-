# Code Analyzer

Code Analyzer is a powerful Firefox browser extension that acts as your AI pair-programmer while you practice competitive programming and data structures on popular coding platforms. Powered by Google's Gemini AI, it helps you understand your code's efficiency, offers actionable optimization tips, and suggests similar questions to master specific patterns.

## Features

- **Complexity Analysis**: Instantly get a detailed breakdown of your code's Time and Space complexity in Big-O notation.
- **Optimization Suggestions**: Receive bulleted, actionable tips on how to improve your algorithm and write cleaner, faster code.
- **Similar Questions**: Get recommendations for 2-4 similar programming problems to reinforce your learning on a specific algorithm or data structure pattern.

## Supported Platforms

Currently, Code Analyzer seamlessly integrates with the code editors on:
- 🔵 [LeetCode](https://leetcode.com)
- 🟢 [HackerRank](https://hackerrank.com)
- 🔴 [Codeforces](https://codeforces.com)

## Prerequisites

To use this extension, you need an API key for Google's Gemini API. You can obtain one for free from [Google AI Studio](https://aistudio.google.com/).

## Installation (Developer Mode)

Since this extension is in development, you can load it in Firefox using Developer Mode:

1. Download or clone this repository to your local machine.
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
3. Click on the **"Load Temporary Add-on..."** button.
4. Select the `manifest.json` file from the directory where you saved the extension.
5. The Code Analyzer icon will appear in your Firefox toolbar.

## Configuration

1. Click the **Code Analyzer** extension icon in your browser toolbar.
2. Click the ⚙️ (Settings) icon to open the options page.
3. Enter your **Gemini API Key** and click Save.

## Usage

1. Navigate to a coding problem on LeetCode, HackerRank, or Codeforces.
2. Write your code in the platform's editor.
3. Click the **Code Analyzer** extension icon.
4. Click the **Analyze** button.
5. Wait for the AI to process your code, and the results will be displayed directly within the extension popup!

## Technologies Used

- JavaScript (ES6+), HTML, CSS
- WebExtensions API (Manifest V3 for Firefox)
- Google GenAI API (Gemini 2.5 Flash model)

## License

This project is licensed under the MIT License.

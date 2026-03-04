document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('saveButton').addEventListener('click', saveOptions);

function saveOptions() {
    const apiKey = document.getElementById('apiKey').value.trim();
    if (!apiKey) {
        showStatus('Please enter an API key.', '#ef4444');
        return;
    }
    
    // In Firefox Manifest V3, we can use the browser.storage API
    browser.storage.local.set({ 'geminiApiKey': apiKey }).then(() => {
        showStatus('API Key saved successfully!', '#4ade80');
    }).catch(err => {
        showStatus('Error saving key: ' + err.message, '#ef4444');
    });
}

function restoreOptions() {
    browser.storage.local.get(['geminiApiKey']).then((result) => {
        if (result.geminiApiKey) {
            document.getElementById('apiKey').value = result.geminiApiKey;
        }
    }).catch(err => {
        console.error('Error fetching API key:', err);
    });
}

function showStatus(message, color) {
    const status = document.getElementById('status');
    status.textContent = message;
    status.style.color = color;
    setTimeout(() => {
        status.textContent = '';
    }, 3000);
}

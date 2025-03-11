document.getElementById('inject').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['bundle.js'] // Replace with the path to your React app's bundle
      });
    });
  });
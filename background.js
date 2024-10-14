chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'saveProgress') {
    const videoId = request.videoId;
    const progress = request.progress;
    chrome.storage.sync.set({ [videoId]: progress }, () => {
      sendResponse({ status: 'success' });
    });
    return true;
  }
});

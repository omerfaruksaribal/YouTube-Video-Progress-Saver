function getVideoId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('v');
}

function loadSavedTime(videoId, callback) {
  chrome.storage.sync.get([videoId], (result) => {
    if (result[videoId]) {
      callback(result[videoId]);
    }
  });
}

function setVideoTime(savedTime) {
  const video = document.querySelector('video');
  if (video) {
    const [hours, minutes, seconds] = savedTime.split(':').map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    video.currentTime = totalSeconds;
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'applySavedTime') {
    const videoId = getVideoId();
    loadSavedTime(videoId, (savedTime) => {
      setVideoTime(savedTime);
      sendResponse({ status: 'success' });
    });
  }
  return true;
});

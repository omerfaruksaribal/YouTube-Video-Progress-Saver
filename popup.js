document.addEventListener('DOMContentLoaded', () => {
  const saveButton = document.getElementById('save');
  const applyButton = document.getElementById('apply');

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    const urlParams = new URLSearchParams(new URL(tab.url).search);
    const videoId = urlParams.get('v');

    // Save the time
    saveButton.addEventListener('click', () => {
      const hours = document.getElementById('hours').value;
      const minutes = document.getElementById('minutes').value;
      const seconds = document.getElementById('seconds').value;

      const savedTime = `${hours}:${minutes}:${seconds}`;
      chrome.storage.sync.set({ [videoId]: savedTime }, () => {
        alert('Time saved!');
      });
    });

    // Apply the saved time
    applyButton.addEventListener('click', () => {
      chrome.tabs.sendMessage(
        tab.id,
        { action: 'applySavedTime' },
        (response) => {
          if (response.status === 'success') {
            alert('Saved time applied!');
          }
        }
      );
    });
  });
});

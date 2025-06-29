document.getElementById('play-btn').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const video = document.querySelector('video');
      if (video) {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      } else {
        alert('未找到视频元素');
      }
    }
  });
}); 
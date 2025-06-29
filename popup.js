document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const url = tabs[0].url;
    let realUrl = url;
    try {
      const u = new URL(url);
      if (u.searchParams.has('url')) {
        realUrl = u.searchParams.get('url');
      }
    } catch (e) {}
    if (/\.(m3u8|mp4|webm)(\?|$)/i.test(realUrl)) {
      const btn = document.createElement('button');
      btn.textContent = '用 IINA 播放';
      btn.onclick = () => {
        const iinaUrl = `iina://weblink?url=${encodeURIComponent(realUrl)}`;
        window.open(iinaUrl, '_blank');
      };
      document.body.appendChild(btn);
    } else {
      document.body.textContent = '当前页面不是视频地址';
    }
  });
}); 
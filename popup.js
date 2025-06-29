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
      const iinaUrl = `iina://weblink?url=${encodeURIComponent(realUrl)}`;
      window.open(iinaUrl, '_blank');
      window.close();
    } else {
      const toast = document.createElement('div');
      toast.textContent = '当前页面不是视频地址';
      toast.style.position = 'fixed';
      toast.style.top = '50%';
      toast.style.left = '50%';
      toast.style.transform = 'translate(-50%, -50%)';
      toast.style.background = 'rgba(0,0,0,0.85)';
      toast.style.color = '#fff';
      toast.style.padding = '12px 28px';
      toast.style.borderRadius = '8px';
      toast.style.fontSize = '16px';
      toast.style.zIndex = 99999;
      toast.style.maxWidth = '90vw';
      toast.style.minWidth = '120px';
      toast.style.textAlign = 'center';
      toast.style.wordBreak = 'break-all';
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.remove();
        window.close();
      }, 1800);
    }
  });
}); 
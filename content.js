function extractRealUrl(url) {
  try {
    const u = new URL(url);
    if (u.searchParams.has('url')) {
      return u.searchParams.get('url');
    }
  } catch (e) {}
  return url;
}

// 扫描页面并在视频链接附近显示浮动框
function createFloatBox(target, url) {
  // 避免重复插入
  if (target.dataset.hasFloatBox) return;
  target.dataset.hasFloatBox = '1';

  const realUrl = extractRealUrl(url);
  const box = document.createElement('div');
  box.textContent = '▶️ 用 IINA 播放';
  box.style.position = 'absolute';
  box.style.background = 'rgba(0,0,0,0.85)';
  box.style.color = '#fff';
  box.style.padding = '4px 14px';
  box.style.borderRadius = '5px';
  box.style.zIndex = 99999;
  box.style.fontSize = '13px';
  box.style.cursor = 'pointer';
  box.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
  box.style.transition = 'opacity 0.2s';
  box.style.opacity = '0.92';

  // 点击用 IINA 打开链接
  box.onclick = (e) => {
    e.stopPropagation();
    const iinaUrl = `iina://weblink?url=${encodeURIComponent(realUrl)}`;
    window.open(iinaUrl, '_blank');
  };

  // 定位到目标元素附近
  const rect = target.getBoundingClientRect();
  box.style.top = `${window.scrollY + rect.top - 28}px`;
  box.style.left = `${window.scrollX + rect.left}px`;

  document.body.appendChild(box);
}

function scanAndShow() {
  // video/source 标签
  document.querySelectorAll('video, source').forEach(el => {
    const url = el.src || el.getAttribute('src');
    if (url && /\.(m3u8|mp4|webm)(\?|$)/i.test(extractRealUrl(url))) {
      createFloatBox(el, url);
    }
  });
  // a 标签
  document.querySelectorAll('a[href]').forEach(el => {
    const url = el.href;
    if (url && /\.(m3u8|mp4|webm)(\?|$)/i.test(extractRealUrl(url))) {
      createFloatBox(el, url);
    }
  });
}

window.addEventListener('DOMContentLoaded', scanAndShow);
// 兼容动态页面，定时扫描
setInterval(scanAndShow, 2000); 
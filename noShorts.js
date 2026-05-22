MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

const observerRoot = document.body || document.documentElement;
let cleanedSidebar = false;
let cleanupScheduled = false;

const observer = new MutationObserver(() => {
  if (!cleanupScheduled) {
    cleanupScheduled = true;
    window.requestAnimationFrame(() => {
      cleanupScheduled = false;
      cleanUpShorts();
    });
  }
});

observer.observe(observerRoot, {
  childList: true,
  subtree: true
});

function cleanUpShorts() {
  if (!cleanedSidebar) {
    clearSidebar();
  }
  clearRichSelectionRows();
  clearShortsVideos();
}

function clearSidebar() {
  const shortsLink = document.querySelector('a[title="Shorts"]');
  if (!shortsLink) return;

  const container = shortsLink.closest('ytd-guide-entry-renderer') || shortsLink.parentElement;
  if (container) {
    container.remove();
    cleanedSidebar = true;
  }
}

function clearRichSelectionRows() {
  const rows = document.querySelectorAll('ytd-rich-section-renderer');
  rows.forEach(row => {
    const text = row.textContent || '';
    if (/shorts|news/i.test(text)) {
      row.remove();
    }
  });
}

function clearShortsVideos() {
  const shortBadges = document.querySelectorAll('span[aria-label="Shorts"]');
  shortBadges.forEach(badge => {
    const item = badge.closest('ytd-rich-item-renderer');
    if (item) {
      item.remove();
    }
  });
}

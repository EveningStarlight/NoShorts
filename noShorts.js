MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

const storage = browser.storage || chrome.storage;

const defaultSettings = {
  sidebar: true,
  rows: true,
  videos: true
};

let settings = { ...defaultSettings };
let cleanedSidebar = false;
let cleanupScheduled = false;

function init() {
  storage.local.get(defaultSettings).then(result => {
    settings = result;
    if (settings.sidebar || settings.rows || settings.videos) {
      observePage();
      cleanUpShorts();
    }
  });

  if (browser.storage && browser.storage.onChanged) {
    browser.storage.onChanged.addListener(changes => {
      if (changes.sidebar || changes.rows || changes.videos) {
        settings = {
          sidebar: changes.sidebar ? changes.sidebar.newValue : settings.sidebar,
          rows: changes.rows ? changes.rows.newValue : settings.rows,
          videos: changes.videos ? changes.videos.newValue : settings.videos
        };
        cleanUpShorts();
      }
    });
  }
}

function observePage() {
  const observerRoot = document.body || document.documentElement;
  const observer = new MutationObserver(() => {
    if (!cleanupScheduled) {
      cleanupScheduled = true;
      window.requestAnimationFrame(() => {
        cleanupScheduled = false;
        cleanUpShorts();
      });
    }
  });

  observer.observe(observerRoot, { childList: true, subtree: true });
}

function cleanUpShorts() {
  if (settings.sidebar && !cleanedSidebar) {
    clearSidebar();
  }
  if (settings.rows) {
    clearRichSelectionRows();
  }
  if (settings.videos) {
    clearShortsVideos();
  }
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
  document.querySelectorAll('ytd-rich-section-renderer').forEach(row => {
    const text = row.textContent || '';
    if (/shorts|news/i.test(text)) {
      row.remove();
    }
  });
}

function clearShortsVideos() {
  document.querySelectorAll('span[aria-label="Shorts"]').forEach(badge => {
    const item = badge.closest('ytd-rich-item-renderer');
    if (item) item.remove();
  });
}

init();

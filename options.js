const defaultSettings = {
  sidebar: true,
  rows: true,
  videos: true
};

const storage = browser.storage || chrome.storage;

function saveOptions() {
  const settings = {
    sidebar: document.getElementById('sidebar').checked,
    rows: document.getElementById('rows').checked,
    videos: document.getElementById('videos').checked
  };
  storage.local.set(settings);
}

function restoreOptions() {
  storage.local.get(defaultSettings).then(settings => {
    document.getElementById('sidebar').checked = settings.sidebar;
    document.getElementById('rows').checked = settings.rows;
    document.getElementById('videos').checked = settings.videos;
  });
}

document.querySelectorAll('input[type="checkbox"]').forEach(input => {
  input.addEventListener('change', saveOptions);
});

restoreOptions();
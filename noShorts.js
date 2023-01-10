MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

let cleanedSidebar = false;
let cleanedShortsRow = false;
var observer = new MutationObserver(function(mutations, observer) {
    if (!cleanedSidebar) {clearSidebar();}
    if (!cleanedShortsRow) {clearShortsRow();}
    clearVideos();
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  attributes: true
});

function clearSidebar() {
  const shortsSidebar = document.querySelector('a[title="Shorts"]');
  if (shortsSidebar !== null) {
    shortsSidebar.parentElement.remove();
    cleanedSidebar = true
  }
}

function clearShortsRow() {
  const shortsRow = document.querySelector('ytd-rich-section-renderer');
  if (shortsRow !== null) {
    shortsRow.remove();
    cleanedShortsRow = true
  }
}

function clearVideos() {
  const shortVideos = document.querySelectorAll('span[aria-label="Shorts"]');
  [...shortVideos].forEach(function(video) {
    video.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
  })
}

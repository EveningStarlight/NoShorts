MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

let cleanedSidebar = false;
var observer = new MutationObserver(function(mutations, observer) {
    if (!cleanedSidebar) {clearSidebar();}
    clearRichSelectionRow();
    clearVideos();
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  attributes: true
});

// Will remve the shorts button from the youtube sidebar
function clearSidebar() {
  const shortsSidebar = document.querySelector('a[title="Shorts"]');
  if (shortsSidebar !== null) {
    shortsSidebar.parentElement.remove();
    cleanedSidebar = true
  }
}

// Will remove any rich selection row, including Shorts, News
function clearRichSelectionRow() {
  const richSelectionRows = document.querySelectorAll('ytd-rich-section-renderer');
  [...richSelectionRows].forEach(function(row) {
    row.remove();
  })
}

// Will remove any uploaded shorts on your subscription page
function clearVideos() {
  const shortVideos = document.querySelectorAll('span[aria-label="Shorts"]');
  [...shortVideos].forEach(function(video) {
    video.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
  })
}

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

let cleanedSidebar = false;
var observer = new MutationObserver(function(mutations, observer) {
    if (!cleanedSidebar) {clearSidebar();}
    clearVideos();
    // ...
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  attributes: true
  //...
});

function clearSidebar() {
  const shortsSidebar = document.querySelector('a[title="Shorts"]');
  if (shortsSidebar !== null) {
    shortsSidebar.parentElement.remove();
    cleanedSidebar = true
  }
}

function clearVideos() {
  const shortVideos = document.querySelectorAll('span[aria-label="Shorts"]');
  [...shortVideos].forEach(function(video) {
    video.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
  })
}

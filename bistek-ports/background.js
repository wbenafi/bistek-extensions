
chrome.runtime.onInstalled.addListener(() => {
  const url = chrome.runtime.getURL('data/ports.json');
  fetch(url)
    .then((response) => response.json()) //assuming file contains json
    .then((json) => {
      chrome.storage.local.set({ ports: json });
      console.log('Ports %csaved', "color: green");
    });
});





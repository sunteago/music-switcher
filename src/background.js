const browserObj = typeof chrome !== "undefined" ? chrome : browser;

// Listen for messages from content.js
browserObj.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.url) {
      browserObj.tabs.update({ url: request.url });
    }
  },
);

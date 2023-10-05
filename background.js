// Listen for messages from content.js
browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.url) {
    browser.tabs.update({ url: request.url });
  }
});

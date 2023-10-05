import { PopupEventTypes, StatusTexts } from "./constants";

const statusText = document.getElementById("status");

browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  browser.tabs.sendMessage(tabs[0].id, {
    command: "redirectToSpotify",
  });
});

browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type !== PopupEventTypes.STATUS) return;

  statusText.innerText = StatusTexts[request.status];
});

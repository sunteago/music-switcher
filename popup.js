// todo: remove
const PopupEventTypes = {
  STATUS: "status",
};

const StatusTextStates = {
  LOADING: "loading",
  NOT_IN_VALID_WEBSITE: "not-in-valid-website",
  DONE: "done",
  ERROR: "error",
  UNSET: "unset",
};

const StatusTexts = {
  [StatusTextStates.LOADING]: "Loading...",
  [StatusTextStates.NOT_IN_VALID_WEBSITE]: "Not in a valid site",
  [StatusTextStates.DONE]: "Done!",
  [StatusTextStates.ERROR]: "Error :(",
  [StatusTextStates.UNSET]: ":)",
};

// todo: remove -------------------

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

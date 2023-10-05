// import {
//   BackgroundEventTypes,
//   PopupEventTypes,
//   StatusTextStates,
// } from "./constants";

// check how to import here

// todo: remove
const PopupEventTypes = {
  STATUS: "status",
};

const BackgroundEventTypes = {
  REDIRECT_URL: "redirect-url",
};

const StatusTextStates = {
  LOADING: "loading",
  NOT_IN_VALID_WEBSITE: "not-in-valid-website",
  DONE: "done",
  ERROR: "error",
  UNSET: "unset",
};

// todo: remove -------------------

// Listen for messages from the popup
browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.command !== "redirectToSpotify") {
    browser.runtime.sendMessage({
      type: PopupEventTypes.STATUS,
      status: StatusTextStates.UNSET,
    });
    return;
  }

  if (!window.location.href.includes("open.spotify.com/track")) {
    browser.runtime.sendMessage({
      type: PopupEventTypes.STATUS,
      status: StatusTextStates.NOT_IN_VALID_WEBSITE,
    });

    return;
  }

  browser.runtime.sendMessage({
    type: PopupEventTypes.STATUS,
    status: StatusTextStates.LOADING,
  });

  const title = document.querySelector("h1")?.textContent;
  const artist = document.querySelector("figure")?.title;
  const titleQuery = title.split(" ").join("+");
  const artistQuery = artist.split(" ").join("+");

  try {
    fetch(
      `https://www.youtube.com/results?search_query=${titleQuery}+${artistQuery}`
    )
      .then((r) => r.text())
      .then((text) => {
        const indexOfFirstResult = text.indexOf("/watch?v=");
        const resultUrl =
          "https://music.youtube.com/" +
          text.substr(indexOfFirstResult + 1, 19);

        browser.runtime.sendMessage({
          type: BackgroundEventTypes.REDIRECT_URL,
          url: resultUrl,
        });

        browser.runtime.sendMessage({
          type: PopupEventTypes.STATUS,
          status: StatusTextStates.DONE,
        });
      });
  } catch (error) {
    browser.runtime.sendMessage({
      type: PopupEventTypes.STATUS,
      status: StatusTextStates.ERROR,
    });
  }
});

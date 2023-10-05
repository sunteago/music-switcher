export const PopupEventTypes = {
  STATUS: "status",
};

export const BackgroundEventTypes = {
  REDIRECT_URL: "redirect-url",
};

export const StatusTextStates = {
  LOADING: "loading",
  NOT_IN_VALID_WEBSITE: "not-in-valid-website",
  DONE: "done",
  ERROR: "error",
};

export const StatusTexts = {
  [StatusTextStates.LOADING]: "Loading...",
  [StatusTextStates.NOT_IN_VALID_WEBSITE]: "Not in a valid site",
  [StatusTextStates.DONE]: "Done!",
  [StatusTextStates.ERROR]: "Error :(",
};

const SPOTIFY_TRACK_URL = "open.spotify.com/track";

const getUrlInYoutubeMusic = async ({ artist, title }) => {
  const titleQuery = title.split(" ").join("+");
  const artistQuery = artist.split(" ").join("+");

  const youtubeUrl = `https://www.youtube.com/results?search_query=${titleQuery}+${artistQuery}`;
  const finalUrl = "https://corsproxy.io/?" + encodeURIComponent(youtubeUrl);

  const response = await fetch(finalUrl);
  const text = await response.text();
  const indexOfFirstResult = text.indexOf("/watch?v=");
  const resultUrl =
    "https://music.youtube.com/" + text.substr(indexOfFirstResult + 1, 19);

  return resultUrl;
};

// works only in english
const getTitleAndArtistFromTab = (tab) => {
  const documentTitle = tab.title;
  const byKeywordIdx = documentTitle.indexOf(" by");

  const title = documentTitle.substring(0, documentTitle.lastIndexOf("-") - 1);
  const artist = documentTitle.slice(
    byKeywordIdx + 4,
    documentTitle.indexOf("|", byKeywordIdx) - 1,
  );

  return { title, artist };
};

const sendUrlToBackground = (url) =>
  browserObj.runtime.sendMessage({
    type: "redirect-url",
    url,
  });

const browserObj = typeof chrome !== "undefined" ? chrome : browser;
const statusText = document.getElementById("status");

const setStatusText = (text) => (statusText.innerText = text);

const onOpenExtension = async ([tab]) => {
  if (!tab.url.includes(SPOTIFY_TRACK_URL)) {
    setStatusText("Not in a valid site");
    return;
  }

  setStatusText("Loading");

  try {
    const { title, artist } = getTitleAndArtistFromTab(tab);
    const resultUrl = await getUrlInYoutubeMusic({ title, artist });
    sendUrlToBackground(resultUrl);

    setStatusText("Done");
  } catch (error) {
    console.log("Something went wrong", error);
    setStatusText("Error :(");
  }
};

browserObj.tabs.query({ active: true, currentWindow: true }, onOpenExtension);

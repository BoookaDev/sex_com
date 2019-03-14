chrome.contextMenus.create({
  title: "Post to sex.com",
  contexts: ["image", "link"],
  onclick: searchText,
});

function searchText(info) {
  const {linkUrl, srcUrl, pageUrl} = info;
  const link = isLinkToImage(linkUrl) ? linkUrl : isLinkToImage(srcUrl) ? srcUrl : undefined;
  
  if (!link) {
    return;
  }

  const url = encodeURI(`https://upload.sex.com/pin/create?source_url=${pageUrl}&image_url=${link}&video=0&from=url`);

  chrome.tabs.create({
    url: url
  });
}

function isLinkToImage(url) {
  if (!url) {
    return false;
  }

  url = url.split("?")[0];

  return /\.(jpg|jpeg|png)$/.test(url);
}

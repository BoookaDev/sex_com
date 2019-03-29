chrome.contextMenus.create({
  title: "Post to sex.com",
  contexts: ["image", "link"],
  onclick: searchText,
});

function searchText(info) {
  let {linkUrl, srcUrl, pageUrl} = info;
  pageUrl = cleanUrl(pageUrl);
  let link = isLinkToImage(linkUrl) || isLinkToImage(srcUrl);

  if (!link) {
    return;
  }

  const url = encodeURI(`https://upload.sex.com/pin/create?source_url=${pageUrl}&image_url=${link}&video=0&from=url`);

  chrome.tabs.create({
    url: url,
  });
}

function isLinkToImage(url) {
  if (!url) {
    return false;
  }

  url = cleanUrl(url);

  return /\.(jpg|jpeg|png)$/.test(url) && url;
}

function cleanUrl(url){
  return url.split(/[#?]/)[0];;
}

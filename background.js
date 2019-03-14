chrome.contextMenus.create({
  title: "Post to sex.com",
  contexts: ["image", "link"],
  onclick: upload,
});

const MAX_SIZE = 3000;

async function upload(info) {
  const {linkUrl, srcUrl, pageUrl} = info;
  let link = isLinkToImage(linkUrl) || isLinkToImage(srcUrl);

  if (!link) {
    return;
  }

  const [w, h] = await isTooLarge(link);
  link = await resize(w, h, link);
  console.log(link);

  // const url = encodeURI(`https://upload.sex.com/pin/create?source_url=${pageUrl}&image_url=${link}&video=0&from=url`);

  // chrome.tabs.create({url});
}

async function upload(data) {

}

async function resize(w, h, link) {
  let newW;
  let newH;
  if (w > MAX_SIZE) {
    newW = MAX_SIZE;
    newH = newW * h / w;
  } else if (h > MAX_SIZE) {
    newH = MAX_SIZE;
    newW = w * newH / h;
  } else {
    return link;
  }

  const canv = document.createElement("canvas");
  canv.width = newW;
  canv.height = newH;
  document.body.appendChild(canv);

  const context = canv.getContext("2d");
  const img = new Image;

  return new Promise(resolve => {
    img.onload = () => {
      context.drawImage(img, newW, newH);
      resolve(context.canvas.toDataURL("image/jpeg"));
    };
    img.src = link;
  });
}

function loadImage(link) {
  const img = Array.from(document.images).find(i => i.src === link);
  if (!img) {
    return [0, 0];
  }
  const w = img.style.width;
  const h = img.style.height;
  img.style.width = "auto !important";
  img.style.height = "auto !important";

  const sisez = [img.offsetWidth, img.offsetHeight];

  img.style.width = w;
  img.style.height = h;

  return sisez;
}

async function isTooLarge(link) {
  return new Promise(resolve => {
    chrome.tabs.executeScript({
      code: "(" + loadImage.toString() + ")('" + link + "');",
    }, ([a]) => resolve(a));
  });
}

function isLinkToImage(url) {
  if (!url) {
    return false;
  }

  url = url.split("?")[0];

  return /\.(jpg|jpeg|png)$/.test(url) ? url : false;
}

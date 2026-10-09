const updatesList = document.querySelector("#updates-list");

function isInstagramUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      (url.hostname === "instagram.com" || url.hostname.endsWith(".instagram.com"));
  } catch {
    return false;
  }
}

function createUpdateCard(update) {
  const article = document.createElement("article");
  article.className = "update-card";

  if (typeof update.image === "string" && update.image.startsWith("image/updates/")) {
    const image = document.createElement("img");
    image.src = new URL(update.image, document.baseURI).href;
    image.alt = update.title || "陶集吉更新圖片";
    image.loading = "lazy";
    article.append(image);
  }

  const copy = document.createElement("div");
  copy.className = "update-copy";

  const title = document.createElement("h3");
  title.textContent = update.title || "陶集吉最新消息";
  copy.append(title);

  if (typeof update.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(update.date)) {
    const date = document.createElement("p");
    date.className = "update-date";
    date.textContent = update.date;
    copy.append(date);
  }

  if (typeof update.caption === "string" && update.caption) {
    const caption = document.createElement("p");
    caption.className = "update-caption";
    caption.textContent = update.caption;
    copy.append(caption);
  }

  if (typeof update.instagram_url === "string" && isInstagramUrl(update.instagram_url)) {
    const link = document.createElement("a");
    link.className = "update-link";
    link.href = update.instagram_url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "前往 Instagram 查看貼文";
    copy.append(link);
  }

  article.append(copy);
  return article;
}

async function loadUpdates() {
  try {
    const response = await fetch("data/updates.json");
    if (!response.ok) {
      throw new Error(`更新日誌載入失敗：HTTP ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data.updates)) {
      throw new Error("更新日誌資料格式錯誤：updates 必須是陣列");
    }

    updatesList.replaceChildren();
    data.updates
      .filter((update) => update && typeof update === "object")
      .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")))
      .forEach((update) => updatesList.append(createUpdateCard(update)));

    if (updatesList.childElementCount === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.className = "updates-status";
      emptyMessage.textContent = "目前尚無更新，最新貼文請至 Instagram 查看。";
      updatesList.append(emptyMessage);
    }
  } catch (error) {
    console.error(error);
    const errorMessage = document.createElement("p");
    errorMessage.className = "updates-status";
    errorMessage.textContent = "更新日誌目前無法載入，請稍後再試。";
    updatesList.replaceChildren(errorMessage);
  } finally {
    updatesList.setAttribute("aria-busy", "false");
  }
}

loadUpdates();

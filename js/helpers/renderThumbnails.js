import { parseHTMLContent } from "./parseHTMLContent.js";

export function renderThumbnails(post, colour, btnColour, container) {
  const thumbElement = document.createElement("div");
  thumbElement.classList.add("thumbnail", colour);

  const thumbTitle = document.createElement("h2");
  thumbTitle.textContent = post.title.rendered;
  thumbElement.classList.add("thumb-title");
  thumbElement.appendChild(thumbTitle);

  const parsedContent = parseHTMLContent(post.content.rendered);
  const img = parsedContent.querySelectorAll("img");

  if (img.length > 0) {
    const firstImg = img[0];
    const thumbImg = document.createElement("img");
    thumbImg.src = firstImg.src;
    thumbImg.alt = firstImg.alt || "Thumbnail image";
    thumbImg.classList.add("thumb-img");
    thumbElement.appendChild(thumbImg);
  }

  const thumbBtn = document.createElement("button");
  thumbBtn.classList.add("thumb-btn", btnColour);
  thumbBtn.textContent = "View Post";
  thumbBtn.addEventListener("click", () => {
    window.location.href = `postPage.html?id=${post.id}`; // Navigate on click
  });
  thumbElement.appendChild(thumbBtn);

  container.appendChild(thumbElement);
}

import { parseHTMLContent } from "./parseHTMLContent.js";

const blogContainer = document.querySelector(".container-blog-posts");

export function renderThumbnails(post, colour, btnColour) {
  const thumbElement = document.createElement("div");
  thumbElement.classList.add("thumbnail");
  thumbElement.classList.add(colour);

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
    thumbImg.alt = firstImg.alt;
    thumbImg.classList.add("thumb-img");
    thumbElement.appendChild(thumbImg);
  }

  const thumbBtn = document.createElement("button");
  thumbBtn.classList.add("thumb-btn");
  thumbBtn.classList.add(btnColour);
  thumbBtn.textContent = "View Post";
  thumbBtn.addEventListener("click", () => {
    window.location.href = `postPage.html?id=${post.id}`; // Navigate on click
  });
  thumbElement.appendChild(thumbBtn);

  blogContainer.appendChild(thumbElement);
}

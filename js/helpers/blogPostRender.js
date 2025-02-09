import { parseHTMLContent } from "./parseHTMLContent.js";
import { createImageModal } from "./modal.js";

export function renderBlogPost(post) {
  const blogPostContainer = document.querySelector(".postPage-container");
  const postContent = createPostContent(post);

  blogPostContainer.innerHTML = "";
  blogPostContainer.appendChild(postContent);

  document.title = `Godly Whispers | ${post.title.rendered}`;
}

function createPostContent(post) {
  const divPost = createMainContainer();
  const divFlexSmall = createFlexContainer();

  appendTitle(divPost, post.title.rendered);
  const parsedContent = parseHTMLContent(post.content.rendered);

  appendSubheading(divPost, parsedContent);
  appendParagraphs(divPost, divFlexSmall, parsedContent);
  appendImages(divPost, divFlexSmall, parsedContent);

  divPost.appendChild(divFlexSmall);
  return divPost;
}

function createMainContainer() {
  const div = document.createElement("div");
  div.className = "post-container";
  return div;
}

function createFlexContainer() {
  const div = document.createElement("div");
  div.className = "flex-container-small third";
  return div;
}

function appendTitle(container, titleText) {
  const title = document.createElement("h1");
  title.className = "h1-homepage zero";
  title.textContent = titleText;
  container.appendChild(title);
}

function appendSubheading(container, parsedContent) {
  const subheading = parsedContent.querySelector("h2");
  subheading.className = "subheading-postPage description-line-homepage first";
  container.appendChild(subheading);
}

function appendParagraphs(mainContainer, flexContainer, parsedContent) {
  const paragraphs = parsedContent.querySelectorAll("p");

  if (paragraphs.length > 0) {
    const firstPara = paragraphs[0];
    firstPara.className = "second";
    mainContainer.appendChild(firstPara);

    if (paragraphs.length > 1) {
      flexContainer.appendChild(paragraphs[1]);
    }

    Array.from(paragraphs)
      .slice(2)
      .forEach((p) => {
        p.className = "fourth";
        mainContainer.appendChild(p);
      });
  }
}

function appendImages(mainContainer, flexContainer, parsedContent) {
  const { openModal } = createImageModal();
  const images = parsedContent.querySelectorAll("img");

  if (images.length > 0) {
    const flexImage = images[0];
    setupImage(flexImage, "flex-image", openModal);
    flexContainer.appendChild(flexImage);

    if (images.length > 1) {
      const templeImage = images[1];
      setupImage(templeImage, "temple-image fifth", openModal);
      mainContainer.appendChild(templeImage);
    }
  }
}

function setupImage(img, className, openModal) {
  img.className = className;
  img.addEventListener("click", () => openModal(img.src));
}

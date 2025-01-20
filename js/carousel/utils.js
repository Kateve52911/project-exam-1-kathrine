import { getColourScheme } from "../helpers/getColourScheme.js";

export function createDOMElement(tag, className, textContent = "") {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;

  return element;
}

export function createPostImage(parsedContent, CLASSES, CAROUSEL_CONFIG) {
  const images = parsedContent.querySelectorAll("img");
  const postImg = createDOMElement("img", CLASSES.postImage);

  if (images.length > 0) {
    postImg.src = images[0].src;
    postImg.alt = images[0].alt;
  } else {
    postImg.src = CAROUSEL_CONFIG.defaultImagePath;
    postImg.alt = "Placeholder mage";
  }

  return postImg;
}

export function createPostCard(
  post,
  index, // Add this parameter
  CLASSES,
  CAROUSEL_CONFIG,
  parseHTMLContent
) {
  const postCard = createDOMElement("a", CLASSES.postCard);
  postCard.href = `postpage.html?id=${post.id}`;

  const scheme = getColourScheme(index);
  postCard.classList.add(`bg-${scheme.colour}`);

  const parsedContent = parseHTMLContent(post.content.rendered);
  const postImg = createPostImage(parsedContent, CLASSES, CAROUSEL_CONFIG);
  const postTitle = createDOMElement(
    "h2",
    CLASSES.postTitle,
    post.title.rendered
  );

  postCard.append(postImg, postTitle);
  return postCard;
}

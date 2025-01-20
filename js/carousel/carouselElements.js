import { createDOMElement, createPostCard } from "./utils.js";

export function createSlide(
  post,
  index,
  CLASSES,
  CAROUSEL_CONFIG,
  parseHTMLContent
) {
  const slide = createDOMElement("div", CLASSES.slide);
  slide.style.display = index === 0 ? "block" : "none";

  const postCard = createPostCard(
    post,
    index, // Pass the index here
    CLASSES,
    CAROUSEL_CONFIG,
    parseHTMLContent
  );

  slide.appendChild(postCard);
  return slide;
}

export function createNavigationButtons(CLASSES) {
  const prevBtn = createDOMElement("button", `${CLASSES.button} prev`, "<");
  const nextBtn = createDOMElement("button", `${CLASSES.button} next`, ">");
  return { prevBtn, nextBtn };
}

export function createDotIndicators(numberOfSlides, CLASSES) {
  const dotsContainer = createDOMElement("div", CLASSES.dots);

  for (let i = 0; i < numberOfSlides; i++) {
    const dot = createDOMElement(
      "span",
      `dot ${i === 0 ? CLASSES.activeDot : ""}`
    );
    dot.dataset.slide = i;
    dotsContainer.appendChild(dot);
  }

  return dotsContainer;
}

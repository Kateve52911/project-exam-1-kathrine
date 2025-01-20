// import { getPostsDetails } from "../api/apiCall.js";
// import { API_URL } from "../api/constants.js";
// import { parseHTMLContent } from "../helpers/parseHTMLContent.js";
// import {
//   createDotIndicators,
//   createNavigationButtons,
//   createSlide,
// } from "./carouselElements.js";
// import { CAROUSEL_CONFIG, SELECTORS, CLASSES } from "./config.js";
// import { createDOMElement } from "./utils.js";
// import { displayError } from "../utils/errorHandler.js";

// let currentSlide = 0;

// function updateSlideVisibility() {
//   try {
//     const slides = document.querySelectorAll(SELECTORS.slide);
//     const dots = document.querySelectorAll(SELECTORS.dot);

//     if (!slides.length || !dots.length) {
//       throw new Error("Carousel elements not found");
//     }

//     if (currentSlide >= slides.length) currentSlide = 0;
//     if (currentSlide < 0) currentSlide = slides.length - 1;

//     slides.forEach((slide) => (slide.style.display = "none"));
//     slides[currentSlide].style.display = "block";

//     dots.forEach((dot) => dot.classList.remove(CLASSES.activeDot));
//     dots[currentSlide].classList.add(CLASSES.activeDot);
//   } catch (error) {
//     displayError("Error updating slide: " + error.message);
//   }
// }

// function setupEventListeners(container) {
//   try {
//     const nextButton = container.querySelector(SELECTORS.nextButton);
//     const prevButton = container.querySelector(SELECTORS.prevButton);
//     const dots = container.querySelectorAll(SELECTORS.dot);

//     if (!nextButton || !prevButton) {
//       throw new Error("Navigation buttons not found");
//     }

//     nextButton.addEventListener("click", () => {
//       currentSlide++;
//       updateSlideVisibility();
//     });

//     prevButton.addEventListener("click", () => {
//       currentSlide--;
//       updateSlideVisibility();
//     });

//     dots.forEach((dot) => {
//       dot.addEventListener("click", () => {
//         currentSlide = parseInt(dot.dataset.slide);
//         updateSlideVisibility();
//       });
//     });
//   } catch (error) {
//     displayError("Error setting up controls: " + error.message);
//   }
// }

// function startAutoPlay() {
//   try {
//     setInterval(() => {
//       currentSlide++;
//       updateSlideVisibility();
//     }, CAROUSEL_CONFIG.slideDuration);
//   } catch (error) {
//     displayError("Error in autoplay: " + error.message);
//   }
// }

// function createCarouselHTML(posts) {
//   try {
//     if (!Array.isArray(posts) || posts.length === 0) {
//       throw new Error("No valid posts data provided");
//     }

//     const carouselContainer = createDOMElement("div", CLASSES.container);
//     const carousel = createDOMElement("div", CLASSES.carousel);

//     const recentPosts = posts.slice(0, CAROUSEL_CONFIG.maxSlides);
//     const slides = recentPosts.map((post, index) =>
//       createSlide(post, index, CLASSES, CAROUSEL_CONFIG, parseHTMLContent)
//     );

//     carousel.append(...slides);

//     const { prevBtn, nextBtn } = createNavigationButtons(CLASSES);
//     const dotsContainer = createDotIndicators(recentPosts.length, CLASSES);

//     carouselContainer.append(prevBtn, carousel, nextBtn, dotsContainer);
//     return carouselContainer;
//   } catch (error) {
//     displayError("Error creating carousel: " + error.message);
//     return null;
//   }
// }

// async function initCarousel() {
//   try {
//     const blogContainer = document.querySelector(SELECTORS.container);

//     if (!blogContainer) {
//       throw new Error("Blog container not found");
//     }

//     const posts = await getPostsDetails(API_URL);

//     if (!posts || posts.length === 0) {
//       throw new Error("No posts found");
//     }

//     const carousel = createCarouselHTML(posts);

//     if (!carousel) {
//       throw new Error("Failed to create carousel HTML");
//     }

//     blogContainer.appendChild(carousel);
//     setupEventListeners(carousel);
//     startAutoPlay();
//   } catch (error) {
//     displayError("Failed to initialize carousel: " + error.message);
//   }
// }

// initCarousel();

import { getPostsDetails } from "../api/apiCall.js";
import { API_URL } from "../api/constants.js";
import { parseHTMLContent } from "../helpers/parseHTMLContent.js";
import {
  createDotIndicators,
  createNavigationButtons,
  createSlide,
} from "./carouselElements.js";
import { CAROUSEL_CONFIG, SELECTORS, CLASSES } from "./config.js";
import { createDOMElement } from "./utils.js";
import { displayError } from "../utils/errorHandler.js";

window.addEventListener("load", function () {
  let currentSlide = 0;

  function updateSlideVisibility() {
    try {
      const slides = document.querySelectorAll(SELECTORS.slide);
      const dots = document.querySelectorAll(SELECTORS.dot);

      if (!slides.length || !dots.length) {
        throw new Error("Carousel elements not found");
      }

      if (currentSlide >= slides.length) currentSlide = 0;
      if (currentSlide < 0) currentSlide = slides.length - 1;

      slides.forEach((slide) => (slide.style.display = "none"));
      slides[currentSlide].style.display = "block";

      dots.forEach((dot) => dot.classList.remove(CLASSES.activeDot));
      dots[currentSlide].classList.add(CLASSES.activeDot);
    } catch (error) {
      displayError("Error updating slide: " + error.message);
    }
  }

  function setupEventListeners(container) {
    try {
      const nextButton = container.querySelector(SELECTORS.nextButton);
      const prevButton = container.querySelector(SELECTORS.prevButton);
      const dots = container.querySelectorAll(SELECTORS.dot);

      if (!nextButton || !prevButton) {
        throw new Error("Navigation buttons not found");
      }

      nextButton.addEventListener("click", () => {
        currentSlide++;
        updateSlideVisibility();
      });

      prevButton.addEventListener("click", () => {
        currentSlide--;
        updateSlideVisibility();
      });

      dots.forEach((dot) => {
        dot.addEventListener("click", () => {
          currentSlide = parseInt(dot.dataset.slide);
          updateSlideVisibility();
        });
      });
    } catch (error) {
      displayError("Error setting up controls: " + error.message);
    }
  }

  function startAutoPlay() {
    try {
      setInterval(() => {
        currentSlide++;
        updateSlideVisibility();
      }, CAROUSEL_CONFIG.slideDuration);
    } catch (error) {
      displayError("Error in autoplay: " + error.message);
    }
  }

  function createCarouselHTML(posts) {
    try {
      if (!Array.isArray(posts) || posts.length === 0) {
        throw new Error("No valid posts data provided");
      }

      const carouselContainer = createDOMElement("div", CLASSES.container);
      const carousel = createDOMElement("div", CLASSES.carousel);

      const recentPosts = posts.slice(0, CAROUSEL_CONFIG.maxSlides);
      const slides = recentPosts.map((post, index) =>
        createSlide(post, index, CLASSES, CAROUSEL_CONFIG, parseHTMLContent)
      );

      carousel.append(...slides);

      const { prevBtn, nextBtn } = createNavigationButtons(CLASSES);
      const dotsContainer = createDotIndicators(recentPosts.length, CLASSES);

      carouselContainer.append(prevBtn, carousel, nextBtn, dotsContainer);
      return carouselContainer;
    } catch (error) {
      displayError("Error creating carousel: " + error.message);
      return null;
    }
  }

  async function initCarousel() {
    try {
      const blogContainer = document.querySelector(SELECTORS.container);

      if (!blogContainer) {
        throw new Error("Blog container not found");
      }

      const posts = await getPostsDetails(API_URL);

      if (!posts || posts.length === 0) {
        throw new Error("No posts found");
      }

      const carousel = createCarouselHTML(posts);

      if (!carousel) {
        throw new Error("Failed to create carousel HTML");
      }

      blogContainer.appendChild(carousel);
      setupEventListeners(carousel);
      startAutoPlay();
    } catch (error) {
      displayError("Failed to initialize carousel: " + error.message);
    }
  }

  initCarousel();
});

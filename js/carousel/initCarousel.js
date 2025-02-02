import { BlogCarousel } from "./blogCarousel.js"; // Import the class
import { SELECTORS } from "./config.js"; // Import selectors

window.addEventListener("load", async () => {
  try {
    const carousel = new BlogCarousel(SELECTORS.container);
    await carousel.initialize();
  } catch (error) {
    console.error("Failed to initialize carousel:", error);
  }
});

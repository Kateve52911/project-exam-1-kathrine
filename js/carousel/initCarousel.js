import { BlogCarousel } from "./blogCarousel.js";
import { SELECTORS } from "./config.js";

window.addEventListener("load", async () => {
  try {
    const carousel = new BlogCarousel(SELECTORS.container);
    await carousel.initialize();
  } catch (error) {
    console.error("Failed to initialize carousel:", error);
  }
});

// aboutPage.js
import { setupAboutPageNavigation } from "./helpers/renderAboutPage.js";

console.log("aboutPage.js loaded");
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Content Loaded");
  try {
    setupAboutPageNavigation();
    console.log("Setup complete");
  } catch (error) {
    console.error("Setup error:", error);
  }
});

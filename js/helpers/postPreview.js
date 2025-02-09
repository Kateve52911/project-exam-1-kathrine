import { getPostsDetailsByTag } from "../api/apiTag.js";
import { createPostPreviewFrontPage } from "./renderPreviewHTML.js";

async function initializePreview() {
  try {
    const posts = await getPostsDetailsByTag("goddess");
    const previewSection = document.getElementById("preview-section");

    posts.forEach((post) => {
      const previewElement = createPostPreviewFrontPage(post);

      if (!previewElement) {
        // Check if previewElement is valid
        console.error(
          "Error: createPostPreviewFrontPage returned null or undefined."
        );
        return;
      }

      previewSection.appendChild(previewElement);
    });
  } catch (error) {
    console.error("Error initializing post previews:", error);
  }
}

initializePreview();

import { getColourScheme } from "../helpers/getColourScheme.js";
import { renderThumbnails } from "../helpers/renderThumbnails.js";

export function renderSearchResults(filteredPosts, container) {
  if (!container) {
    container = document.querySelector(".container-blog-posts");
    if (!container) return;
  }

  container.innerHTML = "";

  if (filteredPosts.length === 0) {
    const noResults = document.createElement("p");
    noResults.textContent = "No posts found";
    noResults.className = "no-results";
    container.appendChild(noResults);
    return;
  }

  const startIndex = 0;

  filteredPosts.forEach((post, i) => {
    const { colour, btnColour } = getColourScheme(startIndex + i);
    renderThumbnails(post, colour, btnColour, container);
  });
}

import { handleSearch } from "./searchHandler.js";
import { filterPosts } from "./searchLogic.js";
import { renderSearchResults } from "./searchRenderer.js";
import { getSearchTerm, updatePosts } from "./searchState.js";
import { createSearchInput } from "./searchUI.js";

export function initializeSearch() {
  const searchContainer = createSearchInput();
  const blogContainer = document.querySelector(".container-blog-posts");

  if (blogContainer) {
    blogContainer.insertAdjacentElement("beforebegin", searchContainer);

    searchContainer
      .querySelector(".search-input")
      .addEventListener("input", handleSearch);
  }
}

export function updatePostsData(posts) {
  updatePosts(posts);
  const currentTerm = getSearchTerm();

  if (currentTerm) {
    const filteredPosts = filterPosts(currentTerm);
    const container = document.querySelector(".postPage-container");
    renderSearchResults(filteredPosts, container);
  }
}

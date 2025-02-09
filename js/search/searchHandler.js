import { setSearchTerm, getSearchTerm } from "./searchState.js";
import { filterPosts } from "./searchLogic.js";
import { renderSearchResults } from "./searchRenderer.js";

export function handleSearch(event) {
  setSearchTerm(event.target.value);
  const searchTerm = getSearchTerm();

  const filteredPosts = filterPosts(searchTerm);
  const container = document.querySelector(".container-blog-posts");
  if (container) {
    renderSearchResults(filteredPosts, container);
  }
}

export function createSearchInput() {
  const searchContainer = document.createElement("div");
  searchContainer.className = "search-container";

  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.className = "search-input";
  searchInput.placeholder = "Search posts...";

  searchContainer.appendChild(searchInput);
  return searchContainer;
}

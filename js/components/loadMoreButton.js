export function createLoadMoreButton(onClick) {
  const btnDiv = document.createElement("div");
  btnDiv.className = "btnLoadMoreContainer";

  const loadMoreBtn = document.createElement("button");
  loadMoreBtn.textContent = "Load More Posts";
  loadMoreBtn.classList.add("load-more-btn");

  btnDiv.appendChild(loadMoreBtn);
  loadMoreBtn.addEventListener("click", onClick);

  return { btnDiv, loadMoreBtn };
}

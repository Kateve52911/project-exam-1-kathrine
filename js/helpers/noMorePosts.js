export function showNoMorePosts(loadMoreBtn, btnDiv) {
  if (loadMoreBtn && btnDiv) {
    loadMoreBtn.remove();
    const noMorePosts = document.createElement("p");
    noMorePosts.textContent = "No more posts";
    noMorePosts.className = "no-more-post-message";
    btnDiv.appendChild(noMorePosts);
  }
}

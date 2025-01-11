import { getBlogPostsDetails } from "../api/apiCall";

let currentPage = 1;
const postsPerPage = 10;

export function initPagination() {
  createLoadMoreBtn();
  loadInitialPosts();
}

function createLoadMoreBtn() {
  const loadMoreBtn = document.createElement("button");
  loadMoreBtn.textContent = "Load More Posts";
  loadMoreBtn.classList.add("loadMoreBtn");
  document
    .querySelector(".container-blog-posts")
    .insertAdjacentElement("afterend", loadMoreBtn);

  loadMoreBtn.addEventListener("click", async () => {
    currentPage++;
    await loadPosts(currentPage);
  });
}

async function loadPosts(page) {
  try {
    const blogData = getBlogPostsDetails(page, postsPerPage);
    if (blogData.length === 0) {
      document.querySelector(".loadMoreBtn").style.display = "none";
      return;
    }
    renderBlogPosts(blogData, (page - 1) * postsPerPage);
  } catch (error) {
    console.error("Error loading posts:", error);
  }
}

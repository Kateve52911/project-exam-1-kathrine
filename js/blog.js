import { getBlogPostsDetails } from "./api/apiCallPaginated.js";
import { getColourScheme } from "./helpers/getColourScheme.js";
import { renderThumbnails } from "./helpers/renderThumbnails.js";

let currentPage = 1;
const postsPerPage = 10;
const blogContainer = document.querySelector(".container-blog-posts");

async function loadPosts(page) {
  try {
    const blogData = await getBlogPostsDetails(page, postsPerPage);

    const startIndex = (page - 1) * postsPerPage;
    blogData.forEach((post, index) => {
      const { colour, btnColour } = getColourScheme(startIndex + index);
      renderThumbnails(post, colour, btnColour, blogContainer);
    });
    if (blogData.length < postsPerPage) {
      loadMoreBtn.remove();
      const noMorePosts = document.createElement("p");
      noMorePosts.textContent = "No more posts";
      noMorePosts.className = "no-more-posts-message";
      btnDiv.appendChild(noMorePosts);
      return;
    }
  } catch (error) {
    loadMoreBtn.remove();
    console.error("Error loading posts:", error);
  }
}

const btnDiv = document.createElement("div");
btnDiv.className = "btnLoadMoreContainer";

const loadMoreBtn = document.createElement("button");
loadMoreBtn.textContent = "Load More Posts";
loadMoreBtn.classList.add("load-more-btn");
btnDiv.appendChild(loadMoreBtn);
blogContainer.insertAdjacentElement("afterend", btnDiv);

async function handleLoadMore() {
  currentPage++;
  await loadPosts(currentPage);
}

loadMoreBtn.addEventListener("click", handleLoadMore);

// Initial load
loadPosts(currentPage);

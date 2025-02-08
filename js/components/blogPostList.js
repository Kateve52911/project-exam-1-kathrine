import { getBlogPostsDetails } from "../api/apiCallPaginated.js";
import { getColourScheme } from "../helpers/getColourScheme.js";
import { renderThumbnails } from "../helpers/renderThumbnails.js";
import { createLoadMoreButton } from "./loadMoreButton.js";

const blogContainer = document.querySelector(".container-blog-posts");
let currentPage = 1;
const postsPerPage = 10;

async function loadPosts(page) {
  try {
    const blogData = await getBlogPostsDetails(page, postsPerPage);

    if (!blogData || blogData.length === 0) {
      loadMoreBtn.remove();
      const noMorePosts = document.createElement("p");
      noMorePosts.textContent = "No more posts";
      noMorePosts.className = "no-more-post-message";
      btnDiv.appendChild(noMorePosts);
      return;
    }

    const startIndex = (page - 1) * postsPerPage;
    blogData.forEach((post, index) => {
      const { colour, btnColour } = getColourScheme(startIndex + index);
      renderThumbnails(post, colour, btnColour, blogContainer);
    });
  } catch (error) {
    console.error("Error loading posts", error);
  }
}

async function handleLoadMore() {
  currentPage++;
  await loadPosts(currentPage);
}

const { btnDiv, loadMoreBtn } = createLoadMoreButton(handleLoadMore);
blogContainer.insertAdjacentElement("afterend", btnDiv);

loadPosts(currentPage);

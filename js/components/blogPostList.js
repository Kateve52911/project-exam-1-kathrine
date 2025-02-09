import { getBlogPostsDetails } from "../api/apiCallPaginated.js";
import { getColourScheme } from "../helpers/getColourScheme.js";
import { showNoMorePosts } from "../helpers/noMorePosts.js";
import { renderThumbnails } from "../helpers/renderThumbnails.js";
import { initializeSearch } from "../search/search.js";
import { createLoadMoreButton } from "./loadMoreButton.js";

document.addEventListener("DOMContentLoaded", () => {
  const blogContainer = document.querySelector(".container-blog-posts");
  let currentPage = 1;
  const postsPerPage = 10;

  let btnDiv;
  let loadMoreBtn;

  initializeSearch();

  async function loadPosts(page) {
    try {
      const blogData = await getBlogPostsDetails(page, postsPerPage);

      const startIndex = (page - 1) * postsPerPage;
      blogData.forEach((post, index) => {
        const { colour, btnColour } = getColourScheme(startIndex + index);
        renderThumbnails(post, colour, btnColour, blogContainer);
      });

      if (!blogData || blogData.length < postsPerPage) {
        showNoMorePosts(loadMoreBtn, btnDiv);
        return;
      }
    } catch (error) {
      console.error("Error loading posts", error);
      showNoMorePosts(loadMoreBtn, btnDiv);
    }
  }

  async function handleLoadMore() {
    currentPage++;
    await loadPosts(currentPage);
  }

  ({ btnDiv, loadMoreBtn } = createLoadMoreButton(handleLoadMore));
  blogContainer.insertAdjacentElement("afterend", btnDiv);

  loadPosts(currentPage);
});

import { getBlogPostsDetails } from "./api/apiCallPaginated.js";
import { getColourScheme } from "./helpers/getColourScheme.js";
import { renderThumbnails } from "./helpers/renderThumbnails.js";

let currentPage = 1;
const postsPerPage = 10;
const blogContainer = document.querySelector(".container-blog-posts");

async function loadPosts(page) {
  try {
    const blogData = await getBlogPostsDetails(page, postsPerPage);

    if (blogData.length === 0) {
      document.querySelector(".load-more-btn").style.display = "none";
      return;
    }

    const startIndex = (page - 1) * postsPerPage;
    blogData.forEach((post, index) => {
      const { colour, btnColour } = getColourScheme(startIndex + index);
      renderThumbnails(post, colour, btnColour, blogContainer);
    });
  } catch (error) {
    console.error("Error loading posts:", error);
  }
}

// Create and add the "Load More" button
const btnDiv = document.createElement("div");
btnDiv.className = "btnLoadMoreContainer";

const loadMoreBtn = document.createElement("button");
loadMoreBtn.textContent = "Load More Posts";
loadMoreBtn.classList.add("load-more-btn");
btnDiv.appendChild(loadMoreBtn);
blogContainer.insertAdjacentElement("afterend", btnDiv);

// Add click event listener to Load More button
loadMoreBtn.addEventListener("click", async () => {
  currentPage++;
  await loadPosts(currentPage);
});

// Initial load
loadPosts(currentPage);

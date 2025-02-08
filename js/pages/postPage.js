import { getPostDetails } from "../api/postAPI.js";
import { renderBlogPost } from "../helpers/blogPostRender.js";
import { displayError } from "../utils/errorHandler.js";

async function initPostPage() {
  try {
    const id = getPostIdFromUrl();
    if (!id) {
      throw new Error("No post ID provided");
    }

    const postData = await getPostDetails(id);
    renderBlogPost(postData);
  } catch (error) {
    console.error("Error loading post:", error);
    displayError("Sorry, we couldn't load this post.");
  }
}

function getPostIdFromUrl() {
  const queryString = document.location.search;
  const paramPostPage = new URLSearchParams(queryString);
  return paramPostPage.get("id");
}

initPostPage();

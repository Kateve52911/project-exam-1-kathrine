import { getPostsDetails } from "../api/apiCall.js";
import { API_URL } from "../api/constants.js";

async function initPostPage() {
  try {
    console.log("Full URL:", document.location.href);
    console.log("Search string:", document.location.search);
    const queryString = document.location.search;
    const paramPostPage = new URLSearchParams(queryString);
    const id = paramPostPage.get("id");

    if (!id) {
      throw new Error("No post ID provided");
    }

    const postURL = `${API_URL}/${id}`;
    const postData = await getPostsDetails(postURL);

    renderHTMLPost(postData);
  } catch (error) {
    console.error("Error loading post:", error);
    displayError("Sorry, we couldn't load this post.");
  }
}

function renderHTMLPost(post) {
  const blogPostContainer = document.querySelector(".postPage-container");

  const divPost = document.createElement("div");
  divPost.className = "post-container";

  const postTitle = document.createElement("h1");
  postTitle.className = "h1-postPage";
  postTitle.textContent = post.title.rendered;
  divPost.appendChild(postTitle);

  blogPostContainer.innerHTML = "";
  blogPostContainer.appendChild(divPost);
}

initPostPage();

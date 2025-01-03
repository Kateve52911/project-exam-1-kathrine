import { getBlogPostsDetails } from "../api/apiCall.js";
//import { renderBlogPosts } from "./renderBlogPosts.js";
import { parseHTMLContent } from "./parseHTMLContent.js";
import { extractElements } from "./extractParsedContent.js";
import { API_URL } from "../api/constants.js";

const blogData = await getBlogPostsDetails();
const blogContainer = document.querySelector(".container-blog-posts");

function renderThumbnails(blogData) {
  const thumbElement = document.createElement("div");
  thumbElement.classList.add("thumbnail");

  const thumbTitle = document.createElement("h2");
  thumbTitle.textContent = blogData.title.rendered;
  thumbElement.classList.add("thumb-title");
  thumbElement.appendChild(thumbTitle);

  const parsedContent = parseHTMLContent(blogData.content.rendered);

  const img = extractElements(parsedContent, "img");
  if (img.length > 0) {
    const firstImg = img[0];
    const thumbImg = document.createElement("img");
    thumbImg.src = firstImg.src;
    thumbElement.appendChild(thumbImg);
  }
  blogContainer.appendChild(thumbElement);
}

getBlogPostsDetails(API_URL).then((blogData) => {
  blogData.forEach((post) => {
    renderThumbnails(post); // Render each blog post
  });
});

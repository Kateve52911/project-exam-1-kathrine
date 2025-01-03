import { getBlogPostsDetails } from "../api/apiCall.js";
//import { renderBlogPosts } from "./renderBlogPosts.js";
import { parseHTMLContent } from "./parseHTMLContent.js";
import { API_URL } from "../api/constants.js";

const blogData = await getBlogPostsDetails();
const blogContainer = document.querySelector(".container-blog-posts");

function renderThumbnails(post, colour, btnColour) {
  const thumbElement = document.createElement("div");
  thumbElement.classList.add("thumbnail");
  thumbElement.classList.add(colour);

  const thumbTitle = document.createElement("h2");
  thumbTitle.textContent = post.title.rendered;
  thumbElement.classList.add("thumb-title");
  thumbElement.appendChild(thumbTitle);

  const parsedContent = parseHTMLContent(post.content.rendered);

  const img = parsedContent.querySelectorAll("img");
  if (img.length > 0) {
    const firstImg = img[0];
    const thumbImg = document.createElement("img");
    thumbImg.src = firstImg.src;
    thumbImg.classList.add("thumb-img");
    thumbElement.appendChild(thumbImg);
  }

  const thumbBtn = document.createElement("button");
  thumbBtn.classList.add("thumb-btn");
  thumbBtn.classList.add(btnColour);
  thumbBtn.textContent = "View Post";
  thumbElement.appendChild(thumbBtn);

  blogContainer.appendChild(thumbElement);
}

getBlogPostsDetails(API_URL).then((blogData) => {
  for (const [ind, post] of blogData.entries()) {
    let colour;
    let btnColour;

    if (ind % 4 === 0) {
      colour = "pink";
      btnColour = "darkRed";
    } else if (ind % 4 === 1) {
      colour = "darkBlue";
      btnColour = "blue";
    } else if (ind % 4 === 2) {
      colour = "blue";
      btnColour = "darkBlue";
    } else {
      colour = "default";
      btnColour = "default";
    }

    renderThumbnails(post, colour, btnColour);
  }
});

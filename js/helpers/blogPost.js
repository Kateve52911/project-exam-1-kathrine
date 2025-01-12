import { getPostsDetails } from "../api/apiCall.js";
import { API_URL } from "../api/constants.js";
import { parseHTMLContent } from "./parseHTMLContent.js";

async function initPostPage() {
  try {
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

  const divFlexSmall = document.createElement("div");
  divFlexSmall.className = "flex-container-small";

  const postTitle = document.createElement("h1");
  postTitle.className = "h1-postPage";
  postTitle.textContent = post.title.rendered;
  divPost.appendChild(postTitle);

  const paresedContent = parseHTMLContent(post.content.rendered);

  const subheading = paresedContent.querySelector("h2");
  subheading.className = "subheading-postPage";
  divPost.appendChild(subheading);

  const para = paresedContent.querySelectorAll("p");
  for (let i = 0; i < para.length; i++) {
    //console.log(para[i].innerHTML);
    const firstParagraph = para[0];
    console.log(firstParagraph);
    divPost.appendChild(firstParagraph);

    const paraFlex = para[1];
    console.log(paraFlex);
    divFlexSmall.appendChild(paraFlex);
  }

  const img = paresedContent.querySelectorAll("img");
  for (let i = 0; i < img.length; i++) {
    const imgForFlex = img[0];
    //imgForFlex.src = img[0].src;
    console.log(imgForFlex);
    divFlexSmall.appendChild(imgForFlex);
  }
  divPost.appendChild(divFlexSmall);

  //console.log(para);

  blogPostContainer.innerHTML = "";
  blogPostContainer.appendChild(divPost);
}

initPostPage();

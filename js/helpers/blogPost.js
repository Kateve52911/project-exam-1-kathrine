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
  divFlexSmall.classList.add("third");

  const postTitle = document.createElement("h1");
  postTitle.className = "h1-postPage";
  postTitle.textContent = post.title.rendered;
  postTitle.classList.add("zero");
  divPost.appendChild(postTitle);

  const paresedContent = parseHTMLContent(post.content.rendered);

  const subheading = paresedContent.querySelector("h2");
  subheading.className = "subheading-postPage";
  subheading.classList.add("first");
  divPost.appendChild(subheading);

  const para = paresedContent.querySelectorAll("p");
  if (para.length > 0) {
    //console.log(para[i].innerHTML);
    const firstParagraph = para[0];
    firstParagraph.className = "second";
    divPost.appendChild(firstParagraph);

    if (para.length > 1) {
      const paraFlex = para[1];
      divFlexSmall.appendChild(paraFlex);
    }

    const remainingPara = Array.from(para).slice(2);
    remainingPara.className = "fourth";
    remainingPara.forEach((p) => {
      p.className = "fourth"; // Assign "second" class only to remaining paragraphs
      divPost.appendChild(p); // Append these paragraphs to divPost
    });
  }

  const img = paresedContent.querySelectorAll("img");
  for (let i = 0; i < img.length; i++) {
    const imgForFlex = img[0];
    divFlexSmall.appendChild(imgForFlex);

    const templeImg = img[1];
    templeImg.className = "temple-image";
    templeImg.classList.add("fifth");
    divPost.appendChild(templeImg);
  }
  divPost.appendChild(divFlexSmall);

  //console.log(para);

  blogPostContainer.innerHTML = "";
  blogPostContainer.appendChild(divPost);
}

initPostPage();

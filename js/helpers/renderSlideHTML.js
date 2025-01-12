import { getPostsDetails } from "../api/apiCall.js";
import { parseHTMLContent } from "./parseHTMLContent.js";

const postData = await getPostsDetails();

export function createCarouselHTML(posts) {
  const carouselContainer = document.createElement("div");
  carouselContainer.className = "carousel-container";

  const carousel = document.createElement("div");
  carousel.className = "carousel";

  const recentPosts = posts.slice(0, 4);

  recentPosts.forEach((post, index) => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";
    //slide.classList.add(colour);
    slide.style.display = index === 0 ? "block" : "none";

    const postCard = (document.createElement = "a");
    postCard.className = "post-card";
    // postCard.href =

    const parsedContent = parseHTMLContent(post.content.rendered);
    const img = parsedContent.querySelectorAll("img");

    const postImg = document.createElement("img");
    if (img.length > 0) {
      postImg.src = img[0].src;
    } else {
      postImg.src = "placeholder-image.jpg";
    }
    postImg.alt = img[0].alt;
    postImg.className = "post-img";

    const postTitle = document.createElement("h2");
  });
}

console.log("dingus");

const sliderTtile = document.createElement("h2");
sliderTtile.textContent = post.title.rendered;
sliderTtile.classList.add("slider-title");
slider.appendChild(sliderTtile);

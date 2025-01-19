import { getPostsDetails } from "../api/apiCall.js";
import { API_URL } from "../api/constants.js";
import { parseHTMLContent } from "./parseHTMLContent.js";

const postData = await getPostsDetails();

const blogContainer = document.querySelector(".carouselContainer-index");
let currentSlide = 0;

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

    const postCard = document.createElement("a");
    postCard.className = "post-card";
    postCard.href = `postPage.html?id=${post.id}`;

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
    postTitle.className = "post-title-carousel";
    postTitle.textContent = post.title.rendered;

    postCard.appendChild(postImg);
    postCard.appendChild(postTitle);

    slide.appendChild(postCard);

    carousel.appendChild(slide);
  });

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "<";
  prevBtn.className = "carousel-btn prev";

  const nextBtn = document.createElement("button");
  nextBtn.textContent = ">";
  nextBtn.className = "carousel-btn next";

  const dotsContainer = document.createElement("div");
  dotsContainer.className = "carousel-dots";

  recentPosts.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.className = `dot ${index === 0 ? "active" : ""}`;
    dot.dataset.slide = index;
    dotsContainer.appendChild(dot);
  });

  carouselContainer.appendChild(prevBtn);
  carouselContainer.appendChild(carousel);
  carouselContainer.appendChild(nextBtn);
  carouselContainer.appendChild(dotsContainer);

  return carouselContainer;
}

function showSlide(slideIndex) {
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".dot");

  if (slideIndex >= slides.length) currentSlide = 0;
  if (slideIndex < 0) currentSlide = slides.length - 1;

  slides.forEach((slide) => (slide.style.display = "none"));
  dots.forEach((dot) => dot.classList.remove("active"));

  slides[currentSlide].style.display = "block";
  dots[currentSlide].classList.add("active");
}

function initializeCarousel() {
  const container = document.querySelector(".carousel-container");

  // Next/Prev button handlers
  container.querySelector(".next").addEventListener("click", () => {
    currentSlide++;
    showSlide(currentSlide);
  });

  container.querySelector(".prev").addEventListener("click", () => {
    currentSlide--;
    showSlide(currentSlide);
  });

  // Dot indicator handlers
  container.querySelectorAll(".dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      currentSlide = parseInt(dot.dataset.slide);
      showSlide(currentSlide);
    });
  });

  // Optional: Auto-play
  setInterval(() => {
    currentSlide++;
    showSlide(currentSlide);
  }, 5000); // Change slide every 5 seconds
}

// Initialize everything
async function init() {
  const posts = await getPostsDetails(API_URL);
  if (posts.length > 0) {
    const carousel = createCarouselHTML(posts);
    blogContainer.appendChild(carousel);
    initializeCarousel();
  }
}

init();

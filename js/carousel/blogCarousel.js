import { getBlogPostsDetails } from "../api/apiCallPaginated.js";
import { parseHTMLContent } from "../helpers/parseHTMLContent.js";
import { displayError } from "../utils/errorHandler.js";
import { getColourScheme } from "../helpers/getColourScheme.js";
import { CAROUSEL_CONFIG, SELECTORS, CLASSES } from "./config.js";

export class BlogCarousel {
  constructor(containerSelector, config = {}) {
    this.config = {
      ...CAROUSEL_CONFIG,
      ...config,
    };
    this.selectors = SELECTORS;
    this.classes = CLASSES;

    this.currentSlide = 0;
    this.autoPlayInterval = null;
    this.container = document.querySelector(containerSelector);

    if (!this.container) {
      throw new Error("Blog container.not found");
    }
  }

  async initialize() {
    try {
      const posts = await this.fetchPosts();
      if (!posts || posts.length === 0) {
        throw new Error("No posts found");
      }

      const carousel = this.createCarouselHTML(posts);
      if (!carousel) {
        throw new Error("Failed to create carousel HTML");
      }

      this.container.appendChild(carousel);
      this.setupEventListeners(carousel);
      this.startAutoPlay();
    } catch (error) {
      displayError("Failed to initialize carousel");
    }
  }

  async fetchPosts() {
    try {
      // Pass page and perPage parameters instead of the URL
      return await getBlogPostsDetails(1, this.config.maxSlides);
    } catch (error) {
      console.error("Error in fetchPosts:", error);
      throw error;
    }
  }

  createCarouselHTML(posts) {
    try {
      if (!Array.isArray(posts) || posts.length === 0) {
        throw new Error("No valid posts data provided");
      }

      const carouselContainer = this.createElement(
        "div",
        this.classes.container
      );
      const carousel = this.createElement("div", this.classes.carousel);

      const recentPosts = posts.slice(0, this.config.maxSlides);
      const slides = recentPosts.map((post, index) =>
        this.createSlide(post, index)
      );

      carousel.append(...slides);

      const { prevBtn, nextBtn } = this.createNavigationButtons();
      const dotsContainer = this.createDotIndicators(recentPosts.length);

      carouselContainer.append(prevBtn, carousel, nextBtn, dotsContainer);
      return carouselContainer;
    } catch (error) {
      displayError("Error creating carousel: " + error.message);
      return null;
    }
  }

  createElement(tag, className, textContent = "") {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
  }

  createSlide(post, index) {
    const slide = this.createElement("div", this.classes.slide);
    slide.style.display = index === 0 ? "block" : "none";
    const postCard = this.createPostCard(post, index);
    slide.appendChild(postCard);
    return slide;
  }

  createPostCard(post, index) {
    const postCard = this.createElement("a", this.classes.postCard);
    postCard.href = `postpage.html?id=${post.id}`;

    const scheme = getColourScheme(index);
    postCard.classList.add(`bg-${scheme.colour}`);

    const parsedContent = parseHTMLContent(post.content.rendered);
    const postImg = this.createPostImage(parsedContent);
    const postTitle = this.createElement(
      "h2",
      this.classes.postTitle,
      post.title.rendered
    );

    postCard.append(postImg, postTitle);
    return postCard;
  }

  createPostImage(parsedContent) {
    const images = parsedContent.querySelectorAll("img");
    const postImg = this.createElement("img", this.classes.postImage);

    if (images.length > 0) {
      postImg.src = images[0].src;
      postImg.alt = images[0].alt;
    } else {
      postImg.src = this.config.defaultImagePath;
      postImg.alt = "Placeholder image";
    }

    return postImg;
  }

  createNavigationButtons() {
    const prevBtn = this.createElement(
      "button",
      `${this.classes.button} prev`,
      "<"
    );
    const nextBtn = this.createElement(
      "button",
      `${this.classes.button} next`,
      ">"
    );
    return { prevBtn, nextBtn };
  }

  createDotIndicators(numberOfSlides) {
    const dotsContainer = this.createElement("div", this.classes.dots);
    for (let i = 0; i < numberOfSlides; i++) {
      const dot = this.createElement(
        "span",
        `dot ${i === 0 ? this.classes.activeDot : ""}`
      );
      dot.dataset.slide = i;
      dotsContainer.appendChild(dot);
    }
    return dotsContainer;
  }

  updateSlideVisibility() {
    try {
      const slides = document.querySelectorAll(this.selectors.slide);
      const dots = document.querySelectorAll(this.selectors.dot);

      if (!slides.length || !dots.length) {
        throw new Error("Carousel elements not found");
      }

      if (this.currentSlide >= slides.length) this.currentSlide = 0;
      if (this.currentSlide < 0) this.currentSlide = slides.length - 1;

      slides.forEach((slide) => (slide.style.display = "none"));
      slides[this.currentSlide].style.display = "block";

      dots.forEach((dot) => dot.classList.remove(this.classes.activeDot));
      dots[this.currentSlide].classList.add(this.classes.activeDot);
    } catch (error) {
      displayError("Error updating slide: " + error.message);
    }
  }

  setupEventListeners(container) {
    try {
      const nextButton = container.querySelector(this.selectors.nextButton);
      const prevButton = container.querySelector(this.selectors.prevButton);
      const dots = container.querySelectorAll(this.selectors.dot);

      if (!nextButton || !prevButton) {
        throw new Error("Navigation buttons not found");
      }

      nextButton.addEventListener("click", () => {
        this.currentSlide++;
        this.updateSlideVisibility();
      });

      prevButton.addEventListener("click", () => {
        this.currentSlide--;
        this.updateSlideVisibility();
      });

      dots.forEach((dot) => {
        dot.addEventListener("click", () => {
          this.currentSlide = parseInt(dot.dataset.slide);
          this.updateSlideVisibility();
        });
      });
    } catch (error) {
      displayError("Error setting up controls: " + error.message);
    }
  }

  startAutoPlay() {
    try {
      this.autoPlayInterval = setInterval(() => {
        this.currentSlide++;
        this.updateSlideVisibility();
      }, this.config.slideDuration);
    } catch (error) {
      displayError("Error in autoplay: ", error.message);
    }
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
}

import { getBlogPostsDetails } from "../api/apiCall.js";

const blogData = await getBlogPostsDetails();
const blogContainer = document.querySelector(".container-blog-posts");

function createBlogThumbnails(blogData) {
  for (let i = 0; i < blogData.length; i++) {
    const parser = new DOMParser();
    const parsedContent = parser.parseFromString(
      blogData[i].content.rendered,
      "text/html"
    );

    console.log(parsedContent);
  }
}

createBlogThumbnails(blogData);

// createBlogThumbnails(blogData);

function createHTMLThumbnails(tag) {}

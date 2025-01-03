import { getBlogPostsDetails } from "../api/apiCall.js";

const blogData = await getBlogPostsDetails();

export function renderBlogPosts(blogData) {
  blogData.forEach((post) => {
    renderBlogPosts(post);
  });
}

import { API_URL } from "./constants.js";

const blogContainer = document.querySelector(".container-blog-posts");
export async function getBlogPostsDetails(apiURL = API_URL) {
  const response = await fetch(apiURL);
  const blogData = await response.json();
  return blogData;
}

console.log(getBlogPostsDetails());

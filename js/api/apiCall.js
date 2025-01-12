import { API_URL } from "./constants.js";

export async function getPostsDetails(apiURL = API_URL) {
  try {
    const response = await fetch(apiURL);
    const blogData = await response.json();
    return blogData;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

//console.log(getPostsDetails());

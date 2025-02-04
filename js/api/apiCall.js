import { API_URL } from "./constants.js";

export async function getPostsDetails(apiURL = API_URL) {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const blogData = await response.json();
    return blogData;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error; // Throwing error instead of returning empty array to handle it in UI
  }
}

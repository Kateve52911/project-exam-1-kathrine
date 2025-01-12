import { API_URL } from "./constants.js";

export async function getBlogPostsDetails(page = 1, perPage = 10) {
  const paginatedURL = `${API_URL}?page=${page}&per_page=${perPage}`;

  try {
    const response = await fetch(paginatedURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }
}

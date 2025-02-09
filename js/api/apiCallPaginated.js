import { API_URL } from "./constants.js";
// import { updatePostsData } from "../search/search.js";

// export async function getBlogPostsDetails(page = 1, perPage = 10) {
//   const paginatedURL = `${API_URL}?page=${page}&per_page=${perPage}`;
//   try {
//     const response = await fetch(paginatedURL);
//     if (!response.ok) {
//       throw new Error(`Failed to fetch posts (${response.status})`);
//     }

//     const posts = await response.json();
//     updatePostsData(posts);
//     return posts;
//   } catch (error) {
//     console.error("Error fetching blog posts:", error);
//     throw error;
//   }
// }

import { updatePostsData } from "../search/search.js";

export async function getBlogPostsDetails(page = 1, perPage = 10) {
  const paginatedURL = `${API_URL}?page=${page}&per_page=${perPage}`;

  try {
    const response = await fetch(paginatedURL);
    if (!response.ok) {
      throw new Error(`Failed to fetch posts (${response.status})`);
    }

    const posts = await response.json();

    updatePostsData(posts);
    return posts;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }
}

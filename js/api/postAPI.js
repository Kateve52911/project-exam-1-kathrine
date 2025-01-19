// import { getBlogPostsDetails } from "./apiCallPaginated.js";
// import { API_URL } from "./constants.js";

// export async function getPostDetails(id) {
//   const postURL = `${API_URL}/${id}`;
//   return await getBlogPostsDetails(postURL);
// }

import { getPostsDetails } from "./apiCall.js";
import { API_URL } from "./constants.js";

export async function getPostDetails(id) {
  const postURL = `${API_URL}/${id}`;
  return await getPostsDetails(postURL);
}

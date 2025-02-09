import { getTagId } from "../helpers/getTagId.js";

export async function getPostsDetailsByTag(tagName) {
  const tagId = await getTagId(tagName);
  if (!tagId) {
    console.error(`Tag "${tagName}" not found.`);
    return [];
  }
  const response = await fetch(
    `https://www.kateve52911.com/wp-json/wp/v2/posts?tags=${tagId}`
  );
  return response.json();
}

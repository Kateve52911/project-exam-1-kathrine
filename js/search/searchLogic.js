import { getAllPosts } from "./searchState.js";

export function filterPosts(searchTerm) {
  const posts = getAllPosts();
  if (!searchTerm) return posts;

  return posts.filter((post) => {
    try {
      if (!post?.title?.rendered || !post?.content?.rendered) {
        return false;
      }

      const title = post.title.rendered.toLowerCase();
      const content = post.content.rendered.toLowerCase();
      const searchLower = searchTerm.toLowerCase();

      return title.includes(searchLower) || content.includes(searchLower);
    } catch (error) {
      console.error("Error processing post:", error);
      return false;
    }
  });
}

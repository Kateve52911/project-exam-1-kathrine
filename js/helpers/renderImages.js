import { getBlogPostsDetails } from "../api/apiCall.js";

async function main() {
  try {
    // Fetch the blog posts (an array of posts)
    const imgDataArray = await getBlogPostsDetails();
    console.log("API Response:", imgDataArray); // Log to verify the structure

    // Loop through each post and extract image URLs
    imgDataArray.forEach((postData) => {
      if (postData.content && postData.content.rendered) {
        // Extract image URLs from the content
        const imageUrls = extractImgUrls(postData.content.rendered);
        console.log(`Image URLs for post ID ${postData.id}:`, imageUrls);
      } else {
        console.warn(`Post ID ${postData.id} has no content or rendered HTML.`);
      }
    });
  } catch (error) {
    console.error("Error fetching or processing blog post details:", error);
  }
}

// Function to extract image URLs using a regular expression
export function extractImgUrls(html) {
  const imgTagRegex = /<img [^>]*src="([^"]+)"/g;
  const imageUrls = [];
  let match;

  while ((match = imgTagRegex.exec(html)) !== null) {
    imageUrls.push(match[1]); // Push the src value to the array
  }

  return imageUrls;
}

// Call the main function
main();

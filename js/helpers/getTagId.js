export async function getTagId(tagName) {
  const response = await fetch(
    `https://www.kateve52911.com/wp-json/wp/v2/tags?search=${tagName}`
  );
  const tags = await response.json();
  return tags.length > 0 ? tags[0].id : null;
}

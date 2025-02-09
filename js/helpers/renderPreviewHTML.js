export function createPostPreviewFrontPage(post) {
  const previewContainer = document.createElement("div");
  previewContainer.className = "preview-container";

  const postPreview = document.createElement("div");
  postPreview.classList.add("post-preview");

  const postTitle = document.createElement("h2");
  postTitle.textContent = post.title.rendered;
  postTitle.classList.add("preview-title");
  postPreview.appendChild(postTitle);

  const postExcerpt = document.createElement("p");
  postExcerpt.innerHTML = post.excerpt.rendered; // Use innerHTML to keep formatting
  postExcerpt.classList.add("post-excerpt");
  postPreview.appendChild(postExcerpt);

  const previewButton = document.createElement("button");
  previewButton.textContent = "Read more";
  previewButton.classList.add("preview-button");
  previewButton.addEventListener("click", () => {
    window.location.href = `postPage.html?id=${post.id}`; // Navigate on click
  });
  postPreview.appendChild(previewButton);

  previewContainer.appendChild(postPreview);

  return previewContainer; // ✅ Ensure this returns a DOM element
}

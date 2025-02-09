let allPosts = [];
let currentSearchTerm = "";

export function getSearchTerm() {
  return currentSearchTerm;
}

export function setSearchTerm(term) {
  currentSearchTerm = term.toLowerCase();
}

export function getAllPosts() {
  return allPosts;
}

export function updatePosts(posts) {
  if (Array.isArray(posts)) {
    allPosts = posts;
  } else {
    allPosts = [];
  }
}

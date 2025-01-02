document.addEventListener("DOMContentLoaded", () => {
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const menu = document.querySelector(".menu");

  hamburgerIcon.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
});

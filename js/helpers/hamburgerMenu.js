document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");
  const closeIcon = document.querySelector(".closeIcon");
  const menuIcon = document.querySelector(".menuIcon");

  closeIcon.style.display = "none";

  hamburger.addEventListener("click", () => {
    menu.classList.toggle("open");
    const isOpen = menu.classList.contains("open");

    menuIcon.style.display = isOpen ? "none" : "block";
    closeIcon.style.display = isOpen ? "block" : "none";
  });
});

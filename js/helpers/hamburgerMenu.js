document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");
  const closeIcon = document.querySelector(".closeIcon");
  const menuIcon = document.querySelector(".menuIcon");

  hamburger.addEventListener("click", () => {
    menu.classList.toggle("open"); // Toggles visibility of menu
    const isOpen = menu.classList.contains("open");

    // Toggle icons
    menuIcon.style.display = isOpen ? "none" : "block";
    closeIcon.style.display = isOpen ? "block" : "none";
  });
});

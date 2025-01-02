document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");
  const closeIcon = document.querySelector(".closeIcon");
  const menuIcon = document.querySelector(".menuIcon");

  // Set initial state
  closeIcon.style.display = "none"; // Hide close icon initially

  hamburger.addEventListener("click", () => {
    menu.classList.toggle("open"); // Toggles visibility of menu
    const isOpen = menu.classList.contains("open");

    // Toggle icons
    menuIcon.style.display = isOpen ? "none" : "block"; // Show menu icon if menu is closed
    closeIcon.style.display = isOpen ? "block" : "none"; // Show close icon if menu is open
  });
});

export function createImageModal() {
  const modalHTM = `
    <div  id="imageModal" class="modal">
        <img id="modalImage" class="modal-content">
        </div>`;

  document.body.insertAdjacentHTML("beforeend", modalHTM);

  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("show");
    }
  });

  return {
    openModal: (imgSrc) => {
      modalImg.src = imgSrc;
      modal.classList.add("show");
    },
  };
}

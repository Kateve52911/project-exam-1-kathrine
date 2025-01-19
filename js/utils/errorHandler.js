export function displayError(message) {
  // Remove any existing error messages
  removeExistingErrors();

  // Create error container
  const errorContainer = document.createElement("div");
  errorContainer.className = "error-message";

  // Create error content
  const errorContent = document.createElement("div");
  errorContent.className = "error-content";

  // Add error icon
  const errorIcon = document.createElement("span");
  errorIcon.innerHTML = "⚠️";
  errorIcon.className = "error-icon";

  // Add error text
  const errorText = document.createElement("p");
  errorText.textContent = message;

  // Add close button
  const closeButton = document.createElement("button");
  closeButton.innerHTML = "×";
  closeButton.className = "error-close";
  closeButton.addEventListener("click", () => errorContainer.remove());

  // Assemble the error message
  errorContent.appendChild(errorIcon);
  errorContent.appendChild(errorText);
  errorContent.appendChild(closeButton);
  errorContainer.appendChild(errorContent);

  // Add to page
  document.body.appendChild(errorContainer);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (errorContainer.parentNode) {
      errorContainer.remove();
    }
  }, 5000);
}

function removeExistingErrors() {
  const existingErrors = document.querySelectorAll(".error-message");
  existingErrors.forEach((error) => error.remove());
}

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    // Stop the form from submitting and refreshing the page
    event.preventDefault();

    // Perform the validation checks
    if (validateForm()) {
      alert("Form submitted successfully!");
      // Optionally, submit the form programmatically here
      // event.target.submit();
    }
  });

function validateForm() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Validate name length
  if (name.length < 5) {
    alert("Name must be at least 5 characters long.");
    return false;
  }

  // Validate subject length
  if (subject.length < 16) {
    alert("Subject must be at least 16 characters long.");
    return false;
  }

  // Validate message length
  if (message.length < 25) {
    alert("Message must be at least 25 characters long.");
    return false;
  }

  // Validate email format (using a simple regex for basic validation)
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  // If all validations pass
  return true;
}

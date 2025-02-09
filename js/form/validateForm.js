document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateForm()) {
      alert("Form submitted successfully!");
    }
  });

function validateForm() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  if (name.length < 5) {
    alert("Name must be at least 5 characters long.");
    return false;
  }

  if (subject.length < 16) {
    alert("Subject must be at least 16 characters long.");
    return false;
  }

  if (message.length < 25) {
    alert("Message must be at least 25 characters long.");
    return false;
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  return true;
}

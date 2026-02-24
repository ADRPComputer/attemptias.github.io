const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("primaryNav");
const enquiryForm = document.getElementById("enquiryForm");
const formStatus = document.getElementById("formStatus");
const yearSpan = document.getElementById("year");

if (yearSpan) {
  yearSpan.textContent = String(new Date().getFullYear());
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (enquiryForm && formStatus) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const course = document.getElementById("course");

    if (!name || !phone || !email || !course) {
      return;
    }

    const phoneValue = phone.value.trim();
    const phoneValid = /^[0-9]{10}$/.test(phoneValue);
    const formValid = enquiryForm.checkValidity() && phoneValid;

    if (!formValid) {
      formStatus.textContent = "Please enter valid details before submitting.";
      formStatus.style.color = "#b00020";
      return;
    }

    formStatus.textContent = "Thank you! Your enquiry has been recorded. We will contact you soon.";
    formStatus.style.color = "#1f6f2d";
    enquiryForm.reset();
  });
}

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
  const name = document.getElementById("name");
  const phone = document.getElementById("phone");
  const email = document.getElementById("email");
  const course = document.getElementById("course");
  const message = document.getElementById("message");

  const fieldMap = [
    { input: name, error: document.getElementById("nameError") },
    { input: phone, error: document.getElementById("phoneError") },
    { input: email, error: document.getElementById("emailError") },
    { input: course, error: document.getElementById("courseError") }
  ];

  const setFieldError = (input, errorElement, errorMessage) => {
    if (!input || !errorElement) {
      return;
    }

    input.classList.add("field-invalid");
    errorElement.textContent = errorMessage;
  };

  const clearFieldError = (input, errorElement) => {
    if (!input || !errorElement) {
      return;
    }

    input.classList.remove("field-invalid");
    errorElement.textContent = "";
  };

  const validateField = (input, errorElement) => {
    if (!input || !errorElement) {
      return true;
    }

    const value = input.value.trim();

    if (input.id === "name") {
      if (!value) {
        setFieldError(input, errorElement, "Please enter your full name.");
        return false;
      }
      clearFieldError(input, errorElement);
      return true;
    }

    if (input.id === "phone") {
      if (!value) {
        setFieldError(input, errorElement, "Please enter your phone number.");
        return false;
      }
      if (!/^[0-9]{10}$/.test(value)) {
        setFieldError(input, errorElement, "Phone number must be exactly 10 digits.");
        return false;
      }
      clearFieldError(input, errorElement);
      return true;
    }

    if (input.id === "email") {
      if (!value) {
        setFieldError(input, errorElement, "Please enter your email address.");
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setFieldError(input, errorElement, "Please enter a valid email address.");
        return false;
      }
      clearFieldError(input, errorElement);
      return true;
    }

    if (input.id === "course") {
      if (!value) {
        setFieldError(input, errorElement, "Please select a course.");
        return false;
      }
      clearFieldError(input, errorElement);
      return true;
    }

    clearFieldError(input, errorElement);
    return true;
  };

  fieldMap.forEach(({ input, error }) => {
    if (!input || !error) {
      return;
    }

    const eventName = input.tagName === "SELECT" ? "change" : "input";
    input.addEventListener(eventName, () => {
      validateField(input, error);
      if (formStatus.style.color === "rgb(176, 0, 32)") {
        formStatus.textContent = "";
      }
    });
  });

  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!name || !phone || !email || !course) {
      return;
    }

    const validationResults = fieldMap.map(({ input, error }) => validateField(input, error));
    const formValid = validationResults.every(Boolean);

    if (!formValid) {
      formStatus.textContent = "Please correct the highlighted fields.";
      formStatus.style.color = "#b00020";
      const firstInvalid = fieldMap.find(({ input }) => input && input.classList.contains("field-invalid"));
      if (firstInvalid && firstInvalid.input) {
        firstInvalid.input.focus();
      }
      return;
    }

    const phoneValue = phone.value.trim();
    const enquiryMessage = [
      "New Course Enquiry",
      `Name: ${name.value.trim()}`,
      `Phone: ${phoneValue}`,
      `Email: ${email.value.trim()}`,
      `Course: ${course.value}`,
      `Message: ${message ? message.value.trim() || "N/A" : "N/A"}`
    ].join("\n");

    const whatsappUrl = `https://wa.me/916001056594?text=${encodeURIComponent(enquiryMessage)}`;

    formStatus.innerHTML = `Redirecting to WhatsApp with your enquiry details... If it does not open, <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer">click here</a>.`;
    formStatus.style.color = "#1f6f2d";
    window.open(whatsappUrl, "_blank", "noopener");
    enquiryForm.reset();
    fieldMap.forEach(({ input, error }) => clearFieldError(input, error));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signUpForm");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm_password");
  const errorMsg = document.getElementById("error-msg");

  // Shift focus on pressing Enter key
  form.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const formElements = Array.from(form.elements).filter(
        (el) => el.tagName === "INPUT"
      );
      const currentIndex = formElements.indexOf(document.activeElement);
      if (currentIndex >= 0 && currentIndex < formElements.length - 1) {
        formElements[currentIndex + 1].focus();
      } else if (currentIndex === formElements.length - 1) {
        form.submit();
      }
    }
  });

  // Form validation for password match
  form.addEventListener("submit", (e) => {
    if (password.value !== confirmPassword.value) {
      e.preventDefault();
      errorMsg.textContent = "Passwords do not match";
      confirmPassword.focus();
    } else {
      errorMsg.textContent = "";
      // If no error, form gets submitted
    }
  });
});

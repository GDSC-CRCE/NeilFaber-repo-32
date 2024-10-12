document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

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
});

function goToSignUp() {
  window.location.href = "/sign-up";
}

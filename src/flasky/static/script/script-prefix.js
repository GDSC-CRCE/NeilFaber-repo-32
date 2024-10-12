"use strict";

// modal variables
const modal = document.querySelector("[data-modal]");
const modalCloseBtn = document.querySelector("[data-modal-close]");
const modalCloseOverlay = document.querySelector("[data-modal-overlay]");

// modal function
const modalCloseFunc = function () {
  modal.classList.add("closed");
};

// notification toast variables
const notificationToast = document.querySelector("[data-toast]");
const toastCloseBtn = document.querySelector("[data-toast-close]");

// notification toast eventListener

// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll(
  "[data-mobile-menu-open-btn]"
);
const mobileMenu = document.querySelectorAll("[data-mobile-menu]");
const mobileMenuCloseBtn = document.querySelectorAll(
  "[data-mobile-menu-close-btn]"
);
const overlay = document.querySelector("[data-overlay]");

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {
  // mobile menu function
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove("active");
    overlay.classList.remove("active");
  };

  mobileMenuOpenBtn[i].addEventListener("click", function () {
    mobileMenu[i].classList.add("active");
    overlay.classList.add("active");
  });

  mobileMenuCloseBtn[i].addEventListener("click", mobileMenuCloseFunc);
  overlay.addEventListener("click", mobileMenuCloseFunc);
}

// accordion variables
const accordionBtn = document.querySelectorAll("[data-accordion-btn]");
const accordion = document.querySelectorAll("[data-accordion]");

for (let i = 0; i < accordionBtn.length; i++) {
  accordionBtn[i].addEventListener("click", function () {
    const clickedBtn = this.nextElementSibling.classList.contains("active");

    for (let i = 0; i < accordion.length; i++) {
      if (clickedBtn) break;

      if (accordion[i].classList.contains("active")) {
        accordion[i].classList.remove("active");
        accordionBtn[i].classList.remove("active");
      }
    }

    this.nextElementSibling.classList.toggle("active");
    this.classList.toggle("active");
  });
}

async function intialiseBonus() {
  var bonusValue = document.getElementById("bonus");
  try {
    // Await the fetch call
    const response = await fetch("/bonus/get");

    // Check if the response is okay (status in the range 200-299)
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }

    // Await the response to JSON
    const data = await response.json();

    // Check for errors in the data
    if (data.error) {
      bonusValue.innerHTML = "Bonus: " + "??";
    } else {
      bonusValue.innerHTML = "Bonus: " + data;
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    displayNoProducts();
  }
}
intialiseBonus();

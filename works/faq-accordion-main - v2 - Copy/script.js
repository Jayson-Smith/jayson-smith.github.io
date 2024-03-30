"use strict";
const parent = document.querySelector(".accordion-container");

parent.addEventListener("click", function (e) {
  const clicked = e.target.closest(".accordion-item");

  // guard clause
  if (!clicked) return;

  const panel = clicked.querySelector(".accordion-panel");
  const header = clicked.querySelector(".accordion-header");
  header.classList.toggle("active");
  panel.classList.toggle("panel-opened");
});

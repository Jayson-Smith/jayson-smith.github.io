window.addEventListener("resize", function () {
  const editor = document.getElementById("editor");
  const laptop = document.getElementById("laptop");
  const screenWidth = window.innerWidth;

  if (screenWidth <= 1180) {
    editor.src = "/images/illustration-editor-mobile.svg";
    laptop.src = "/images/illustration-laptop-mobile.svg";
  } else {
    editor.src = "/images/illustration-editor-desktop.svg";
    laptop.src = "/images/illustration-laptop-desktop.svg";
  }
});

const mobileMenuBtn = document.querySelector(".hamburger");
const navContainer = document.querySelector(".nav-container-mobile");
const navContents = document.querySelectorAll(".nav-content-mobile");

mobileMenuBtn.addEventListener("click", toggleNavShow);

navContainer.addEventListener("click", handleNavContentClick);

function toggleNavShow() {
  navContainer.classList.toggle("show");
  mobileMenuBtn.src = navContainer.classList.contains("show")
    ? "/images/icon-close.svg"
    : "/images/icon-hamburger.svg";
}

function handleNavContentClick(e) {
  const navClick = e.target.closest(".nav-content-mobile");

  if (!navClick) return;

  navClick.classList.toggle("active-mobile");

  navContents.forEach((navContent) => {
    if (
      navContent !== navClick &&
      navContent.classList.contains("active-mobile")
    ) {
      navContent.classList.remove("active-mobile");
    }
  });
}

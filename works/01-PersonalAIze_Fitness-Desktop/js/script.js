///////////////////////////////////////////////////////////
// Set current year

///////////////////////////////////////////////////////////
// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// sticky nav bar

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);
    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    //in the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// MEAL SLIDESHOW

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("gallery-item");
  const dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" dot-active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " dot-active";
}

///////////////////////////////////////////////////////////
// TESTIMONIAL

const imageContainers = document.querySelectorAll(".img-container");
const testimonialBoxes = document.querySelectorAll(".testimonial-text-box");

imageContainers.forEach((container) => {
  container.addEventListener("click", () => {
    // Get the data-testimonial-id attribute of the clicked image container
    const testimonialId = container.getAttribute("data-testimonial-id");

    // Remove active class from all image containers and testimonial boxes
    imageContainers.forEach((c) => c.classList.remove("testimonial-active"));
    testimonialBoxes.forEach((box) => box.classList.remove("ttb-show"));

    // Add active class to clicked image container and show corresponding testimonial box
    container.classList.add("testimonial-active");
    document.getElementById(testimonialId).classList.add("ttb-show");
  });
});

///////////////////////////////////////////////////////////
// Pricing change

function check() {
  const checkBox = document.getElementById("checkbox");
  const month = document.getElementsByClassName("month");
  const year = document.getElementsByClassName("year");

  for (let i = 0; i < month.length; i++) {
    if (checkBox.checked == true) {
      month[i].style.display = "none";
      year[i].style.display = "block";
    } else if (checkBox.checked == false) {
      month[i].style.display = "block";
      year[i].style.display = "none";
    }
  }
}
check();

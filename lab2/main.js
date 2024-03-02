const slides = document.querySelector(".slides");
const slidesImages = document.querySelectorAll(".slides img");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");
const activeDot = document.querySelector(".bottomButtons .active");
const dots = document.querySelectorAll(".bottomButtons button");

let currentSlide = 0;

function updateSlide() {
  if (currentSlide < 0) {
    currentSlide = slidesImages.length - 1;
  } else if (currentSlide >= slidesImages.length) {
    currentSlide = 0;
  }
  slides.style.transform = `translateX(${-600 * currentSlide}px)`;

  const activeDot = document.querySelector(".bottomButtons .active");
  if (activeDot) {
    activeDot.classList.remove("active");
  }

  dots[currentSlide].classList.add("active");
}

function changeSlide(dot) {
  currentSlide = dot;
  updateSlide();
}

function nextSlide() {
  currentSlide++;
  updateSlide();
}

function prevSlide() {
  currentSlide--;
  updateSlide();
}

nextButton.addEventListener("click", () => {
  nextSlide();
});

prevButton.addEventListener("click", () => {
  prevSlide();
});

setInterval(nextSlide, 3000);

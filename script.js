let arrowLeft = document.getElementById("arrowLeft");
let arrowRight = document.getElementById("arrowRight");
let currentIndex = 0;
let sliderContainer = document.querySelectorAll("#slider-container img");

arrowLeft.addEventListener("click", () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = sliderContainer.length - 1;
  }
  sliderContainer.forEach((img, index) => {
    img.style.opacity = index === currentIndex ? "1" : "0";
  });
});

arrowRight.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex >= sliderContainer.length) {
    currentIndex = 0;
  }
  sliderContainer.forEach((img, index) => {
    img.style.opacity = index === currentIndex ? "1" : "0";
  });
});

setInterval(() => {
  currentIndex++;
  if (currentIndex >= sliderContainer.length) {
    currentIndex = 0;
  }
  sliderContainer.forEach((img, index) => {
    img.style.opacity = index === currentIndex ? "1" : "0";
  });
}, 3000);
////////////////////////////////////////////////////////////////////////////////////////
let productContainer = document.getElementById("productContainer");

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
function getProductData() {
  fetch("./productData/Product.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayProducts(data.products);
    });
}

getProductData();

function displayProducts(products) {
  products.forEach((product) => {
    productContainer.innerHTML += `
      <div class="my-3">
              <div
                class="bg-[#FEF5FD] w-full h-[250px] rounded-4xl flex items-center justify-center p-6"
              >
                <img
                  class="w-full h-[150px] object-contain"
                  src="${product.image}"
                  alt=""
                />
              </div>
              <div>
                <h5 class="font-medium text-[14px] my-3 mx-2">${product.name}</h5>
                <div class="flex justify-between items-center mx-2">
                  <div class="mt-6">
                    <p class="font-semibold">$${product.price}</p>
                    <p class="text-[#B6349A] text-[13px] font-normal">
                      ${product.stock} Left
                    </p>
                  </div>
                  <div class="mt-5">
                    <button
                      class="bg-[#FEF5FD] p-3 shadow-sm rounded-xl cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
        </div>
    `;
  });
}

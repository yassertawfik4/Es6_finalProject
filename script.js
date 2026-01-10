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
let allProducts = [];

function getProductData() {
  fetch("./productData/Product.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      allProducts = data.products;
      displayProducts(allProducts);
      setupFilterListeners();
    });
}

getProductData();

function displayProducts(products) {
  productContainer.innerHTML = "";

  products.forEach((product) => {
    productContainer.innerHTML += `
      <div class="my-3">
              <div
                class="bg-[#FEF5FD] w-full h-[250px] rounded-4xl flex items-center justify-center p-6 shadow-sm"
              >
                <img
                  class="w-full h-[150px] object-contain"
                  src="${product.image}"
                  alt=""
                />
              </div>
              <div>
                <h5 class="font-medium text-[14px] my-3 mx-2 cursor-pointer hover:text-[#B6349A] transition duration-300 product-name" data-product-id="${product.id}">${product.name}</h5>
                <div class="flex justify-between items-center mx-2">
                  <div class="mt-6">
                    <p class="font-semibold">$${product.price}</p>
                    <p class="text-[#B6349A] text-[13px] font-normal">
                      ${product.stock} Left
                    </p>
                  </div>
                  <div class="mt-5">
                    <button
                    id="product-${product.id}"
                      class="bg-[#FEF5FD] p-3 shadow-sm rounded-xl cursor-pointer outline-none"
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
productContainer.addEventListener("click", (e) => {
  const productName = e.target.closest(".product-name");
  if (productName) {
    const productId = productName.getAttribute("data-product-id");
    const selectedProduct = allProducts.find((p) => p.id == productId);
    if (selectedProduct) {
      localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
      window.location.href = "./productPage/productDetails.html";
    }
    return;
  }

  const btn = e.target.closest("button[id^='product-']");
  if (!btn) return;

  const productId = btn.id.replace("product-", "");
  const selectedProduct = allProducts.find((p) => p.id == productId);

  if (selectedProduct) {
    addToCart(selectedProduct);
  }
});
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const exists = cart.find((p) => p.id == product.id);
  if (exists) {
    exists.quantity = (exists.quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("Product added to cart:", product);
  console.log("Cart now:", cart);
  alert(`${product.name} has been added to your cart.`);
}
function setupFilterListeners() {
  const filterCheckboxes = document.querySelectorAll(".filter");
  filterCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", filterProducts);
  });
  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", resetFilters);
  }
}

function resetFilters() {
  const filterCheckboxes = document.querySelectorAll(".filter");
  filterCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  displayProducts(allProducts);
}

function filterProducts() {
  const filterCheckboxes = document.querySelectorAll(".filter:checked");
  const selectedCategories = Array.from(filterCheckboxes).map((checkbox) =>
    checkbox.getAttribute("data-category")
  );

  if (selectedCategories.length === 0) {
    displayProducts(allProducts);
  } else {
    const filteredProducts = allProducts.filter((product) =>
      selectedCategories.includes(product.category)
    );
    displayProducts(filteredProducts);
  }
}

////////////////////////////////////////////////////////////////////////////////////////

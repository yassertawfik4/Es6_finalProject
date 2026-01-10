// Load product details from localStorage
let product = JSON.parse(localStorage.getItem("selectedProduct"));

if (!product) {
  window.location.href = "/index.html";
}

// Populate product details
document.getElementById("productName").textContent = product.name;
document.getElementById("productCategory").textContent = product.category;
document.getElementById("productPrice").textContent = `$${product.price.toFixed(
  2
)}`;
document.getElementById("productImage").src = product.image;
document.getElementById("productDescription").textContent = product.description;
document.getElementById("stockInfo").textContent = `${product.stock} in stock`;

// Update stock status
updateStockStatus();

function updateStockStatus() {
  const stockStatus = document.getElementById("stockStatus");
  if (product.stock > 10) {
    stockStatus.innerHTML =
      '<span class="text-green-600 font-semibold">✓ In Stock - Ships within 2-3 days</span>';
    stockStatus.classList.add("bg-green-50");
  } else if (product.stock > 0) {
    stockStatus.innerHTML = `<span class="text-orange-600 font-semibold">⚠ Only ${product.stock} left!</span>`;
    stockStatus.classList.add("bg-orange-50");
  } else {
    stockStatus.innerHTML =
      '<span class="text-red-600 font-semibold">✗ Out of Stock</span>';
    stockStatus.classList.add("bg-red-50");
  }
}

// Quantity controls
const quantityInput = document.getElementById("quantity");
const decreaseBtn = document.getElementById("decreaseQty");
const increaseBtn = document.getElementById("increaseQty");

decreaseBtn.addEventListener("click", () => {
  if (quantityInput.value > 1) {
    quantityInput.value = parseInt(quantityInput.value) - 1;
  }
});

increaseBtn.addEventListener("click", () => {
  if (parseInt(quantityInput.value) < product.stock) {
    quantityInput.value = parseInt(quantityInput.value) + 1;
  }
});

// Add to cart
document.getElementById("addToCartBtn").addEventListener("click", () => {
  const quantity = parseInt(quantityInput.value);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const exists = cart.find((p) => p.id == product.id);
  if (exists) {
    exists.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${quantity} × ${product.name} added to your cart!`);
  window.location.href = "/index.html";
});

// Wishlist (optional feature)

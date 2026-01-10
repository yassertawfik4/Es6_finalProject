let productContainer = document.getElementById("productContainershop");

function displayProducts() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(cart);
  productContainer.innerHTML = "";

  cart.forEach((product) => {
    productContainer.innerHTML += `
    <div
      class="flex justify-between items-center mb-6 p-4 border border-[#F8F7F8] rounded-2xl shadow-lg"
      id="cart-item-${product.id}"
    >
      <div class="flex gap-4 items-center">
        <!-- image  -->
        <div
          class="bg-[#F8F7F8] rounded-4xl flex items-center justify-center shadow-sm p-5"
        >
          <img
            class="w-[50px] h-[50px] object-contain"
            src="${product.image}"
            alt=""
          />
        </div>
        <div>
          <h3 class="font-medium text-gray-800">${product.name}</h3>
          <p class="mt-3 text-md font-bold text-[#B6349A]">$${product.price}</p>
        </div>
      </div>
      <div class="flex gap-5 items-center">
        <p
          class="bg-[#F8F7F8] p-2 rounded-full w-12 h-12 flex items-center justify-center shadow-sm font-medium"
        >
          ${product.quantity}
        </p>
        <button
          class="remove-btn bg-[#B6349A] cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-[#9d2a85] transition duration-300"
          data-id="${product.id}"
        >
          Remove
        </button>
      </div>
    </div>
    `;
  });

  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      removeFromCart(id);
    });
  });
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((product) => product.id != productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayProducts();
  updateCheckoutSummary();
  alert("Item removed from your cart.");
}

function updateCheckoutSummary() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let itemsTotal = 0;

  cart.forEach((product) => {
    itemsTotal += product.price * product.quantity;
  });

  const deliveryFee = 0.0;
  const subtotal = itemsTotal + deliveryFee;

  document.getElementById("itemsTotal").textContent = `$${itemsTotal.toFixed(
    2
  )}`;
  document.getElementById("subtotalAmount").textContent = `$${subtotal.toFixed(
    2
  )}`;
  document.getElementById("checkoutAmount").textContent = `$${subtotal.toFixed(
    2
  )}`;
}

function checkout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let itemsTotal = 0;

  cart.forEach((product) => {
    itemsTotal += product.price * product.quantity;
  });

  const deliveryFee = 0.0;
  const subtotal = itemsTotal + deliveryFee;

  localStorage.removeItem("cart");
  alert(
    `✓ Order Confirmed!\n\nTotal: $${subtotal.toFixed(
      2
    )}\n\nThank you for your purchase!`
  );

  displayProducts();
  updateCheckoutSummary();
}

let checkoutBtn = document.getElementById("checkoutBtn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", checkout);
}

displayProducts();
updateCheckoutSummary();

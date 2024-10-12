let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fetch product details for each item in the cart and display them
document.addEventListener("DOMContentLoaded", async function () {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalSummaryContainer = document.querySelector(".cart-summary div");
  let totalPrice = 0;
  let totalCo2 = 0;
  let totalPackaging = 0;
  let totalEnvImpact = 0;

  // Fetch and display each product in the cart
  for (let productId of cart) {
    try {
      let response = await fetch(`/product-details/${productId}`);
      let item = await response.json();
      if (item.price) item.price = convertPriceToInt(item.price);

      // Set default packaging value if not provided
      if (!item.packaging) item.packaging = 0.5;

      // Calculate average impact
      let avgImpact = (
        (item.co2print + item.envimp + item.packaging) /
        3
      ).toFixed(2);

      // Create cart item HTML with Remove button
      let cartItemHTML = `
              <div class="cart-item" data-product-id="${item.productId}">
                  <img src="${item.imageUrl}" alt="${item.name}">
                  <div class="item-details">
                      <h2>${item.name}</h2>
                      <p class="description">${item.description.slice(
                        0,
                        100
                      )}...</p>
                      <div class="item-info">
                          <span>Price: ₹${item.price}</span>
                          <span>Carbon Footprint: ${item.co2print}</span>
                          <span>Packaging: ${item.packaging}</span>
                          <span>Environmental Impact: ${item.envimp}</span>
                          <span>Average Impact: ${avgImpact}</span>
                      </div>
                  </div>
                  <button class="remove-btn">Remove</button>
              </div>
          `;
      cartItemsContainer.insertAdjacentHTML("beforeend", cartItemHTML);

      // Update totals
      totalPrice += item.price;
      totalCo2 += item.co2print;
      totalPackaging += item.packaging;
      totalEnvImpact += item.envimp;
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }

  // Calculate overall average impact
  let avgTotalImpact = (
    (totalCo2 + totalPackaging + totalEnvImpact) /
    3
  ).toFixed(2);

  // Display total summary
  updateCartSummary(
    totalPrice,
    totalCo2,
    totalPackaging,
    totalEnvImpact,
    avgTotalImpact
  );

  // Event listener for Remove buttons
  cartItemsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-btn")) {
      let cartItemElement = e.target.closest(".cart-item");
      let productId = parseInt(cartItemElement.getAttribute("data-product-id")); // Convert to number

      console.log("Product ID to remove:", productId); // Debug log

      // Find the index of the first occurrence of the product ID
      const indexToRemove = cart.findIndex((id) => parseInt(id) === productId);
      if (indexToRemove !== -1) {
        console.log("Removing product at index:", indexToRemove); // Debug log
        cart.splice(indexToRemove, 1); // Remove the first occurrence
        localStorage.setItem("cart", JSON.stringify(cart));

        // Remove item from the page
        cartItemElement.remove();

        // Recalculate totals after removal
        recalculateTotals();
      } else {
        console.error("Product not found in cart");
      }
    }
  });

  function recalculateTotals() {
    totalPrice = 0;
    totalCo2 = 0;
    totalPackaging = 0;
    totalEnvImpact = 0;

    cartItemsContainer.querySelectorAll(".cart-item").forEach((item) => {
      const itemPrice = parseFloat(
        item
          .querySelector(".item-info span:nth-child(1)")
          .textContent.replace("Price: ", "")
      );
      const itemCo2 = parseFloat(
        item
          .querySelector(".item-info span:nth-child(2)")
          .textContent.replace("Carbon Footprint: ", "")
      );
      const itemPackaging = parseFloat(
        item
          .querySelector(".item-info span:nth-child(3)")
          .textContent.replace("Packaging: ", "")
      );
      const itemEnvImpact = parseFloat(
        item
          .querySelector(".item-info span:nth-child(4)")
          .textContent.replace("Environmental Impact: ", "")
      );

      totalPrice += itemPrice;
      totalCo2 += itemCo2;
      totalPackaging += itemPackaging;
      totalEnvImpact += itemEnvImpact;
    });

    let avgTotalImpact = (
      (totalCo2 + totalPackaging + totalEnvImpact) /
      3
    ).toFixed(2);
    updateCartSummary(
      totalPrice,
      totalCo2,
      totalPackaging,
      totalEnvImpact,
      avgTotalImpact
    );
  }

  function updateCartSummary(price, co2, packaging, envImpact, avgImpact) {
    // Ensure that price and other numbers are valid
    price = parseFloat(price) || 0; // Use 0 if price is invalid
    co2 = parseFloat(co2) || 0;
    packaging = parseFloat(packaging) || 0;
    envImpact = parseFloat(envImpact) || 0;
    avgImpact = parseFloat(avgImpact) || 0;

    totalSummaryContainer.innerHTML = `
      <p class="left-20">Total Price: ₹${price.toFixed(2)}</p>
      <p>&nbsp;</p>
      <p class="left-20">Total Carbon Footprint: ${co2.toFixed(2)}</p>
       <p>&nbsp;</p>
      <p class="left-20">Total Packaging: ${packaging.toFixed(2)}</p>
       <p>&nbsp;</p>
      <p class="left-20">Total Environmental Impact: ${envImpact.toFixed(2)}</p>
       <p>&nbsp;</p>
      <p class="left-20">Average Impact: ${avgImpact}</p>
      <p>&nbsp;</p>
    `;
  }
});

function convertPriceToInt(priceStr) {
  // Remove all non-numeric characters (except the dot if it's a decimal price)
  let numericString = priceStr.replace(/[^\d]/g, ""); // Keeps only digits
  return parseInt(numericString, 10); // Convert to an integer
}

// Purchase button alert
document.querySelector(".purchase-btn").addEventListener("click", function () {
  localStorage.removeItem("cart");
  alert("Thank you for your purchase!");
  window.location.href = "/";
});

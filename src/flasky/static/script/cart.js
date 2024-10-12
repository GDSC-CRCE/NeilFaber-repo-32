// Fetch product details for each item in the cart and display them
document.addEventListener("DOMContentLoaded", async function () {
  // Get cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Element where cart items will be displayed
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
      if (!item.packaging) item.packaging = 0.5;

      // Calculate average impact
      let avgImpact = (
        (item.co2print + item.envimp + item.packaging) /
        3
      ).toFixed(2);

      // Create cart item HTML
      let cartItemHTML = `
                <div class="cart-item">
                    <img src="${item.imageUrl}" alt="${item.name}">
                    <div class="item-details">
                        <h2>${item.name}</h2>
                        <p class="description">${item.description.slice(
                          0,
                          100
                        )}...</p>
                        <div class="item-info">
                            <span>Price: $${item.price}</span>
                            <span>Carbon Footprint: ${item.co2print}</span>
                            <span>Packaging: ${item.packaging}</span>
                            <span>Environmental Impact: ${item.envimp}</span>
                            <span>Average Impact: ${avgImpact}</span>
                        </div>
                    </div>
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
  totalSummaryContainer.innerHTML = `
        <span>Total Price: $${totalPrice}</span>
        <span>Total Carbon Footprint: ${totalCo2}</span>
        <span>Total Packaging: ${totalPackaging}</span>
        <span>Total Environmental Impact: ${totalEnvImpact}</span>
        <span>Average Impact: ${avgTotalImpact}</span>
    `;
});

// Purchase button alert
document.querySelector(".purchase-btn").addEventListener("click", function () {
  alert("Thank you for your purchase!");
  window.location.href = "/";
  localStorage.removeItem("cart");
});

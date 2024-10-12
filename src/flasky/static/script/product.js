var productName = document.getElementById("product-name");
var productDescription = document.getElementById("product-description");
var productImage = document.getElementById("product-image");
var productPrice = document.getElementById("product-price");
var productId;

function setVariable() {
  fetch("/product-details")
    .then((response) => response.json())
    .then((data) => {
      // Process the fetched data
      productName.innerText = data["name"];
      productDescription.innerHTML = data["description"];
      productImage.src = data["imageUrl"];
      productPrice.innerText = "₹ " + data["price"];
      productId = data["productId"];
      console.log(data);
    })
    .catch((error) => {
      // Handle errors
      console.error("Error fetching data:", error);
    });
}

setVariable();

function addToCart() {
  var cart = JSON.parse(localStorage.getItem("cart"));

  if (cart) {
    cart.push(productId);
  } else {
    cart = [];
    cart.push(productId);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart);
  window.location.href = "/cart";
}

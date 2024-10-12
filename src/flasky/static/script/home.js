var cartNumber = document.getElementById("cart-number");
var mobileCart = document.getElementById("mobile-cart");

async function intialise() {
  var cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    cartNumber.innerHTML = cart.length;
    mobileCart.innerHTML = cart.length;
  }
}

intialise();

function viewProduct(id) {
  localStorage.setItem("product", JSON.stringify(id));
  window.location.href = "/products";
}

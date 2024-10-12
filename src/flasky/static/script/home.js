var cartNumber = document.getElementById("cart-number");

function intialise() {
  var cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    cartNumber.innerHTML = cart.length;
  }
}

intialise();

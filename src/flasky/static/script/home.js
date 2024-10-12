var cartNumber = document.getElementById("cart-number");

async function intialise() {
  var cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    cartNumber.innerHTML = cart.length;
  }

  fetch();
}

intialise();

function viewProduct(id) {
  localStorage.setItem("product", JSON.stringify(id));
  window.location.href = "/products";
}

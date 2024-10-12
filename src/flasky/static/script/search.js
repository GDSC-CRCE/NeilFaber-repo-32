function search() {
  let searchBarContent = document.getElementById("search-bar").value;
  if (searchBarContent) {
    localStorage.setItem("search", searchBarContent);
    document.getElementById("search-bar").value = "";

    window.location.href = "/search";
  }
}

const searchBar = document.getElementById("search-bar");

searchBar.addEventListener("focus", () => {
  searchBar.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      search();
    }
  });
});

function searchIntialise() {
  // Fetch search query from localStorage
  const searchQuery = localStorage.getItem("search");

  // Check if search query exists
  if (searchQuery) {
    // Make a fetch request to get products based on the search query
    fetch(`/search/${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        // Handle error response
        if (data.error) {
          displayNoProducts();
        } else if (Array.isArray(data) && data.length > 0) {
          displayProducts(data);
        } else {
          displayNoProducts();
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        displayNoProducts();
      });
  } else {
    displayNoProducts();
  }

  // Function to display products
  function displayProducts(products) {
    const productContainer = document.getElementById("products");
    products.forEach((product) => {
      const productHTML = `
      <div class="product-card">
        <img src="${product.imageUrl}" alt="${product.name}">
        <div class="product-name">${product.name}</div>
        <div class="product-description">${product.description.slice(
          0,
          100
        )}...</div>
        <div class="product-price">Price: ${product.price}</div>
        <div class="product-co2">CO2 Print: ${product.co2print}</div>
        <div class="product-envimp">Environmental Impact: ${
          product.envimp
        }</div>
      </div>
    `;
      productContainer.insertAdjacentHTML("beforeend", productHTML);
    });
  }

  // Function to display 'No products found'
  function displayNoProducts() {
    document.getElementById("no-products").style.display = "block";
  }
}

//<============== MAIN OF FORM LOGIN ==================>

//<================ HIDE AND SHOW SOMETHING FUNCTION ===================>

function show(element) {
    element.style.display = 'block';
}

function hide(element) {
    element.style.display = 'none';
}


// Define an array of products
var products = [
    {
      productId: 1,
      productName: "Product 1",
      category: "Category 1",
      price: 10.99,
      amount: 100,
      sellProgress: 50,
    },
    {
      productId: 2,
      productName: "Product 2",
      category: "Category 2",
      price: 19.99,
      amount: 50,
      sellProgress: 75,
    },
    {
      productId: 3,
      productName: "Product 3",
      category: "Category 3",
      price: 5.99,
      amount: 200,
      sellProgress: 25,
    },
  ];
  
  // Get the table body element
var tbody = document.querySelector("#productTable tbody");

// Iterate over the products array and create table rows
products.forEach(function (product) {
  // Create a new row element
  var row = document.createElement("tr");

  // Create table cells for each property of the product object
  var productIdCell = document.createElement("td");
  productIdCell.textContent = product.productId;

  var productNameCell = document.createElement("td");
  productNameCell.textContent = product.productName;

  var categoryCell = document.createElement("td");
  categoryCell.textContent = product.category;

  var priceCell = document.createElement("td");
  priceCell.textContent = product.price;

  var amountCell = document.createElement("td");
  amountCell.textContent = product.amount;
  console.log(amountCell)

  var sellProgressCell = document.createElement("td");
  sellProgressCell.textContent = product.sellProgress + "%";

  // Append the cells to the row
  row.appendChild(productIdCell);
  row.appendChild(productNameCell);
  row.appendChild(categoryCell);
  row.appendChild(priceCell);
  row.appendChild(amountCell);
  row.appendChild(sellProgressCell);

  // Append the row to the table body
  tbody.appendChild(row);
});
// Convert the products array to a JSON string
var productsJson = JSON.stringify(products);

// Store the JSON string in local storage
localStorage.setItem("products", productsJson);
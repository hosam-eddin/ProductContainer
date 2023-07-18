var productNameInput = document.getElementById("productName"); //! all input
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescInput = document.getElementById("productDesc");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");

var indexInput = 0;

var productContainer = []; //! Array

if (localStorage.getItem("products") != null) {
  productContainer = JSON.parse(localStorage.getItem("products"));
  displayProducts(productContainer);
} //! will return value

function addProduct() {
  //! called with btn in HTML
  var product = {
    name: productNameInput.value, //! inputs value
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescInput.value,
  };
  productContainer.push(product);
  displayProducts(productContainer);
  localStorage.setItem("products", JSON.stringify(productContainer));
  clearForm();
}

//! clearForm - Called in Main-Function "addProduct"
function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescInput.value = "";
}

function displayProducts(list) {
  var cartona = "";
  for (var i = 0; i < list.length; i++) {
    cartona += ` <tr>
    <td> ${list[i].name} </td>    
    <td> ${list[i].price} </td>
    <td> ${list[i].category} </td>
    <td> ${list[i].desc} </td>
    <td> <button onclick="setFormForUpdate(${i})" class="btn btn-warning"> update</button> </td>
    <td> <button onclick="deleteProduct(${i})" class="btn btn-danger"> delete</button> </td>
    </tr> `;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}

//! delete Function
function deleteProduct(productIndex) {
  productContainer.splice(productIndex, 1);
  localStorage.setItem("products", JSON.stringify(productContainer));
  displayProducts(productContainer);
}

function searchProducts(term) {

  var matchedProducts = [];
  for (var i = 0; i < productContainer.length; i++) {
    if (
      productContainer[i].name.toLowerCase().includes(term.toLowerCase()) ===
      true
    ) {
      matchedProducts.push(productContainer[i]);
    }
  }
  displayProducts(matchedProducts);
}

function setFormForUpdate(i) {
  indexInput = i
  
  addBtn.classList.replace("d-block", "d-none");
  updateBtn.classList.replace("d-none", "d-block");
  productNameInput.value = productContainer[i].name;
  productPriceInput.value = productContainer[i].price;
  productCategoryInput.value = productContainer[i].category;
  productDescInput.value = productContainer[i].desc;
}

function updateProduct() {
  updateBtn.classList.replace("d-block", "d-none");
  addBtn.classList.replace("d-none", "d-block");

  var product = {
    name: productNameInput.value, //! inputs value
    price: productPriceInput.value,
    category: productCategoryInput.value,
    desc: productDescInput.value,
  };
  productContainer.splice(indexInput , 1 , product);
  displayProducts(productContainer);
  localStorage.setItem("products", JSON.stringify(productContainer));
  clearForm();
}

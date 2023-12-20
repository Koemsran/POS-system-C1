import {
  getElement,
  getElements,
  saveData,
  laodData,
  createElement,
  show,
  hide,
  removeData,
} from "../../js/locialstorage.js";

// ===============> LOCAL VARIBLE <=============
let dataStore = laodData("dataStore");
let historyData = [];
let listId = [];
let dataCheckout = {
  cart: [],
};
let soldOut = 0;
let printData = [];
if (laodData('soldOut') !== null) {
  soldOut = laodData('soldOut')
}
if (laodData("dataCheckout") !== null) {
  dataCheckout = laodData("dataCheckout");
}
if (laodData("historyData") !== null) {
  historyData = laodData("historyData");
}
//==============> FUNCTION <==================
function checkId() {
  for (let ID of dataStore.products) {
    listId.push(ID.id);
  }
  if (listId.includes(parseInt(searchId.value))) {
    hide(alert);
    let productIndex = dataStore.products.findIndex(
      (product) => product.id === parseInt(searchId.value)
    );
    let obj = dataStore.products[productIndex];
    namePro.textContent = obj.name;
    qty.textContent = obj.quantity;
    price.textContent = obj.grossprice + "$";
  } else {
    show(alert);
    clearrForm();
  }
  if (searchId.value === "") {
    hide(alert);
  }
  if (namePro.textContent === "" || qty.textContent === "" || price.textContent === "") {
    btnAdd.disabled = true;
    btnAdd.style.background = 'gray';

  } else {
    btnAdd.disabled = false;
    btnAdd.style.background = 'green';

  }
}

function addCart() {
  if (searchId.value === "") return window.alert("Please enter product id");
  let list = {
    id: parseInt(searchId.value),
    name: namePro.textContent,
    quantity: 1,
    price: parseInt(price.textContent),
  };
  dataCheckout.cart.push(list);
  saveData("dataCheckout", dataCheckout);
  window.location.reload();
}

function renderCart() {
  searchId.value = "";

  // hide(message);
  clearrForm();
  tbody.remove();
  let newTbody = createElement("tbody");
  newTbody.className = "tbody";
  let totalPrice = 0;
  let index = 0;
  for (let data of dataCheckout.cart) {
    let tRow = createElement("tr");

    let tdId = createElement("td");
    let tdName = createElement("td");
    let tdPrice = createElement("td");
    let tdAtion = createElement("td");
    let tdQuan = createElement("td");

    tdQuan.className = "tdQuan";
    tdId.dataset.id = index;

    let qty = createElement("input");
    qty.className = "Qty";
    qty.type = "number";
    qty.value = data.quantity;
    qty.setAttribute("min", 1)
    tdQuan.appendChild(qty);
    qty.addEventListener("change", updateQuantity);

    tdId.textContent = "00"+data.id;
    tdName.textContent = data.name;
    tdPrice.textContent = data.price + "$";

    let btnRemove = createElement("div");
    let iconRemove = createElement("span");
    iconRemove.className = "remove material-symbols-outlined";
    iconRemove.textContent = "delete";
    btnRemove.appendChild(iconRemove);
    tdAtion.appendChild(btnRemove);

    tRow.appendChild(tdId);
    tRow.appendChild(tdName);
    tRow.appendChild(tdQuan);
    tRow.appendChild(tdPrice);
    tRow.appendChild(tdAtion);
    newTbody.appendChild(tRow);
    table.appendChild(newTbody);
    totalPrice += parseInt(tdPrice.textContent);
    getBtn(newTbody);
    index++;
  }
  total.textContent = parseInt(totalPrice) + "$";
}

function clearrForm() {
  namePro.textContent = "";
  qty.textContent = "";
  price.textContent = "";
}

function updateQuantity(e) {
  let qty = parseInt(e.target.value);
  let cartId = e.target.closest("tr").firstElementChild.textContent;
  console.log(cartId)
  let Index = dataCheckout.cart.findIndex(
    (list) => parseInt(list.id) === parseInt(cartId)
  );
  let productIndex = dataStore.products.findIndex(pro => pro.id === parseInt(cartId))
  if (qty > parseInt(dataStore.products[productIndex].quantity) - 1) {
    window.alert("Product not enough");
  } else {
    dataCheckout.cart[Index].quantity = qty;
    dataCheckout.cart[Index].price = qty * parseInt(dataStore.products[Index].grossprice);
  }

  saveData("dataCheckout", dataCheckout);
  window.location.reload();
}

function removeElement(event) {
  let indexTr = event.target.closest("tr");
  let productId = indexTr.firstElementChild.dataset.id;
  let isRemove = window.confirm("Do you want to delete all products?");
  if (isRemove) {
    indexTr.remove();
    dataCheckout.cart.splice(productId, 1);
    saveData("dataCheckout", dataCheckout);
  }
  displayMessage();
}
function getBtn(tbody) {
  let btnRemove =
    tbody.lastElementChild.lastElementChild.lastElementChild.lastElementChild;
  btnRemove.addEventListener("click", removeElement);
}
function printer() {
  show(printReciept);
  displayPrint();
}

function checkoutProduct() {
  let income = total.textContent.replace("$", "");
  historyData.push(parseInt(income));
  saveData("historyData", historyData);
  for (let checkout of dataCheckout.cart) {
    let Index = dataCheckout.cart.findIndex(
      (list) => parseInt(list.id) === parseInt(checkout.id)
    );
    dataStore.products[Index].quantity -= dataCheckout.cart[Index].quantity;
  }
  printData = dataCheckout.cart;
  let sum = 0;
  for (let data of printData) {
    sum += data.quantity;
  }
  soldOut += sum
  saveData('soldOut', soldOut)
  saveData("dataStore", dataStore);
  saveData("printData", printData);
  removeData("dataCheckout");
  window.location.reload();

}

function displayMessage() {
  if (laodData("dataCheckout") === null || dataCheckout.cart.length === 0) {
    show(message)
  } else {
    hide(message)
  }
}

function displayPrint() {
  let recieptData = laodData("printData");
  let Amount = 0;
  let total = 0;
  for (let product of recieptData) {
    tableReciept.remove()
    let newTbody = createElement('tbody');
    let tRow = createElement('tr');
    let tdName = createElement('td');
    tdName.className = "tdname";
    let tdQuan = createElement('td');
    let tdPrice = createElement('td');

    tdName.textContent = product.name;
    tdQuan.textContent =product.quantity;
    tdPrice.textContent = product.price +"$";
    tRow.appendChild(tdName)
    tRow.appendChild(tdQuan)
    tRow.appendChild(tdPrice)

    newTbody.appendChild(tRow)
    tablePrint.appendChild(newTbody)
    Amount += product.quantity;
    total+= product.price;

  }
  amount.textContent = Amount;
  totalPrint.textContent = total +'$';

}
// ===============> GET ELEMENT <================
let amount = getElement('.amount');
let tablePrint = getElement('.table-reciept');
let tableReciept = getElement('.tbody-print');
let searchId = getElement("#search");
let namePro = getElement(".search-pro");
let qty = getElement("#qty span");
let price = getElement("#price-pro");
let alert = getElement("#search-bar span");
let btnAdd = getElement(".checkout .btn");
let tbody = getElement(".tbody");
let table = getElement("#table");
let total = getElement(".total");
let message = getElement(".message");
let btnPrint = getElement(".print");
let printReciept = getElement("#print-reciept");
let btn_print = getElement(".btn-print");
let checkoutBtn = getElement(".check");
let totalPrint = getElement(".totalp");


//==============>ADD EVENLISTENER <================

btn_print.addEventListener("click", () => {
  window.print();
});

searchId.addEventListener("keyup", checkId);
btnAdd.addEventListener("click", addCart);
btnPrint.addEventListener("click", printer);
// laodData("dataCheckout")
renderCart();
displayMessage();

checkoutBtn.addEventListener('click', checkoutProduct)
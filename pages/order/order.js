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
  }
  
  function addCart() {
    if (searchId.value === "") return window.alert("Please enter product id");
    let list = {
      id: parseInt(searchId.value),
      name: namePro.textContent,
      quantity: parseInt(qty.textContent),
      price: parseInt(price.textContent),
    };
    dataCheckout.cart.push(list);
    saveData("dataCheckout", dataCheckout);
    window.location.reload();
  }
  
  function renderCart() {
    searchId.value = "";
  
    hide(message);
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
      qty.value = 1;
      tdQuan.appendChild(qty);
      qty.addEventListener("change", updateQuantity);
  
      tdId.textContent = data.id;
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
    let qty = e.target.value;
    let cartId = e.target.closest("td").dataset.id;
    let Index = dataCheckout.cart.findIndex(
      (list) => parseInt(list.id) === parseInt(cartId)
    );
    if (qty > dataCheckout.cart[Index].quantity) {
      window.alert("Product not enough");
    }
  
    saveData("dataCheckout", dataCheckout);
    renderCart();
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
  }
  
  function getBtn(tbody) {
    let btnRemove =
      tbody.lastElementChild.lastElementChild.lastElementChild.lastElementChild;
    btnRemove.addEventListener("click", removeElement);
  }
  function printer() {
    show(printReciept);
  }
  function checkoutProduct() {
    let income = total.textContent.replace("$", "");
    historyData.push(parseInt(income));
    saveData("historyData",historyData);
    // for (let checkout of dataCheckout.cart) {
    //     let productId = dataStore.products.findIndex(pro => console.log(pro.id));
    //     console.log(productId);
    // }
    removeData("dataCheckout");
    window.location.reload();
}
// ===============> GET ELEMENT <================
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
const btn_print = getElement(".btn-print");

let checkoutBtn = getElement(".check");

//==============>ADD EVENLISTENER <================

btn_print.addEventListener("click", () => {
  window.print();
});

searchId.addEventListener("keyup", checkId);
btnAdd.addEventListener("click", addCart);
btnPrint.addEventListener("click", printer);
// laodData("dataCheckout")
renderCart();

checkoutBtn.addEventListener('click', checkoutProduct)
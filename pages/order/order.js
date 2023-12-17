import { getElement, getElements, saveData, laodData, createElement, show, hide } from "../../js/locialstorage.js";

// ===============> GET ELEMENT <================
let searchId = getElement('#search');
let namePro = getElement(".search-pro");
let qty = getElement('#qty span');
let price = getElement("#price-pro")
let alert = getElement("#search-bar span");
let btnAdd = getElement('.checkout .btn');
let tbody = getElement('.tbody');
let table = getElement('#table')
let total = getElement('.total')

// ===============> LOCAL VARIBLE <=============
let dataStore = laodData('dataStore');
let listId = [];

//==============> FUNCTION <==================
function checkId() {

    for (let ID of dataStore.products) {
        listId.push(ID.id)

    }

    if (listId.includes(parseInt(searchId.value))) {
        hide(alert)
        let productIndex = dataStore.products.findIndex(product => product.id === parseInt(searchId.value));
        let obj = dataStore.products[productIndex];
        namePro.textContent = obj.name;
        qty.textContent = obj.quantity;
        price.textContent = obj.grossprice + "$";

        let list = {
            id: parseInt(searchId.value),
            name: obj.name,
            quantity: parseInt(obj.quantity),
            price: parseInt(obj.grossprice)
        }
        dataCheckout.cart.push(list)
        saveData('dataCheckout', dataCheckout)
        laodData("dataCheckout")


    }
    else {
        show(alert)
        clearrForm()

    }
    if (searchId.value === '') {
        hide(alert)
        // clearrForm()
    }
    laodData("dataCheckout")

}
function getData(){
    
}
function renderCart() {
    searchId.value = ''
    clearrForm()
    tbody.remove()
    let newTbody = createElement('tbody');
    newTbody.className = 'tbody';
    let totalPrice = 0;

    for (let data of dataCheckout.cart) {
        let tRow = createElement('tr');

        let tdId = createElement('td');
        let tdName = createElement('td');
        let tdPrice = createElement('td');
        let tdAtion = createElement('td');
        let tdQuan = createElement('td');

        tdQuan.className = 'tdQuan';
        tdQuan.dataset.id = data.id;

        let qty = createElement('input')
        qty.className = 'Qty'
        qty.type = 'number';
        qty.value = data.quantity;
        tdQuan.appendChild(qty)
        qty.addEventListener('change', updateQuantity)
        

        tdId.textContent = data.id;
        tdName.textContent = data.name;
        tdPrice.textContent = data.price + "$";

        let btnRemove = createElement('div');
        let iconRemove = createElement("span");
        iconRemove.className = 'remove material-symbols-outlined';
        iconRemove.textContent = "delete"
        btnRemove.appendChild(iconRemove)
        tdAtion.appendChild(btnRemove)

        tRow.appendChild(tdId);
        tRow.appendChild(tdName);
        tRow.appendChild(tdQuan);
        tRow.appendChild(tdPrice);
        tRow.appendChild(tdAtion)
        newTbody.appendChild(tRow);
        table.appendChild(newTbody)
        totalPrice += parseInt(tdPrice.textContent);
        getBtn(newTbody)
    }
    total.textContent = parseInt(totalPrice) + '$'

}

function clearrForm() {
    namePro.textContent = "";
    qty.textContent = "";
    price.textContent = "";
}

function updateQuantity(e) {
    let qty = e.target.value;
    let cartId = e.target.closest('td').dataset.id;
    let Index = dataCheckout.cart.findIndex(list => parseInt(list.id) === parseInt(cartId));
    if (qty > dataCheckout.cart[Index].quantity){
        window.alert('Product not enough')
    }
    
    

    saveData('dataCheckout', dataCheckout)
    renderCart()
    


}

function removeElement(event) {
    let indexTr = event.target.closest('tr');
    let productId = indexTr.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.dataset.id;
    let isRemove = window.confirm('Do you want to delete all products?');

    if (isRemove) {
        indexTr.remove()
        let productIndex = dataCheckout.cart.findIndex(cart => cart.id === parseInt(productId));
        dataCheckout.cart.splice(productIndex, 1);
        saveData('datacheckout', dataCheckout)

    }

}

function getBtn(tbody) {
    let btnRemove = tbody.lastElementChild.lastElementChild.lastElementChild.lastElementChild;
    btnRemove.addEventListener('click', removeElement);
}

let dataCheckout = {
    cart: []

}

//==============>ADD EVENLISTENER <================
searchId.addEventListener('keyup', checkId)
btnAdd.addEventListener('click', renderCart)
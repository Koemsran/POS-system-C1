import { getElement, getElements, saveData, laodData, createElement, show, hide } from "../../js/locialstorage.js";

// ================> Global varibles <===================
let dataStore = {
    products: [],
    categories: ["perfumes", "lotion", "shambo"],
    latestId: null
}
let loadProduct = laodData("dataStore");
if (loadProduct != undefined) {
    dataStore = loadProduct
}
// else {
//     saveData('dataStore', dataStore)
// }
//=================> FUNCTION <==================

function getTotal() {
    let totalPrice = 0
    for (let product of productsData.products) {
       totalPrice += parseInt(product.price) * parseInt(product.quantity);
    }
    total.textContent = totalPrice + "$"
}



function renderProduct() {
    tbody.remove()
    //insert form
    let newTbody = createElement('tbody');

    for (let listProduct of dataStore.products) {

        let tRow = createElement('tr');

        let tdId = createElement('td');
        tdId.textContent = listProduct.id;

        let tdName = createElement('td');
        tdName.textContent = listProduct.name;

        let tdCat = createElement('td');
        tdCat.textContent = listProduct.category;
        let tdQuan = createElement('td');
        tdQuan.className = 'tdQuan';
        let qty = createElement('input')
        qty.className = 'Qty'
        qty.type = 'number';
        qty.value = listProduct.quantity;
        
        
        let tdPrice = createElement('td');
        tdPrice.textContent = listProduct.grossprice +"$";

        let tdAction = createElement('td');
        tdAction.src = 'image';

        tdQuan.appendChild(qty)
        tRow.appendChild(tdId)
        tRow.appendChild(tdName)
        tRow.appendChild(tdCat)
        tRow.appendChild(tdQuan)
        tRow.appendChild(tdPrice)
        tRow.appendChild(tdAction)

        newTbody.appendChild(tRow)
        table.appendChild(newTbody)
    }
    


}

function addProduct() {
    show(addInput)
    clearForm()

}

function onCancel(event) {
    event.preventDefault()
    hide(addInput)

}

function onAdd(event) {
    event.preventDefault()
 
    let proId = dataStore.latestId;
    if (proId === null || dataStore.products.length === 0) {
        proId = 1;
    } else {
        proId = proId + 1;
    }

    dataStore.latestId = proId;

    dataStore.products.push({
        id: proId,
        name: inputName.value,
        category: inputCategory.value,
        quantity: inputQuan.value,
        netprice: inputNetPrice.value,
        grossprice: inputGrossPrice.value,
    })
    saveData('dataStore', dataStore)
    
    window.location.reload();
    

}

function clearForm() {
    inputName.value = ''
    inputCategory.value = ''
    inputQuan.value = ''
    inputNetPrice.value = ''
    inputGrossPrice.value = ''
}

//===============> MAIN <====================
let table = getElement('table')
let tbody = getElement('tbody');
let btnAdd = getElement('.btn-add');
let addInput = getElement('#add-product')
let add = getElement('#btn-add');
let cancel = getElement('#btn-cancel');

// ================> GET INPUT FORM <=====================
let inputName = getElement('#name');
let inputCategory = getElement('#cat');
let inputQuan = getElement('#quan');
let inputNetPrice = getElement('#netprice');
let inputGrossPrice = getElement('#grossprice');

// ================> ADD EVENTLISTENER <==================
btnAdd.addEventListener('click', addProduct);
add.addEventListener('click', onAdd);
cancel.addEventListener('click', onCancel);

// loadProducts()
renderProduct()

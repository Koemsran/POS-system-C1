import { getElement, getElements, saveData, laodData, createElement, show, hide } from "../../js/locialstorage.js";

// ================> Global varibles <===================
let dataStore = {
    products: [],
    categories: [{Id:1, name: 'perfume', description: "mixture of fragrant essential oils or aroma compounds, fixatives and solvents"}],
    latestIdP: null,
    latestIdC: 1,
    instock: 0,
}

let editIndex = null

//=================> FUNCTION <==================

let loadProduct = laodData("dataStore");
if (loadProduct != undefined) {
    dataStore = loadProduct
}


function renderProduct() {
    tbody.remove()
    let newTbody = createElement('tbody');
    let totalPrice = 0;
    let totalQuantity = 0;
    let index = 0
    
    for (let listProduct of dataStore.products) {

        let tRow = createElement('tr');
        tRow.dataset.index = index;
        index++
        let tdId = createElement('td');
        tdId.textContent = "00" + listProduct.id;

        let tdName = createElement('td');
        tdName.textContent = listProduct.name;

        let tdCat = createElement('td');
        tdCat.textContent = listProduct.category;

        let tdQuan = createElement('td');
        tdQuan.className = 'tdQuan';
        tdQuan.dataset.id = listProduct.id;

        let qty = createElement('input')
        qty.className = 'Qty'
        qty.type = 'number';
        qty.value = listProduct.quantity;
        qty.addEventListener('change', updateQuantity)


        let tdPrice = createElement('td');
        tdPrice.textContent = listProduct.grossprice + "$";

        let tdTotalPrice = createElement('td');
        tdTotalPrice.textContent = parseInt(qty.value) * parseInt(tdPrice.textContent) + '$';

        let tdAction = createElement('td');
        let action = createElement('div');
        action.className = 'btn-action';

        let btnView = createElement('div');
        let iconView = createElement("span");
        iconView.className = 'view material-symbols-outlined';
        iconView.textContent = "visibility"
        btnView.appendChild(iconView)
        action.appendChild(btnView)

        let btnEdit = createElement('div');
        let iconEdit = createElement("span");
        iconEdit.className = 'edit material-symbols-outlined';
        iconEdit.textContent = "edit_square"
        btnEdit.appendChild(iconEdit)
        action.appendChild(btnEdit)

        let btnRemove = createElement('div');
        let iconRemove = createElement("span");
        iconRemove.className = 'remove material-symbols-outlined';
        iconRemove.textContent = "delete"
        btnRemove.appendChild(iconRemove)
        action.appendChild(btnRemove)

        tdAction.appendChild(action)
        tdQuan.appendChild(qty);
        tRow.appendChild(tdId);
        tRow.appendChild(tdName);
        tRow.appendChild(tdCat);
        tRow.appendChild(tdQuan);
        tRow.appendChild(tdPrice);
        tRow.appendChild(tdTotalPrice);
        tRow.appendChild(tdAction);

        newTbody.appendChild(tRow);
        table.appendChild(newTbody);
        getBtn(newTbody)
        totalPrice += parseInt(tdTotalPrice.textContent);
        totalQuantity += parseInt(qty.value)
    }

    total.textContent = parseInt(totalPrice) + '$'
    totalQuant.textContent = parseInt(totalQuantity)
    dataStore.instock = parseInt(totalQuant.textContent);


}

function addProduct() {
    show(addInput)
    title.textContent = 'Add product more'
    btn.textContent = "Add";
    categorySelect()
    clearForm()

}

function onCancel(event) {
    event.preventDefault()
    hide(addInput)
    window.location.reload()

}

function onAdd(event) {
    event.preventDefault()

    if (inputName.value === '' || inputCategory.value === '' || inputQuan.value === '' || inputNetPrice.value === '' || inputGrossPrice.value === '') return alert('Form is empty cannot add!');
    let proId = dataStore.latestIdP;
    if (proId === null || dataStore.products.length === 0) {
        proId = 1;
    } else {
        proId = proId + 1;
    }

    let newProduct = {
        id: proId,
        name: inputName.value,
        category: inputCategory.value,
        quantity: parseInt(inputQuan.value),
        netprice: inputNetPrice.value,
        grossprice: inputGrossPrice.value,
    }

    dataStore.latestIdP = proId;

    if (editIndex === null) {
        dataStore.products.push(newProduct)

    }
    else {
        dataStore.products[editIndex] = newProduct;
    }
    editIndex = null;
    saveData('dataStore', dataStore)
    clearForm()
    renderProduct()
    window.location.reload()

}

function clearForm() {
    inputName.value = ''
    inputCategory.value = ''
    inputQuan.value = ''
    inputNetPrice.value = ''
    inputGrossPrice.value = ''
}

function updateQuantity(e) {
    let qty = e.target.value;
    let productId = e.target.closest('td').dataset.id;
    let productIndex = dataStore.products.findIndex(product => product.id === parseInt(productId));
    dataStore.products[productIndex].quantity = qty;

    saveData('dataStore', dataStore)
    renderProduct()
    window.location.reload();

}

function categorySelect() {
    for (let listcat of dataStore.categories) {
        let option = createElement('option');
        option.value = listcat.name;
        option.textContent = listcat.name;
        select.appendChild(option)

    }



}

function categoryfillter() {
    for (let listcat of dataStore.categories) {
        let option = createElement('option');
        option.value = listcat.name;
        option.textContent = listcat.name;
        fill.appendChild(option)

    }

}

function searchBar() {
    let tRow = getElements('tbody tr');
    let input = search.value.toUpperCase()
    for (let td of tRow) {
        let td1 = td.firstElementChild.nextElementSibling.textContent.toUpperCase();
        if (td1.includes(input)) {
            td.style.display = '';

        } else {
            td.style.display = 'none'
        }
    }
}

function filterData(e) {
    let cat = e.target.value;
    let tRow = getElements('tbody tr');
    for (let tr of tRow) {
        let category = tr.firstElementChild.nextElementSibling.nextElementSibling.textContent;
        if (category === cat) {
            tr.style.display = '';
        } else {
            tr.style.display = 'none';
        }
    }
}

function clearFilter() {
    let tRow = getElements('tbody tr');
    for (let tr of tRow) {
        tr.style.display = '';
    }
    fill.value = 'Choose category'
}

function removeElement(event) {
    let indexTr = event.target.closest('tr');
    let productId = indexTr.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.dataset.id;
    let isRemove = window.confirm('Do you want to delete all products?');

    if (isRemove) {
        indexTr.remove()
        let productIndex = dataStore.products.findIndex(product => product.id === parseInt(productId));
        dataStore.products.splice(productIndex, 1);
        saveData('dataStore', dataStore)

    }

}

function editElement(event) {

    let index = event.target.closest('tr').dataset.index;
    let product = dataStore.products[index];
    categorySelect()
    show(addInput)
    title.textContent = 'Update your product'
    btn.textContent = "Update";

    inputName.value = product.name;
    inputCategory.value = product.category;
    inputQuan.value = product.quantity;
    inputNetPrice.value = product.netprice;
    inputGrossPrice.value = product.grossprice;
    editIndex = index;


}

function viewElement(event) {
    show(viewProductDetail)
    let index = event.target.closest('tr').dataset.index;
    let product = dataStore.products[index];

    let name = getElement('#name-tail');
    let cat = getElement('#category-tail');
    let quan = getElement('#quan-tail');
    let stock = getElement('#stock-tail');
    let nPrice = getElement('#nprice-tail');
    let gPrice = getElement('#gprice-tail');
    let date = getElement('.date');
    let amount = getElement('.amount');
    let price = getElement('.price');
    let getDate = new Date();
    name.textContent = ": " + product.name;
    cat.textContent = ": " + product.category;
    quan.textContent = ": " + product.quantity;
    stock.textContent = ": " + product.quantity;
    nPrice.textContent = ": " + product.netprice + "$";
    gPrice.textContent = ": " + product.grossprice + "$";
    date.textContent = " : " +getDate;
    amount.textContent =" : " + 3 +"(amount)"
    price.textContent = ": 25$ (price)"
    



}

function getBtn(tbody) {
    let btnRemove = tbody.lastElementChild.lastElementChild.lastElementChild.lastElementChild;
    let btnEdit = tbody.lastElementChild.lastElementChild.lastElementChild.firstElementChild.nextElementSibling;
    let btnView = tbody.lastElementChild.lastElementChild.lastElementChild.firstElementChild;
    btnRemove.addEventListener('click', removeElement)
    btnEdit.addEventListener('click', editElement)
    btnView.addEventListener('click', viewElement)
}
function exitDetail() {
    hide(viewProductDetail)

}
//===============> MAIN ADD PRODUCT FORM <====================
let table = getElement('table')
let tbody = getElement('tbody');
let btnAdd = getElement('.btn-add');
let addInput = getElement('#add-product')
let viewProductDetail = getElement('#view-product');

let add = getElement('#btn-add');
let cancel = getElement('#btn-cancel');
let title = getElement('header h1');
let btn = getElement('#btn-add');
let btnExit = getElement('.exit');

// ======================> TOTAL <=======================
let total = getElement('.total');
let totalQuant = getElement('.total-quan');

// ================> GET INPUT FORM <=====================
let inputName = getElement('#name');
let inputCategory = getElement('#cat');
let inputQuan = getElement('#quan');
let inputNetPrice = getElement('#netprice');
let inputGrossPrice = getElement('#grossprice');

// =================> GET OPTION CATEGORY <=================
let select = getElement('section select');
let btnClearFilter = getElement('.fillter button');

//===============> SEARCH PRODUCT <=====================
let search = getElement('#search');

// ================> ADD EVENTLISTENER <==================
btnAdd.addEventListener('click', addProduct);
add.addEventListener('click', onAdd);
cancel.addEventListener('click', onCancel);
search.addEventListener('keyup', searchBar)
fill.addEventListener('change', filterData)
btnClearFilter.addEventListener('click', clearFilter)
btnExit.addEventListener('click', exitDetail)

// ==============> CALL FUNTION HERE <==================
categoryfillter()
renderProduct()




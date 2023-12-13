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
    let totalPrice = 0;
    for (let listProduct of dataStore.products) {

        let tRow = createElement('tr');

        let tdId = createElement('td');
        tdId.textContent = "00" + listProduct.id;

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
        totalPrice += parseInt(tdTotalPrice.textContent);
    }

    total.textContent = parseInt(totalPrice) + '$'


}

function addProduct() {
    show(addInput)
    categorySelect()
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

function categorySelect() {
    for (let listcat of dataStore.categories) {
        let option = createElement('option');
        option.value = listcat;
        option.textContent = listcat;
        select.appendChild(option)

    }

}

function categoryfillter() {
    for (let listcat of dataStore.categories) {
        let option = createElement('option');
        option.value = listcat;
        option.textContent = listcat;
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


//===============> MAIN <====================
let table = getElement('table')
let tbody = getElement('tbody');
let btnAdd = getElement('.btn-add');
let addInput = getElement('#add-product')
let add = getElement('#btn-add');
let cancel = getElement('#btn-cancel');
let total = getElement('.total')
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


// ==============> CALL FUNTION HERE <==================
categoryfillter()
renderProduct()

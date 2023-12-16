
import { getElement, getElements, saveData, laodData, createElement, show, hide } from "../../js/locialstorage.js";

// =======================> FUNCTION <==========================
function renderCategory() {
    tbody.remove()
    let createTbody = document.createElement('tbody');

    for (let listCategory of dataStore.categories) {
        let tdRow = createElement('tr');

        let tdId = createElement('td');
        tdId.textContent = "00" + listCategory.Id;

        let tdName = createElement('td');
        tdName.textContent = listCategory.name;

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

        tdRow.appendChild(tdId);
        tdRow.appendChild(tdName);
        tdRow.appendChild(tdAction);
        createTbody.appendChild(tdRow);
        table.appendChild(createTbody);

    }

}


function addCategory() {
    show(addInput)
}

function onAdd(event) {
    event.preventDefault()
    if (inputName.value === '' || description.value === '') return alert('Form is empty cannot add!');
    let proId = dataStore.latestIdC;
    if (proId === 1 || dataStore.categories.length === 0) {
        proId = 2;
    } else {
        proId = proId + 1;
    }
    dataStore.latestIdC = proId;

    let name = inputName.value;
    let des = description.value;
    let category = {
        Id: proId,
        name: name,
        description: des,
    }
    dataStore.categories.push(category)

    saveData('dataStore', dataStore)
    console.log(dataStore)
    hide(addInput)
    window.location.reload()
}

function onCancel() {
    hide(addInput)
}

function onSave() {



}

//==================> TABLE <=================
let tbody = getElement("tbody");
let table = getElement('table')
//=================> GRT VALUE FROM INPUT <=====================
let inputName = getElement('.g-name input');
let description = getElement('.Description textarea')
let dataStore = laodData('dataStore');
// ===============> GET BUTTON HERE <====================
let add = getElement('#btn-add');
let cancel = getElement('#btn-cancel');
let btnAdd = getElement(".add-category button");
let addInput = getElement('#add-category')

//====================> ADD EVENLISTENER <====================
btnAdd.addEventListener("click", addCategory);
add.addEventListener('click', onAdd);
cancel.addEventListener('click', onCancel);

//=============> CALL FUNCTION HERE <=================

renderCategory(); 



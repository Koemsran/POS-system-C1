
import { getElement, getElements, saveData, laodData, createElement, show, hide } from "../../js/locialstorage.js";

// =======================> FUNCTION <==========================
function renderCategory() {
    let createTbody = document.createElement('tbody');

    for (let listCategory of category) {
        let tdRow = document.createElement('tr');

        let tdId = document.createElement('td');
        tdId.textContent = "000" + listCategory.id;

        let tdName = document.createElement('td');
        tdName.textContent = listCategory.name;

        let tdQuan = document.createElement('td');
        tdQuan.textContent = listCategory.quan;

        let tdAction = document.createElement('td');
        tdAction.textContent = listCategory.action;

        tdRow.appendChild(tdId);
        tdRow.appendChild(tdName);
        tdRow.appendChild(tdQuan);
        tdRow.appendChild(tdAction);

        createTbody.appendChild(tdRow);
    }

    table.appendChild(createTbody);
}


function addCategory() {
  show(addInput)
}

function onAdd(event){
    event.preventDefault()
    let name = inputName.value;
    let des = description.value;
    dataStore.categories.push(name)
    dataStore.description = des;
    saveData('dataStore', dataStore)
}

function onCancel(){
    hide(addInput)
}


//=================> GRT VALUE FROM INPUT <=====================
let inputName = getElement('.g-name input');
let description = getElement('.Description textarea')
let dataStore = laodData('dataStore');

// ===============> GET BUTTON HERE <====================
let add = getElement('#btn-add');
let cancel = getElement('#btn-cancel');
let btnAdd =getElement(".add-category button");
let addInput = getElement('#add-category')

//====================> ADD EVENLISTENER <====================
btnAdd.addEventListener("click", addCategory);
add.addEventListener('click', onAdd);
cancel.addEventListener('click', onCancel);

//=============> CALL FUNCTION HERE <=================

// renderCategory(); 


// Function to render categories
function renderCategory() {

    let createTbody = document.createElement('tbody');

    for (let listCategory of category) {

        let tdRow = document.createElement('tr');

        let tdId = document.createElement('td');
        tdId.textContent = "000" + listCategory.id;

        let tdName = document.createElement('td');
        tdName.textContent = listCategory.cateName;

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

function removecategory(){
}

function addNewCategory() {
}


function onCancelButton(event) {
}

function onAddButton(event) {  
}


function clearForm() { 
}


let table = document.getElementById("table");
let buttonAdd = document.getElementById("btn-add");
let CancelBtn = document.getElementById("btn-cancel");
// console.log(table)
buttonAdd.addEventListener('click', addNewCategory);
CancelBtn.addEventListener('click', onCancelButton);
// console.log(CancelBtn)
let inputCategoryId = document.getElementById('id');
let inputCategoryName = document.getElementById('cateName');
let inputCategoryQuan = document.getElementById('quan');
let inputCategoryAction = document.getElementById('action');
// console.log(inputCategoryId, inputCategoryName, inputCategoryQuan,inputCategoryAction);

// renderCategory();


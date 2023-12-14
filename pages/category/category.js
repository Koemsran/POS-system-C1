

// Function to render categories
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


function addNewCategory() {
  
}


function onCancelButton(event) {
    event.preventDefault(); 
    addCategory.style.display = 'none'; 
}

function onAddButton(event) {
    event.preventDefault(); 
    addCategory.style.display = 'block'; 
}


function clearForm() {
    
}


let table = document.getElementById("table");
let buttonAdd = document.getElementById("btn-add");
let CancelBtn = document.getElementById("btn-cancel");


buttonAdd.addEventListener('click', addNewCategory);
CancelBtn.addEventListener('click', onCancelButton);
addCategory.addEventListener('click', onAddButton);


let inputCategoryId = document.getElementById('id');
let inputCategoryName = document.getElementById('name');
let inputCategoryQuan = document.getElementById('quan');
let inputCategoryAction = document.getElementById('action');

renderCategory(); 

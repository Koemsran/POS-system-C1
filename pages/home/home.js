import { getElement, getElements, saveData, laodData, createElement, show, hide } from "../../js/locialstorage.js";

let incomeValue = laodData('historyData') || []
// ==============> GET CALUE FROM HTML <===============
let instock = getElement('#c1');
let category = getElement('#c2');
let soldout = getElement('#c3');
let income = getElement('#c4');

// ==============> GET DATA FROM LOCALSTOREAGE <===============
let dataStore = laodData('dataStore');


// ==============> GET VALUE TO CART <===============
let sumCategory = 0;
for (let value of dataStore.categories){
    sumCategory++
}
category.textContent = sumCategory;

let result = 0;
for (let value of incomeValue) {
    result += value;
}
income.textContent = result;

let store = 0;
for (let obj of dataStore.products) {
    store += parseInt(obj.quantity)
}
instock.textContent = store;
import { getElement, getElements, saveData, laodData, createElement, show, hide } from "../../js/locialstorage.js";

// ==============> GET CALUE FROM HTML <===============
let instock = getElement('#c1');
let category = getElement('#c2');
let soldout = getElement('#c3');
let income = getElement('#c4');
// ==============> GET DATA FROM LOCALSTOREAGE <===============
let dataStore = laodData('dataStore');
let dataSold = laodData('dataSoldout');
let dataIcome = laodData('dataIcome');
let Income = 0;
// ==============> GET VALUE TO CART <===============
category.textContent = dataStore.categories.length;
instock.textContent = dataStore.instock;
soldout.textContent = dataSold.totalqty;
for(let value of dataIcome.income){
    Income+=parseInt(value)
}
income.textContent = Income + '$';
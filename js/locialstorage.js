export function saveData(key, value){
    localStorage.setItem(key, JSON.stringify(value))
}
export function laodData(key){
    return JSON.parse(localStorage.getItem(key))
}
export function removeData(key){
    return localStorage.removeItem(key)
}
export function getElement(element){
    return document.querySelector(element)
}
export function getElements(element){
    return document.querySelectorAll(element)
}
export function createElement(element){
    return document.createElement(element)
}
export function hide(element){
    element.style.display = 'none';
}
export function show(element){
    element.style.display = '';
}


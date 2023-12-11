//Main 
let userName = document.querySelector('#user-name');
let password = document.querySelector('#user-password');
let btnLogin = document.querySelector('.btn-login button');
let container = document.querySelector(".container");
let passError = document.querySelector('.pass-error');
let nameError = document.querySelector('.name-error');
let startLogin = document.querySelector('.start-login');
let iconEye = document.querySelector(".psw a ");

function logIn(e) {
    e.preventDefault()
    if (userName.value === "pos" && password.value == 1234) {
        show(container);
        hide(startLogin)
        hide(nameError)
        hide(passError)
    }
    if (userName.value === 'pos') {
        hide(nameError);
    } else {
        show(nameError)
    }
    if (password.value === 1234) {
        hide(passError);

    } else {
        show(passError)
        iconEye.style.top = ': -100px'

    }
    userName.value = ''
    password.value = ''

}

btnLogin.addEventListener('click', logIn)

function show(element) {
    element.style.display = 'block';
}

function hide(element) {
    element.style.display = 'none';
}
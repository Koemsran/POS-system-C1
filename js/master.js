//<============== MAIN OF FORM LOGIN ==================>

let userName = document.querySelector('#user-name');
let password = document.querySelector('#user-password');
let btnLogin = document.querySelector('.btn-login button');
let container = document.querySelector(".container");
let passError = document.querySelector('.pass-error');
let nameError = document.querySelector('.name-error');
let startLogin = document.querySelector('.start-login');
let iconEye = document.querySelector(".input-pass .off");
let showPassIcon = document.querySelector('.input-pass .on');


//<================ LOG IN FUNCTION ===================>

function logIn(e) {
    e.preventDefault()
    if (userName.value === "pos" && password.value === "1234") {
        window.location.href = 'http://127.0.0.1:5500/pages/home/home.html'
        hide(startLogin)
        hide(nameError)
        hide(passError)
    }
    if (userName.value === 'pos') {
        hide(nameError);
    } else {
        show(nameError)
    }
    if (password.value === "1234") {
        hide(passError);

    } else {
        show(passError)

    }
    userName.value = ''
    password.value = ''

}

//<================ SHOW PASSWORD FUNCTION ===================>

function showPassword(e){
    e.preventDefault()
    if(password.type === 'password'){
        password.type = 'text';
        hide(iconEye)
        show(showPassIcon)

    }
}

//<================ HIDE PASSWORD FUNCTION ===================>

function hihdePassword(e){
    e.preventDefault()
    if(password.type !== 'password'){
        password.type = 'password';
        show(iconEye)
        hide(showPassIcon)

    }

}

//===================== Eventlistener ========================

btnLogin.addEventListener('click', logIn)
iconEye.addEventListener('click', showPassword)
showPassIcon.addEventListener('click', hihdePassword)

//<================ HIDE AND SHOW SOMETHING FUNCTION ===================>

function show(element) {
    element.style.display = 'block';
}

function hide(element) {
    element.style.display = 'none';
}




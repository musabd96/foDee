
// =============== PROFILE =============== //

const userBtn = document.getElementById('user-btn');
const loginRegisterSection = document.querySelector('.login-register');

userBtn.addEventListener('click', function() {
  loginRegisterSection.classList.toggle('hidden');
  if (loginRegisterSection.classList.contains('hidden')) {
    // remove the color style
    userBtn.style.color = '';
  } else {
    // set the color style
    userBtn.style.color = '#3B8419';
  }
});


// =============== LOGIN/REGISTER =============== //

const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login__link');
const registerLink = document.querySelector('.registration__link');

registerLink.addEventListener('click', () =>{
    wrapper.classList.add('register');
});
loginLink.addEventListener('click', () =>{
    wrapper.classList.remove('register');
});

function goBack() {
    cartBtn.style.backgroundColor = '#3E464E';
    window.history.back();
}


/* =============== CART BAR =============== */

const cartItemContainer = document.querySelector('.cart-item-container');
const cartBtn = document.getElementById('cart-btn');
document.querySelector('#cart-btn').onclick = () =>{
    cartItemContainer.classList.toggle('active');

    if (cartItemContainer.classList.contains('active')) {
        // set the color style
        cartBtn.style.color = '#3B8419';
    } else {
        // remove the color style
        cartBtn.style.color = '';
    }
}




/* =============== MENU BAR =============== */

const navBar = document.querySelector('.navbar');
const menuBtn = document.getElementById('menu-btn');
document.querySelector('#menu-btn').onclick = () =>{
    navBar.classList.toggle('active');

    if (navBar.classList.contains('active')) {
        // set the color style
        menuBtn.style.color = '#3B8419';
    } else {
        // remove the color style
        menuBtn.style.color = '';
    }
}

/* =============== NAV =============== */



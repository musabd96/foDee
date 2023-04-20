
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
const registerLink = document.querySelector('.register__link');

registerLink.addEventListener('click', () =>{
    wrapper.classList.add('active');
})
loginLink.addEventListener('click', () =>{
    wrapper.classList.remove('active');
})

function goBack() {
    cartBtn.style.backgroundColor = '#3E464E';
    window.history.back();
}


/* =============== CART BAR =============== */

const cartItemContainer = document.querySelector('.cart-item-container');

document.querySelector('#cart-btn').onclick = () =>{
    cartItemContainer.classList.toggle('active');
}


/* =============== MENU BAR =============== */

const navBar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navBar.classList.toggle('active');
}

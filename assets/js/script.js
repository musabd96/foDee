
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

document.addEventListener('click', function(event) {
  if (!loginRegisterSection.contains(event.target) && !userBtn.contains(event.target)) {
    loginRegisterSection.classList.add('hidden');
    userBtn.style.color = '';
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





/* =============== CART BAR =============== */

const cartPopup = document.querySelector('.cart__popup');
const cartBtn = document.getElementById('cart-btn');

// Open cart popup on click
document.querySelector('#cart-btn').onclick = () => {
  cartPopup.classList.toggle('hide');
  if (cartPopup.classList.contains('hide')) {
    cartBtn.style.color = '';
  } else {
    cartBtn.style.color = '#3B8419';
  }
};

// Close cart popup on outside click
document.addEventListener('click', function(event) {
  const isClickInsidePopup = cartPopup.contains(event.target);
  const isClickInsideBtn = cartBtn.contains(event.target);
  
  if (!isClickInsidePopup && !isClickInsideBtn) {
    cartPopup.classList.add('hide');
    cartBtn.style.color = '';
  }
});




/* =============== MENU BAR =============== */

const navBar = document.querySelector('.navbar');
const menuBtn = document.getElementById('menu-btn');

// Toggle navigation menu on click
document.querySelector('#menu-btn').onclick = () => {
  navBar.classList.toggle('active');
  if (navBar.classList.contains('active')) {
    menuBtn.style.color = '#3B8419';
  } else {
    menuBtn.style.color = '';
  }
};

// Close navigation menu on outside click
document.addEventListener('click', function(event) {
  const isClickInsideMenu = navBar.contains(event.target);
  const isClickInsideBtn = menuBtn.contains(event.target);
  
  if (!isClickInsideMenu && !isClickInsideBtn) {
    navBar.classList.remove('active');
    menuBtn.style.color = '';
  }
});


/* =============== NAV =============== */



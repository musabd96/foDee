
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
const menuBtn = document.querySelector('.fa-bars');
const closeBtn = document.querySelector('.fa-times');


document.querySelector('#menu-btn').onclick = () =>{
    
    
    menuBtn.style.display = 'none';
    closeBtn.style.display = 'inline-block';
    closeBtn.style.color = 'red';
    navBar.classList.add('active');     
}

closeBtn.addEventListener('click', () =>{
    navBar.classList.remove('active');
    closeBtn.style.display = 'none';
    menuBtn.style.display = 'inline-block';
    menuBtn.style.color = '';
})

/* =============== NAV =============== */


const navLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section');


navLinks.forEach(link => {
  link.addEventListener('click', () => {
    
    const sectionId = link.getAttribute('href');
    sections.forEach(section => {
      if (section.id === sectionId) {
        section.style.display = 'flex';
      } else {
        section.style.display = 'none';
      }
    });
  });
});



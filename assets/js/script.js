
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

const cartPopup = document.querySelector('.cart__items-container');
const cartBtn = document.getElementById('cart-btn');

// Open cart popup on click
document.querySelector('#cart-btn').onclick = () => {
  cartPopup.classList.toggle('hidden');
  if (cartPopup.classList.contains('hidden')) {
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
    cartPopup.classList.add('hidden');
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
const navLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section');
const checkoutBtn = document.querySelector('#checkout-btn');
const logoBtn = document.querySelector('#logo__btn');
const homeLink = document.getElementById('#home');
const checkoutMenuBtn = document.querySelector('#checkout__menu-btn');
const menuLink = document.getElementById('#menu');

logoBtn.addEventListener('click', function() {
  
  const homeSection = document.querySelector(this.hash);
  homeSection.classList.remove('hidden');
  sections.forEach(section => {
    if (section !== homeSection) {
      section.classList.add('hidden');
      cartBtn.style.display = '';
    }
  });

  // Highlight the logo button
  navLinks.forEach(link => {
    if (link !== logoBtn) {
      link.classList.remove('active');
      link.style.color = '';
    }
  });
  logoBtn.classList.add('active');
  homeLink.style.color = '#3B8419';
});

checkoutMenuBtn.addEventListener('click', function() {
  
  const menuSection = document.querySelector(this.hash);
  menuSection.classList.remove('hidden');
  sections.forEach(section => {
    if (section !== menuSection) {
      section.classList.add('hidden');
    }
  });

  
  navLinks.forEach(link => {
    link.classList.remove('active');
    link.style.color = '';
  });
  menuLink.classList.add('active');
  menuLink.style.color = '#3B8419';
});



navLinks.forEach(link => {
  link.addEventListener('click', function() {
    
    const sectionToShow = document.querySelector(this.hash);
    sectionToShow.classList.remove('hidden');
    
    sections.forEach(section => {
      if (section !== sectionToShow) {
        section.classList.add('hidden');
        cartBtn.style.display = '';
      }
    });
    
    
    navLinks.forEach(otherLink => {
      if (otherLink !== this) {
        otherLink.classList.remove('active');
        otherLink.style.color = '';
      }
    });
    this.classList.add('active');
    this.style.color = '#3B8419';
  });
  
  
  checkoutBtn.addEventListener('click', function() {
    
    const cartSection = document.querySelector(this.hash);
    cartSection.classList.remove('hidden');
    sections.forEach(section => {
      if (section !== cartSection) {
        section.classList.add('hidden');
        cartPopup.classList.add('hidden');
      }
    });
    
    
    navLinks.forEach(link => {
      if (link !== checkoutBtn) {
        link.classList.remove('active');
        link.style.color = '';
      }
    });
    checkoutBtn.classList.add('active');
    cartBtn.style.display = 'none';
  });

  
});



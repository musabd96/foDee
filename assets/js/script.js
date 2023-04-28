
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
const homeLink = document.getElementById('#home__btn');
const checkoutMenuBtn = document.querySelector('#checkout__menu-btn');
const menuLink = document.getElementById('#menu__btn');
const userBtn = document.querySelector('#user-btn');

logoBtn.addEventListener('click', function() {
  // Show the home section and hide all other sections
  const homeSection = document.querySelector(this.hash);
  homeSection.classList.remove('hidden');
  sections.forEach(section => {
    if (section !== homeSection) {
      section.classList.add('hidden');
      userBtn.style.color = '';
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
  // Show the menu section and hide all other sections
  const menuSection = document.querySelector(this.hash);
  menuSection.classList.remove('hidden');
  sections.forEach(section => {
    if (section !== menuSection) {
      section.classList.add('hidden');
    }
  });

  // Highlight the menu link
  navLinks.forEach(link => {
    link.classList.remove('active');
    link.style.color = '';
  });
  menuLink.classList.add('active');
  menuLink.style.color = '#3B8419';
});

userBtn.addEventListener('click', function() {
  // Show the login/register section and hide all other sections
  const loginSection = document.querySelector('.login-register');
  loginSection.classList.remove('hidden');
  sections.forEach(section => {
    if (section !== loginSection) {
      section.classList.add('hidden');
      userBtn.style.color = '';
    }
  });

  // Highlight the user button
  navLinks.forEach(link => {
    if (link !== userBtn) {
      link.classList.remove('active');
      link.style.color = '';
    }
  });
  userBtn.classList.add('active');
  userBtn.style.color = '#3B8419';
});

navLinks.forEach(link => {
  link.addEventListener('click', function() {
    // Show the section corresponding to the clicked link
    const sectionToShow = document.querySelector(this.hash);
    sectionToShow.classList.remove('hidden');
    // Hide all other sections
    sections.forEach(section => {
      if (section !== sectionToShow) {
        section.classList.add('hidden');
        userBtn.style.color = '';
        cartBtn.style.display = ''
      }
    });
    
    // Highlight the clicked link
    navLinks.forEach(otherLink => {
      if (otherLink !== this) {
        otherLink.classList.remove('active');
        otherLink.style.color = '';
      }
    });
    this.classList.add('active');
    this.style.color = '#3B8419';
  });
  
  // Add event listener to Checkout button
  checkoutBtn.addEventListener('click', function() {
    // Show the cart section and hide all other sections
    const cartSection = document.querySelector(this.hash);
    cartSection.classList.remove('hidden');
    sections.forEach(section => {
      if (section !== cartSection) {
        section.classList.add('hidden');
        cartPopup.classList.add('hidden');
        cartBtn.style.display = 'none'
      }
    });
    
    // Highlight the Checkout button
    navLinks.forEach(link => {
      if (link !== checkoutBtn) {
        link.classList.remove('active');
        link.style.color = '';
      }
    });
    checkoutBtn.classList.add('active');
    userBtn.style.color = '';
  });
});




/* =============== Payment =============== */

const cartList = document.querySelector('.cart__list');
const billing = document.querySelector('.billing');
const paymen = document.querySelector('.payment');


document.querySelector('#billing__btn').onclick = () => {
  cartList.classList.toggle('hidden');
  billing.classList.remove('hidden');
}

document.querySelector('#payment__btn').onclick = () => {
  const nameInput = document.querySelector('.billing input[type="text"][placeholder="full name"]');
  const emailInput = document.querySelector('.billing input[type="email"][placeholder="example@example.com"]');
  const addressInput = document.querySelector('.billing input[type="text"][placeholder="street address"]');
  const cityInput = document.querySelector('.billing input[type="text"][placeholder="Stockholm"]');
  const countryInput = document.querySelector('.billing input[type="text"][placeholder="sweden"]');
  const zipInput = document.querySelector('.billing input[type="text"][placeholder="123 45"]');
  
  // Perform validation on form fields here
  let isValid = true;
  if (nameInput.value.trim() === '') {
    nameInput.classList.add('error');
    isValid = false;
  } else {
    nameInput.classList.remove('error');
  }
  
  if (!emailInput.checkValidity()) {
    emailInput.classList.add('error');
    isValid = false;
  } else {
    emailInput.classList.remove('error');
  }
  
  if (addressInput.value.trim() === '') {
    addressInput.classList.add('error');
    isValid = false;
  } else {
    addressInput.classList.remove('error');
  }
  
  if (cityInput.value.trim() === '') {
    cityInput.classList.add('error');
    isValid = false;
  } else {
    cityInput.classList.remove('error');
  }
  
  if (countryInput.value.trim() === '') {
    countryInput.classList.add('error');
    isValid = false;
  } else {
    countryInput.classList.remove('error');
  }
  
  if (zipInput.value.trim() === '') {
    zipInput.classList.add('error');
    isValid = false;
  } else {
    zipInput.classList.remove('error');
  }
  
  if (isValid) {
    billing.classList.toggle('hidden');
    paymen.classList.remove('hidden');
  }
};


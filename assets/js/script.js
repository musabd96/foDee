window.onload = function() {
  window.location.href = "#home";
};
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
        cartList.classList.toggle('hidden');
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




/* =============== BILLING =============== */

const home = document.querySelector('.home');
const cart = document.querySelector('.cart');
const cartList = document.querySelector('.cart__list');
const billing = document.querySelector('.billing');
const payment = document.querySelector('.payment');

document.querySelector('#billing__btn').onclick = () => {
  cartList.classList.toggle('hidden');
  billing.classList.remove('hidden');
};

const billingForm = document.querySelector('.billing form');
const billingInputs = billingForm.querySelectorAll('input');
const errorIcons = billingForm.querySelectorAll('.error-icon');
const inputBox= billingForm.querySelectorAll('.inputbox input');

function validateInputs() {
  let valid = true;
  billingInputs.forEach((input, index) => {
    if (!input.value) {
      errorIcons[index].classList.add('error__icon');
      inputBox[index].classList.add('error');
      valid = false;
    } 
  });
  return valid;
}

document.querySelector('#payment__btn').onclick = () => {
  if (validateInputs()) {
    billing.classList.add('hidden'); 
    payment.classList.remove('hidden'); 
  }
};

const paymentForm = document.querySelector('.payment form');
const paymentInputs = paymentForm.querySelectorAll('input');
const paymentErrorIcons = paymentForm.querySelectorAll('.error-icon');
const paymentInputBox = paymentForm.querySelectorAll('.inputbox input');


function validatePaymentInputs() {
  let valid = true;
  paymentInputs.forEach((input, index) => {
    if (!input.value) {
      paymentErrorIcons[index].classList.add('error__icon');
      paymentInputBox[index].classList.add('error');
      valid = false;
    } 
  });
  return valid;
}

document.querySelector('#buy__btn').onclick = () => {
  if (validatePaymentInputs()) {
    // cart to order
    showLoading();
    // payment.classList.add('hidden');
    // cart.classList.add('hidden');
    // cartBtn.style.display = '';
    // cartList.classList.remove('hidden');
    // order.classList.remove('hidden');

  }
};

billingInputs.forEach((input, index) => {
  input.oninput = () => {
    errorIcons[index].classList.remove('error__icon');
    inputBox[index].classList.remove('error');
  };
});

paymentInputs.forEach((input, index) => {
  input.oninput = () => {
    paymentErrorIcons[index].classList.remove('error__icon');
    paymentInputBox[index].classList.remove('error');
  };
});




/* =============== SWAL ALERTS =============== */

function showOrderReceivedAlert() {
  Swal.fire({
    title: 'Sweet!',
    text: 'Order received! Your food is on the way! Enjoy.',
    imageUrl: 'https://media2.giphy.com/media/cmCHuk53AiTmOwBXlw/200w.gif?cid=6c09b9522woj2ew8u0wzjsqp2ya1px05g7398hzlksi1uekh&rid=200w.gif&ct=g',
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: 'Custom image',
    customClass: {
      content: 'my-custom-class',
      confirmButton: 'my-button-class'
    }
  }).then((result) => {
    if (result.isConfirmed) {
      order.classList.remove('hidden');
      
    } else {
      
      home.classList.remove('hidden');
      homeLink.style.color = '#3B8419';
    }
  }).finally(() => {
    // Code to be executed after the popup is closed, regardless of whether the user clicked OK or dismissed the popup
    cartBtn.style.display = '';
    payment.classList.add('hidden');
    cart.classList.add('hidden');
    cartList.classList.remove('hidden');
  });
  
}


function showPaymentSuccess(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Your payment successed',
    showConfirmButton: false,
    timer: 3000,
    customClass: {
      container: 'swal-container',
      popup: 'swal-popup',
      title: 'swal-title',
      content: 'swal-text'
    }
  })
}

function showLoading(){
  let timerInterval
Swal.fire({
    title: ' Payment Processing!',
    html: 'Thank you for your purchase! We are processing your payment',
    timer: 5000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      const b = Swal.getHtmlContainer().querySelector('b')
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      showPaymentSuccess();
      setTimeout(function() {
        showOrderReceivedAlert();
      }, 3000);
    }
  })
}



function showSection(sectionId) {
  // Hide all sections
  var sections = document.getElementsByTagName('section');
  for (var i = 0; i < sections.length; i++) {
    sections[i].classList.add('hidden');
  }

  // Show the requested section
  var section = document.getElementById(sectionId);
  if (section) {
    section.classList.remove('hidden');
    
    // Update navigation links to show active section
    var navLinks = document.querySelectorAll('.navbar a');
    for (var i = 0; i < navLinks.length; i++) {
      var link = navLinks[i];
      if (link.getAttribute('href') === '#' + sectionId) {
        link.classList.add('active');
        link.style.color = '#3B8419';
      } else {
        link.classList.remove('active');
        link.style.color = '';
      }
    }
  }
}

// Show the correct section based on the initial path
showSection(window.location.hash.slice(1));

// Show or hide sections when the path changes
window.onhashchange = function() {
  showSection(window.location.hash.slice(1));
};






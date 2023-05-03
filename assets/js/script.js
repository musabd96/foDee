window.onload = function() {
  if(window.location.href !== 'http://localhost:4000/#account'){

    window.location.href = "#home";
  }
  
};

// Get the initial URL
var currentUrl = window.location.href;

// Check for URL changes
window.addEventListener('hashchange', function() {
  var newUrl = window.location.href;
  // const customerEmail = localStorage.getItem('login_email');
  const loginSection = document.querySelector(".login-register"); 
  const accountSection = document.querySelector('.account');
  // If the URL has changed, block the section
  if (newUrl === 'http://localhost:4000/#account') {
    console.log(customerEmail);
    if(customerEmail !== null){
      console.log('email ok')
      accountSection.classList.remove('blocked');
      loginSection.classList.remove("must_login"); 
      accountSection
    }else{
      console.log('email not ok')
      accountSection.classList.add('blocked');
      loginSection.classList.add("must_login"); 

    }
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
// const sections = document.querySelectorAll('section');
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

/* =============== Country opstion =============== */
document.addEventListener('DOMContentLoaded', () => {
  const countries = document.querySelector('#countries');

  // Add a default "Select country" option
  countries.innerHTML = '<option value="" selected>Select country</option>';

  fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => {
      data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      let output = '';
      data.forEach(country => {
        output += `<option>${country.name.common}</option>`;
      });
      countries.innerHTML += output;
    })
    .catch(err => {
      console.log(err);
    });
});


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


/* =============== login =============== */

//if the user already login or it not 
userBtn.addEventListener('click', () => {
  const customerFullname = localStorage.getItem('customer_fullname');
  const profileEl = document.querySelector('.profile');
  const wrapperEl = document.querySelector('.wrapper');

  if (customerFullname) {
    // customerFullname is not empty, show profile and hide wrapper
    if(profileEl.classList == 'profile hidden'){
      profileEl.classList.remove('hidden');
      userBtn.style.color = '#3B8419';
    } else{
      profileEl.classList.add('hidden');
      userBtn.style.color = '';
    }
    wrapperEl.classList.add('hidden');
  } else {
    // customerFullname is empty, show wrapper and hide profile
    wrapperEl.classList.remove('hidden');
    profileEl.classList.add('hidden');
  }
});


//if the user click out side the profile or login section will close the popup
const profileEl = document.querySelector('.profile');
document.addEventListener('click', function(event) {
  const isClickInsidePopup = profileEl.contains(event.target);
  const isClickInsideBtn = userBtn.contains(event.target);
  
  if (!isClickInsidePopup && !isClickInsideBtn) {
    profileEl.classList.add('hidden');
    userBtn.style.color = '';
  }
});



//login DB

const loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', (event) => {
  event.preventDefault(); // prevent the default form submission

  const email = document.querySelector('#login__email').value;
  const password = document.querySelector('#password').value;

  fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      email: email,
      password: password
    })
  })
  .then(response => {
    if (response.ok) {
      response.json().then(data => {
        if (data.isLoggedIn) {
          // Save user data to localStorage
          localStorage.setItem('login_email', data.login_email);
          localStorage.setItem('customer_id', data.customer_id);
          localStorage.setItem('customer_fullname', data.customer_fullname);
          localStorage.setItem('customer_phone', data.customer_phone);
          localStorage.setItem('customer_address', data.customer_address);
          localStorage.setItem('customer_city', data.customer_city);
          localStorage.setItem('customer_country', data.customer_country);
          localStorage.setItem('customer_zipcode', data.customer_zipcode);
          console.log('data.customer_fullname: ', data.customer_fullname )
          // Check if user is logging in for the first time
          if (data.customer_fullname === null) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Welcome to FoDee',
              text: 'Please update your profile.',
              showConfirmButton: false,
              timer: 3000,
              customClass: {
                container: 'swal-container',
                popup: 'swal-popup',
                title: 'swal-title',
                content: 'swal-text'
              }
            });
            
            // Redirect to account page after timeout
            setTimeout(function() {
              setTimeout(function() {
                location.reload();
              }, 1000);
              window.location.href = '/#account';
            }, 1000);
          } else {
            
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Login successful',
              showConfirmButton: false,
              timer: 3000,
              customClass: {
                container: 'swal-container',
                popup: 'swal-popup',
                title: 'swal-title',
                content: 'swal-text'
              }
            });

            // Reload the page after timeout
            setTimeout(function() {
              window.location.href = '/#home';
              location.reload();
            }, 3000);
          }
        } else {
          console.log('Invalid username or password');
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Invalid username or password',
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
    } else {
      console.log('Error:', response.status);
    }
  })
  .catch(error => console.error(error));
});


const nameSpan = document.querySelector('#name');
const fullnameSpan = document.querySelector('#customer_fullname');
const iDSpan = document.querySelector('#customer-id');
const phoneSpan = document.querySelector('#number');
const emailSpan = document.querySelector('#customer_email');
const streetAddressSpan = document.querySelector('#street__address');
const cityNameSpan = document.querySelector('#city__name');
const countrySpan = document.querySelector('#state');
const zipCodeSpan = document.querySelector('#zipCode');


var customerEmail = localStorage.getItem('login_email');
var customerId = localStorage.getItem('customer_id');
var customerFullname = localStorage.getItem('customer_fullname');

// console.log(customerFullname);
var customerPhone = localStorage.getItem('customer_phone');
var customerAddress = localStorage.getItem('customer_address');
var customerCity = localStorage.getItem('customer_city');
var customerState = localStorage.getItem('customer_country');
var customerZipcode = localStorage.getItem('customer_zipcode');



iDSpan.innerHTML = customerId;
emailSpan.innerHTML = customerEmail;





if(customerFullname != 'null'){
  fullnameSpan.innerHTML = customerFullname;
  nameSpan.innerHTML = customerFullname;
} else {
  fullnameSpan.innerHTML = "";
  nameSpan.innerHTML = '';
}

if(customerPhone != 'null'){
  phoneSpan.innerHTML = customerPhone;
} else {
  phoneSpan.innerHTML = "";
}

if(customerAddress != 'null'){
  streetAddressSpan.innerHTML = customerAddress;
} else {
  streetAddressSpan.innerHTML = "";
}

if(customerCity != 'null'){
  cityNameSpan.innerHTML = customerCity;
} else {
  cityNameSpan.innerHTML = "";
}

if(customerState != 'null'){
  countrySpan.innerHTML = customerState;
} else {
  countrySpan.innerHTML = "";
}

if(customerZipcode != 'null'){
  zipCodeSpan.innerHTML = customerZipcode;
} else {
  zipCodeSpan.innerHTML = "";
}


/* =============== log out =============== */

const logoutBtn = document.getElementById('logout');

logoutBtn.addEventListener('click', (event) => {
  event.preventDefault(); // prevent default link behavior
  
  // clear localStorage values
  localStorage.removeItem('login_email');
  localStorage.removeItem('customer_id');
  localStorage.removeItem('customer_fullname');
  localStorage.removeItem('customer_phone');
  localStorage.removeItem('customer_address');
  localStorage.removeItem('customer_city');
  localStorage.removeItem('customer_country');
  localStorage.removeItem('customer_zipcode');
  
  window.location.href = '/#home';
  location.reload();
});



/* =============== Register =============== */


const registerForm = document.querySelector('.register form');
registerForm.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent the default form submission

  const email = registerForm.querySelector('input[name="email"]').value;
  const password = registerForm.querySelector('input[name="password"]').value;

  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      email: email,
      password: password
    })
  })
  .then(response => {
    if (response.ok) {
      response.json().then(data => {
        if (data.isRegistered) {
          console.log('Registration successful');
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registration successful',
            showConfirmButton: false,
            timer: 3000,
            customClass: {
              container: 'swal-container',
              popup: 'swal-popup',
              title: 'swal-title',
              content: 'swal-text'
            }
          })
          setTimeout(function() {
            registerSuccessCallback();
          }, 3000);
        } else {
          console.log('Registration failed:', data.message);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Registration failed',
            text: data.message,
            showConfirmButton: false,
            timer: 2000
          })

        }
      });
    } else {
      console.log('Error:', response.status);
    }
  })
  .catch(error => console.error(error));
});


function registerSuccessCallback(){
  document.querySelector('.wrapper').classList.toggle('register');
}


/* =============== EDIT ACCOUNT =============== */
 // Get all the "edit" buttons
 const editButtons = document.querySelectorAll('.edit_personal-data, .edit__address');
    
 // Add a click event listener to each "edit" button
 editButtons.forEach(editButton => {
     editButton.addEventListener('click', () => {
         // Get the corresponding edit form and info section
         const editForm = editButton.parentNode.parentNode.querySelector('.edit__form');
         const infoSection = editButton.parentNode.parentNode.querySelector('.personal-data__info, .address__info');
         
         // Remove the "hidden" class from the edit form and hide the info section
         editForm.classList.remove('hidden');
         infoSection.classList.add('hidden');
         
         // Get the "Save" and "Cancel" buttons
         const saveButton = editForm.querySelector('.btn:nth-of-type(1)');
         const cancelButton = editForm.querySelector('.btn:nth-of-type(2)');
         
         // Add a click event listener to the "Save" button
         saveButton.addEventListener('click', () => {
             // Add the "hidden" class back to the edit form and show the info section
             editForm.classList.add('hidden');
             infoSection.classList.remove('hidden');
         });
         
         // Add a click event listener to the "Cancel" button
         cancelButton.addEventListener('click', () => {
             // Add the "hidden" class back to the edit form and show the info section
             editForm.classList.add('hidden');
             infoSection.classList.remove('hidden');
         });
     });
 });



 /* =============== SAVE EDIT ACCOUNT =============== */

const saveEdit = document.getElementById('save');

saveEdit.addEventListener('click', (event) =>{
  event.preventDefault();
  
  const email = customerEmail;
  const fullName = document.getElementById("fullname__input").value;
  const phone = document.getElementById("phone__input").value;
  const address = document.getElementById("address__input").value;
  const city = document.getElementById("city__input").value;
  const country = document.getElementById("country__input").value;
  const zipCode = document.getElementById("zip__code").value;
  console.log('email is : ', email)
  fetch('/saveEdit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      email: email,
      fullName: fullName,
      phone: phone,
      address: address,
      city: city,
      country: country,
      zipCode: zipCode
    })
  })
  .then(response => {
    if(response.ok) {
      response.json().then(data => {
        if(data.isSaved){
          console.log('saved register successfull');
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'account edit is successful',
            showConfirmButton: false,
            timer: 3000,
            customClass: {
              container: 'swal-container',
              popup: 'swal-popup',
              title: 'swal-title',
              content: 'swal-text'
            }
          })
          // location.reload();
          window.location.href = '/#account';
        }
      });
    }else {
      console.log('Error:', response.status);
    }
  })
  .catch(error => console.error(error));
})

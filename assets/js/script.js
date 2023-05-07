

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
      accountSection.classList.remove('blocked');
      loginSection.classList.remove("must_login");
      accountSection
    }else{
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


// update cart//

function updateCart() {
  fetch('/cart')
    .then(response => response.json())
    .then(cartItems => {
      renderCartItems(cartItems);
    })
    .catch(error => {
      console.log('Error fetching cart data:', error);
    });
}

const cartPopup = document.querySelector('.cart__items-container');
const cartBtn = document.getElementById('cart-btn');

// Open cart popup on click
document.querySelector('#cart-btn').onclick = () => {
  fetch('/cart')
    .then(response => response.json())
    .then(cartItems => {
      renderCartItems(cartItems);
      cartPopup.classList.toggle('hidden');
      if (cartPopup.classList.contains('hidden')) {
        cartBtn.style.color = '';
      } else {
        cartBtn.style.color = '#3B8419';
      }
    })
    .catch(error => {
      console.log('Error fetching cart data:', error);
    });
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
    
    // Fetch cart data and render products
    fetch('/cart')
    .then(response => response.json())
    .then(cart__products => {
      rendercartProducts(cart__products);
    })
    .catch(error => {
      console.log('Error fetching cart data:', error);
    });

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




/* =============== CART SECTION =============== */

/* =============== CART =============== */

const btn__cart = document.querySelector("#btn__cart");
const total = document.querySelector(".cart__items-total-price");
const cartEdit = document.querySelector(".cart__edit");
const cartItem = document.getElementById("cart__items-cards");
const btnCart = document.querySelector(".btn.cart");
const editCart = document.querySelector(".edit__cart");
const loginRegister = document.querySelector(".login-register");

console.log(cartItem)

btn__cart.addEventListener("click", function() {

  if(customerEmail){

    if (emtpy__cart.classList.contains('hidden')) {
      console.log('The emty__cart-items div contains the hidden class');

      total.classList.toggle("hidden");
      cartItem.classList.toggle("hidden");
      cartEdit.classList.toggle("hidden");
      btnCart.classList.toggle("hidden");
      editCart.classList.remove("hidden");
  
      deliveryEdit.classList.toggle("hidden");
      deliveryInfo.classList.toggle("hidden");
      editDelivery.classList.remove("hidden");
      customer__contect.classList.remove("hidden");
    }
    
  } else{
    
    loginRegister.classList.remove("hidden");
    
  }

  

});

/* ======== Edit Button ======== */
const edit__cartBtn= document.querySelector("#edit__cart-btn");

edit__cartBtn.addEventListener("click", function() {
  total.classList.toggle("hidden");
  cartItem.classList.toggle("hidden");
  cartEdit.classList.toggle("hidden");
  btnCart.classList.toggle("hidden");
  editCart.classList.add("hidden");

  deliveryEdit.classList.add("hidden");
  editDelivery.classList.add("hidden");
  deliveryInfo.classList.add("hidden");
  
  customer__address.classList.remove("hidden");
  customer__contect.classList.remove("hidden");
  customer__formInfo.classList.add("hidden");
  customer__formContact.classList.add("hidden");
  save__cancelBtn.classList.add("hidden");
  btn__address.classList.remove("hidden");


  console.log('edit cart')
  

  row.classList.add("hidden");
  btnPayment.classList.add("hidden");
})



/* =============== ADDRESS =============== */

const btn__address = document.querySelector("#btn__address");
const deliveryEdit = document.querySelector(".delivery__edit");
const editDelivery = document.querySelector(".edit_delivery");
const deliveryInfo = document.querySelector(".delivery__info");


btn__address.addEventListener("click", function() {

  deliveryEdit.classList.toggle("hidden");
  editDelivery.classList.remove("hidden");
  deliveryInfo.classList.toggle("hidden");
  paymentText.classList.toggle("hidden");
  

  row.classList.toggle("hidden");
  btnPayment.classList.toggle("hidden");

});

/* =============== Edit address =============== */

const edit_deliveryBtn= document.querySelector("#edit_delivery-btn");
const customer__address= document.querySelector(".customer__address");
const customer__contect= document.querySelector(".customer__contect");
const customer__formInfo= document.querySelector(".customer__form-info");
const customer__formContact= document.querySelector(".customer__form-contact");
const save__cancelBtn= document.querySelector(".save__cancel-btn");

edit_deliveryBtn.addEventListener("click", function() {
  if (deliveryInfo.classList.contains('hidden')) {
    customer__address.classList.remove('hidden');
    customer__contect.classList.remove('hidden');
    deliveryEdit.classList.remove('hidden');
    deliveryInfo.classList.remove('hidden');

    
  } else {
    
    const fullName = document.getElementById('customer_full-name').textContent;
    const street = document.getElementById('street').textContent;
    const city = document.getElementById('city').textContent;
    const zipCode = document.getElementById('zip_code').textContent;
    const country = document.getElementById('country').textContent;

    document.getElementById('fullname__input').value = fullName;
    document.getElementById('street__input').value = street;
    document.getElementById('city__input').value = city;
    document.getElementById('zip-code__input').value = zipCode;
    document.getElementById('countries__cart').value = country;
    
    console.log('country: ', country)

    const email = document.getElementById('email').textContent;
    const phone = document.getElementById('phone').textContent;

  
    const emailInput = document.getElementById('email__input');
    emailInput.value = email;
    emailInput.disabled = true;

    document.getElementById('phone__input').value = phone;




    customer__address.classList.add('hidden');
    customer__contect.classList.add('hidden');
    editDelivery.classList.add('hidden');
    customer__formInfo.classList.remove('hidden');
    customer__formContact.classList.remove('hidden');
    save__cancelBtn.classList.remove('hidden');
    btn__address.classList.add('hidden');


  }
  
  row.classList.add("hidden");
  btnPayment.classList.add("hidden");
})


const btnCustomerInfoSave= document.querySelector("#btn__customer__info-save");
btnCustomerInfoSave.addEventListener("click", function(event) {

  event.preventDefault();
  console.log('save__personal')

  var email = customerEmail;
  var fullName = document.getElementById("fullname__input").value;
  var phone = document.getElementById("phone__input").value;
  var street = document.getElementById('street').textContent;
  var city = document.getElementById('city').textContent;
  var zipCode = document.getElementById('zip-code__input').textContent;
  var country = document.getElementById('country').textContent;

  fullName = document.getElementById('fullname__input').value;
  street = document.getElementById('street__input').value;
  city = document.getElementById('city__input').value;
  zipCode = document.getElementById('zip-code__input').value;
  country = document.getElementById('countries__cart').value;

  document.getElementById('customer_full-name').textContent = fullName;
  document.getElementById('street').textContent = street;
  document.getElementById('city').textContent = city;
  document.getElementById('zip_code').textContent = zipCode;
  document.getElementById('country').textContent = country;



  var email = document.getElementById('email__input').value;
  var phone = document.getElementById('phone__input').value;

  document.getElementById('email').textContent = email;
  document.getElementById('phone').textContent = phone;


  localStorage.setItem('customer_fullname', fullName);
  localStorage.setItem('customer_phone', phone);
  localStorage.setItem('customer_address', street);
  localStorage.setItem('customer_city', city);
  localStorage.setItem('customer_country', country);
  localStorage.setItem('customer_zipcode', zipCode);
  
  fetch('/saveEdit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      email: email,
      fullName: fullName,
      phone: phone,
      street: street,
      city: city,
      zipCode: zipCode,
      country: country
    })
  })
  .then(response => {
    if(response.ok) {
      response.json().then(data => {
        if(data.isSaved){

          localStorage.setItem('customer_fullname', data.customer_fullname);
          localStorage.setItem('customer_phone', data.customer_phone);

          console.log('data.customer_fullname: ', data.customer_fullname )

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

          

          
          customer__address.classList.remove('hidden');
          customer__contect.classList.remove('hidden');
          editDelivery.classList.remove('hidden');
          customer__formInfo.classList.add('hidden');
          customer__formContact.classList.add('hidden');
          save__cancelBtn.classList.add('hidden');
          btn__address.classList.remove('hidden');
        }
      });
    }else {
      console.log('Error:', response.status);
    }
  })
  .catch(error => console.error(error));

})


const btnCustomerInfoCancel= document.querySelector("#btn__customer__info-cancel");
btnCustomerInfoCancel.addEventListener("click", function() {

  customer__address.classList.remove('hidden');
  customer__contect.classList.remove('hidden');
  editDelivery.classList.remove('hidden');
  customer__formInfo.classList.add('hidden');
  customer__formContact.classList.add('hidden');
  save__cancelBtn.classList.add('hidden');
  btn__address.classList.remove('hidden');

})


/* =============== Payment =============== */




const btn__payment = document.querySelector("#btn__payment");
const row = document.querySelector(".row");
const btnPayment = document.querySelector(".btn.payment");
const paymentText = document.querySelector(".payment__text");

 
btn__payment.addEventListener("click", function() {
  
  let OrderItems = [];

  fetch('/order')
    .then(response => response.json())
    .then(OrderItems => {
      renderCartItems(OrderItems, cart);
    })
    .catch(error => {
      console.log('Error fetching cart data:', error);
  });

  function renderCartItems(OrderItems) {
    console.log('cartItems in btn : ', OrderItems)
  }
  


  showLoading();
})

/* =============== Country opstion =============== */
document.addEventListener('DOMContentLoaded', () => {
  var countriesAccount = document.querySelector('#countries');
  var countriesCart = document.querySelector('#countries__cart');

  // Add a default "Select country" option
  countriesAccount.innerHTML = '<option value="" selected>Select country</option>';
  countriesCart.innerHTML = '<option value="" selected>Select country</option>';

  fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => {
      data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      let output = '';
      data.forEach(country => {
        output += `<option>${country.name.common}</option>`;
      });
      countriesAccount.innerHTML += output;
      countriesCart.innerHTML += output;
    })
    .catch(err => {
      console.log(err);
    });
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
      
      location.reload();
      window.location.href = '#order';

    } else {

      location.reload();
    }
  }).finally(() => {
    location.reload();
    window.location.href = '#order';

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
  let timerInterval = 0;
  Swal.fire({
    title: 'Payment Processing!',
    html: 'Thank you for your purchase! We are processing your payment',
    timer: 5000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      const b = Swal.getHtmlContainer().querySelector('b')
      if (b) {
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      }
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      showPaymentSuccess();
      setTimeout(function() {
        console.log('ok')
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
          localStorage.setItem('login_email', data.customer_email);
          localStorage.setItem('customer_id', data.customer_id);
          localStorage.setItem('customer_fullname', data.customer_fullname);
          localStorage.setItem('customer_phone', data.customer_phone);
          localStorage.setItem('customer_address', data.customer_address);
          localStorage.setItem('customer_city', data.customer_city);
          localStorage.setItem('customer_country', data.customer_country);
          localStorage.setItem('customer_zipcode', data.customer_zipcode);
          
          // Check if user is logging in for the first time
          if (data.customer_fullname === '') {
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


var nameSpan = document.querySelector('#name');
var fullnameAccountEdit = document.querySelector('#customer_fullname');
var fullnameCart = document.querySelector('#customer_full-name');
var iDSpan = document.querySelector('#customer-id');
var phoneSpan = document.querySelector('#number');
var phoneCart = document.querySelector('#phone');
var emailSpan = document.querySelector('#customer_email');
var emailCart = document.querySelector('#email');
var streetAddressSpan = document.querySelector('#street__address');
var streetAddressCart = document.querySelector('#street');
var cityNameSpan = document.querySelector('#city__name');
var cityNameCart = document.querySelector('#city');
var countrySpan = document.querySelector('#state');
var countryCart = document.querySelector('#country');
var zipCodeSpan = document.querySelector('#zipCode');
var zipCodeCart = document.querySelector('#zip_code');



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
emailCart.innerHTML = customerEmail;






if(customerFullname != 'null' || customerFullname != '' ){
  fullnameAccountEdit.innerHTML = customerFullname;
  fullnameCart.innerHTML = customerFullname;
  nameSpan.innerHTML = customerFullname;
  console.log('not ', customerFullname)
} else {
  fullnameAccountEdit.innerHTML = "";
  fullnameCart.innerHTML = "";
  nameSpan.innerHTML = '';
}

if(customerPhone != 'null'){
  phoneSpan.innerHTML = customerPhone;
  phoneCart.innerHTML = customerPhone;
} else {
  phoneSpan.innerHTML = "";
  phoneCart.innerHTML = "";
}

if(customerAddress != 'null'){
  streetAddressSpan.innerHTML = customerAddress;
  streetAddressCart.innerHTML = customerAddress;
} else {
  streetAddressSpan.innerHTML = "";
  streetAddressCart.innerHTML = "";
}

if(customerCity != 'null'){
  cityNameSpan.innerHTML = customerCity;
  cityNameCart.innerHTML = customerCity;
} else {
  cityNameSpan.innerHTML = "";
  cityNameCart.innerHTML = "";
}

if(customerState != 'null'){
  countrySpan.innerHTML = customerState;
  countryCart.innerHTML = customerState;
} else {
  countrySpan.innerHTML = "";
  countryCart.innerHTML = "";
}

if(customerZipcode != 'null'){
  zipCodeSpan.innerHTML = customerZipcode;
  zipCodeCart.innerHTML = customerZipcode;
} else {
  zipCodeSpan.innerHTML = "";
  zipCodeCart.innerHTML = "";
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
  console.log('registration form: ', 'email: ' , email , 'password: ', password);
  
  fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(response => {
    if (response.ok) {
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
    } else if (response.status === 409) {
      console.log('Registration failed:', response.statusText);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Registration failed',
        text: 'Email already exists',
        showConfirmButton: false,
        timer: 2000
      });
    } else {
      console.log('Registration failed:', response.statusText);
      response.json().then(data => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Registration failed',
          text: data.message || response.statusText,
          showConfirmButton: false,
          timer: 2000
        });
      });
    }
  })
  .catch(error => console.error(error));
});





document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault(); // prevent default form submit behavior
  register();
});

function register() {
  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const confirmPassword = document.querySelector('input[name="confirm__password"]').value;
  const agreeTerms = document.querySelector('input[type="checkbox"]').checked;

  // validate form data
  if (!email || !password || !confirmPassword) {
    alert('Please fill in all required fields');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  if (!agreeTerms) {
    alert('Please agree to the terms and conditions');
    return;
  }

  const data = {
    email: email,
    password: password,
  };

  fetch('/register', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Registration successful!');
    } else {
      alert(data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}




function registerSuccessCallback(){
  document.querySelector('.wrapper').classList.toggle('register');
}


/* =============== EDIT ACCOUNT =============== */
const editPersonalData = document.querySelectorAll('.edit_personal-data');



editPersonalData.forEach(editButton => {
  editButton.addEventListener('click', () => {
    
    const editForm = editButton.parentNode.parentNode.querySelector('.edit__form');
    const personalData = editButton.parentNode.parentNode.querySelector('.personal-data__info');

    
    editForm.classList.remove('hidden');
    personalData.classList.add('hidden');

    
    const fullNameInput = editForm.querySelector('#fullname__input');
    const phoneNumberInput = editForm.querySelector('#phone__input');

    fullNameInput.value = personalData.querySelector('.name').textContent;
    phoneNumberInput.value = personalData.querySelector('.number').textContent;

    console.log('fullNameInput: ', fullNameInput)
    
    
    const saveButton = editForm.querySelector('.btn:nth-of-type(1)');
    const cancelButton = editForm.querySelector('.btn:nth-of-type(2)');

    
    saveButton.addEventListener('click', () => {
      
        editForm.classList.add('hidden');
        personalData.classList.remove('hidden');
    });

    
    cancelButton.addEventListener('click', () => {
      
        editForm.classList.add('hidden');
        personalData.classList.remove('hidden');
    });
  });
});


const editAddress = document.querySelectorAll('.edit__address');


editAddress.forEach(editButton => {
  editButton.addEventListener('click', () => {
    
    const editForm = editButton.parentNode.parentNode.querySelector('.edit__form');
    const addressInfo = editButton.parentNode.parentNode.querySelector('.address__info');

    
    editForm.classList.remove('hidden');
    addressInfo.classList.add('hidden');

    const addressInput = editForm.querySelector('#address__input');
    const cityInput = editForm.querySelector('#city__input');
    const stateInput = editForm.querySelector('#countries');
    const stateElement = addressInfo.querySelector('.state');
    const zipCodeInput = editForm.querySelector('#zip__code');

    
    addressInput.value = addressInfo.querySelector('.street__address').textContent;
    cityInput.value = addressInfo.querySelector('.cityname').textContent;
    stateInput.value = stateElement.innerText;
    zipCodeInput.value = addressInfo.querySelector('.zipCode').textContent;
    
    
    
    const saveButton = editForm.querySelector('.btn:nth-of-type(1)');
    const cancelButton = editForm.querySelector('.btn:nth-of-type(2)');

    
    saveButton.addEventListener('click', () => {
      
        editForm.classList.add('hidden');
        addressInfo.classList.remove('hidden');
        
    });

    
    cancelButton.addEventListener('click', () => {
      
        editForm.classList.add('hidden');
        addressInfo.classList.remove('hidden');
    });
  });
});

/* =============== SAVE EDIT ACCOUNT =============== */


const savePersonalDataEdit = document.getElementById("save__personal-data-edit");

savePersonalDataEdit.addEventListener('click', (event) =>{
  event.preventDefault();
  console.log('save__personal')
  const email = customerEmail;
  const fullName = document.getElementById("fullname__input").value;
  const phone = document.getElementById("phone__input").value;

  fetch('/saveEdit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      email: email,
      fullName: fullName,
      phone: phone
    })
  })
  .then(response => {
    if(response.ok) {
      response.json().then(data => {
        if(data.isSaved){

          localStorage.setItem('customer_fullname', data.customer_fullname);
          localStorage.setItem('customer_phone', data.customer_phone);

          console.log('data.customer_fullname: ', data.customer_fullname )

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
          location.reload();
          // window.location.href = '/#account';
        }
      });
    }else {
      console.log('Error:', response.status);
    }
  })
  .catch(error => console.error(error));
})


const saveAddressEdit = document.getElementById("save__address-edit");

saveAddressEdit.addEventListener('click', (event) =>{
  event.preventDefault();
  const email = customerEmail;
  const address = document.getElementById("address__input").value;
  const city = document.getElementById("city__input").value;
  const country = document.getElementById("countries").value;
  const zipCode = document.getElementById("zip__code").value;

  console.log(address)

  fetch('/saveEdit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      email: email,
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
          
          localStorage.setItem('customer_address', data.customer_address);
          localStorage.setItem('customer_city', data.customer_city);
          localStorage.setItem('customer_country', data.customer_country);
          localStorage.setItem('customer_zipcode', data.customer_zipcode);

          console.log('data.customer_address: ', data.customer_address )

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
          location.reload();
          // window.location.href = '/#account';
        }
      });
    }else {
      console.log('Error:', response.status);
    }
  })
  .catch(error => console.error(error));
})



/* =============== PRODUCT MENU =============== */  




/* =============== search =============== */  
$(".searchbtn").click(function(){
  $(this).toggleClass("bg-green");
  $(".fas").toggleClass("color-white");
  $(".input").focus().toggleClass("active-width").val('');
});



// Get the product data from the JSON file
const productContainer = document.getElementById('product-container');
let products = [];


fetch('/assets/json/product.json')
  .then(response => response.json())
  .then(data => {
    products = data;
    renderProducts(products); // Render all products initially
  })
  .catch(error => console.error(error));

// Add event listener to the search input field
const searchInput = document.querySelector('.input');
searchInput.addEventListener('input', event => {
  const searchQuery = event.target.value.toLowerCase();
  const filteredProducts = products.filter(product => {
    return product.name.toLowerCase().includes(searchQuery);
  });
  renderProducts(filteredProducts); // Render the filtered products
});

// Helper function to render the products
function renderProducts(products) {
  productContainer.innerHTML = ''; // Clear the container first
  products.forEach(product => {
    const productBox = `
      <div class="box" data-name="${product.name}">
        <img src="${product.image_url}" alt="${product.name}">
        <h3>${product.name}</h3>
        <div class="price">$${product.price.toFixed(2)}</div>
        <button class="btn add-to-cart-btn" data-name="${product.name}">Add to Cart</button>
      </div>
    `;
    
    productContainer.insertAdjacentHTML('beforeend', productBox);
  });
}

productContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-to-cart-btn')) {
    const productName = event.target.getAttribute('data-name');
    console.log(`Clicked on ${productName}`);
    // Add your code to handle the button click here

    const selectedProduct = products.find(product => product.name === productName);
    
    fetch('/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectedProduct)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  }
});




/* =============== PRODUCT Cart =============== */  

const emptyCart = document.querySelector('.empty__cart');
const checkout__btn = document.getElementById('checkout-btn');
const cartContainer = document.getElementById('cartItemsContainer');

let cartItems = [];

fetch('/cart')
  .then(response => response.json())
  .then(cartItems => {
    renderCartItems(cartItems, cart);
  })
  .catch(error => {
    console.log('Error fetching cart data:', error);
});

function renderCartItems(cartItems) {
  cartContainer.innerHTML = ''; // Clear the container first
  let total = 0; // Initialize the total to zero
  if(cartItems.length === 0){
    emptyCart.classList.remove('hidden');
    checkout__btn.style.display = 'none';
  } else {
    checkout__btn.style.display = '';
    emptyCart.classList.add('hidden');
    cartItems.forEach(item => {
      const cartItem = `
        <div class="cart__item" data-name="${item.name}">
          <img src="${item.image_url}" alt="${item.name}">
          <div class="content">
            <h3>${item.name}</h3>
            <div class="quantity">
              <select class="item-quantity" data-name="${item.name}">
                <option value="1"${item.quantity === 1 ? ' selected' : ''}>1</option>
                <option value="2"${item.quantity === 2 ? ' selected' : ''}>2</option>
                <option value="3"${item.quantity === 3 ? ' selected' : ''}>3</option>
                <option value="4"${item.quantity === 4 ? ' selected' : ''}>4</option>
                <option value="5"${item.quantity === 5 ? ' selected' : ''}>5</option>
                <option value="6"${item.quantity === 6 ? ' selected' : ''}>6</option>
                <option value="7"${item.quantity === 7 ? ' selected' : ''}>7</option>
                <option value="8"${item.quantity === 8 ? ' selected' : ''}>8</option>
                <option value="9"${item.quantity === 9 ? ' selected' : ''}>9</option>
                <option value="10"${item.quantity === 10 ? ' selected' : ''}>10</option>
              </select>
              <a  class="fas fa-trash remove-item" data-name="${item.name}"></a>
            </div>
            <div class="item__price">$${(item.price * item.quantity).toFixed(2)}</div>
          </div>
        </div>
      `;
      cartContainer.insertAdjacentHTML('beforeend', cartItem);
      total += item.price * item.quantity; // Add the price of the current item to the total
    });
    const totalElement = document.createElement('div');
    totalElement.classList.add('total');
    totalElement.textContent = `total: $${total.toFixed(2)}`;
    cartContainer.insertAdjacentElement('beforeend', totalElement);
  }

}




/* =============== PRODUCT Cart UPDATE ITEMS=============== */

// Add an event listener to the quantity select element
cartContainer.addEventListener('change', event => {
  const target = event.target;

  // Check if the event is triggered by a quantity select element
  if (target.classList.contains('item-quantity')) {
    const itemName = target.dataset.name;
    const itemQuantity = parseInt(target.value);

    // Send an HTTP PUT request to update the cart item quantity
    fetch(`/api/cart/${itemName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity: itemQuantity })
    })
    .then(response => response.json())
    .then(cartItems => {
      // Update the cart items on the client-side
      renderCartItems(cartItems);
    })
    .catch(error => {
      console.error('Error updating cart item quantity:', error);
    });
  }
});

// cart__items.addEventListener('change', event => {
//   const target = event.target;

//   // Check if the event is triggered by a quantity select element
//   if (target.classList.contains('cart__items-quantity')) {
//     const itemName = target.dataset.name;
//     const itemQuantity = parseInt(target.value);

//     // Send an HTTP PUT request to update the cart item quantity
//     fetch(`/api/cart/${itemName}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ quantity: itemQuantity })
//     })
//     .then(response => response.json())
//     .then(cartItems => {
//       // Update the cart items on the client-side
//       renderCartItems(cartItems);
//     })
//     .catch(error => {
//       console.error('Error updating cart item quantity:', error);
//     });
//   }
// });


/* =============== PRODUCT Cart REMOVE ITEMS=============== */

cartContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-item')) {
    const productName = event.target.getAttribute('data-name');
    console.log(`Clicked on ${productName}`);

    
    fetch('/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({productName: productName})
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

  }
})



/* =============== CHECKOUT CART =============== */

const cart__items = document.getElementById('cart__items-cards');
const emtpy__cart = document.querySelector('.emty__cart-items');
    

let cart__products = [];

fetch('/cart')
  .then(response => response.json())
  .then(cart__products => {
    rendercartProducts(cart__products);
  })
  .catch(error => {
    console.log('Error fetching cart data:', error);
});

function rendercartProducts(cart__products) {
  cart__items.innerHTML = '';
  let total = 0;
  if(cart__products.length === 0){
    emtpy__cart.classList.toggle('hidden');
  } else {
    
    emtpy__cart.classList.add('hidden');
    cart__products.forEach(item => {
      const cart__product = `
      <div class="cart__items-list " data-name="${item.name}" id='cart__items-lists'>
        <img src="${item.image_url}" alt="{item.name}">
        <div class="cart__items-details">
          <h3>
            ${item.name}
          </h3>
          <div >
            <select class="cart__items-quantity" data-name="${item.name}">
  
              <option value="1"${item.quantity === 1 ? ' selected' : ''}>1</option>
              <option value="2"${item.quantity === 2 ? ' selected' : ''}>2</option>
              <option value="3"${item.quantity === 3 ? ' selected' : ''}>3</option>
              <option value="4"${item.quantity === 4 ? ' selected' : ''}>4</option>
              <option value="5"${item.quantity === 5 ? ' selected' : ''}>5</option>
              <option value="6"${item.quantity === 6 ? ' selected' : ''}>6</option>
              <option value="7"${item.quantity === 7 ? ' selected' : ''}>7</option>
              <option value="8"${item.quantity === 8 ? ' selected' : ''}>8</option>
              <option value="9"${item.quantity === 9 ? ' selected' : ''}>9</option>
              <option value="10"${item.quantity === 10 ? ' selected' : ''}>10</option>
            </select>
            <a  class="fas fa-trash remove-item" data-name="${item.name}"></a>
          </div>
        </div>
  
        <div class="cart__items-price">$${(item.price * item.quantity).toFixed(2)}</div>
      </div>
      `;
      cart__items.insertAdjacentHTML('beforeend', cart__product);
  
      total += item.price * item.quantity; // Add the price of the current item to the total
    
    });
    const totalElement = document.createElement('div');
    totalElement.classList.add('cart__items-total-price');
  
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('total__title');
    titleDiv.textContent = `total: `;
    totalElement.appendChild(titleDiv);
  
    const priceDiv = document.createElement('div');
    priceDiv.classList.add('total__price');
    totalElement.appendChild(priceDiv);
    priceDiv.textContent = `$${total.toFixed(2)}`;
    cart__items.insertAdjacentElement('beforeend', totalElement);
  
    const totalPricePay = document.getElementById('totalPrice');
    totalPricePay.textContent = `$ ${total.toFixed(2)}`;

  }

  
}





const cartProducts = document.getElementById("cart__items-lists");

if (cartProducts !== null) {
  // Do something with cartProducts
  console.log("Element with ID 'cart__items-lists' found.");
  rendercartProducts(cart__products);
} else {
  console.log("Element with ID 'cart__items-lists' not found.");
}




/* =============== ORDER SECTION =============== */




const order__list = document.getElementById('order__list');


let orderProducts = [];

fetch('/orders')
  .then(response => response.json())
  .then(orderProducts => {
    renderOrderProducts(orderProducts);
    console.log('order client')
  })
  .catch(error => {
    console.log('Error fetching order data:', error);
});

function renderOrderProducts(orderProducts) {
}




function renderOrderProducts(orderProducts) {
  console.log('order products: ', orderProducts)
  order__list.innerHTML = '';
  orderProducts.forEach(order => {
    const orderItems = order.items.map(item => `
    
      <div class="order__info " >
        <div class="order__cards-info hidden" id="order__cards-info" >
          <div class="image__title">
            <img src="${item.image_url}" alt="">
            <h3>${item.name}</h3>
          </div>
          <div class="quantity__price">
            <div class="quantity">
              <div class="quantity__title">quantity</div>
              <div class="quantity">${item.quantity}</div>
            </div>
            <div class="price">
              <div class="price__title">price</div>
              <div class="price">$${item.price}</div>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    const orderProduct = `
      
      <div class="order__cards" data-name="${order.orderNumber}">
        <div class="order">
          <div class="date">
            <div>date</div>
            <div class="title">${order.date}</div>
          </div>
          <div class="order__nr">
            <div>Order</div>
            <div class="title">${order.orderNumber}</div>
          </div>
          <div class="quantity">
            <div>quantity</div>
            <div class="title">${order.quantity}</div>
          </div>
          <div class="amount">
            <div>amount</div>
            <div class="title">$${order.total}</div>
          </div>
         </div>
        ${orderItems}
      </div>
    `;
  
    document.getElementById('order__list').insertAdjacentHTML('beforeend', orderProduct);
  });
}


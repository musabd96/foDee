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

import {
  ce,
  qs,
  qsa,
  GET,
  createCard,
  categories,
  removeCards,
  createCartModal,
  emptyCart,
} from "./utils.js";

import { cart } from "./cart.js";

export const productsUrl = "https://fakestoreapi.com/products";

const imgJewellery = qs(".go_to_jewellery");

//---- LOADER
const loader = qs(".lds-hourglass");

//--- CONTAINER GALLERY
export const galleryEl = document.querySelector(".products__gallery");

//---- BUTTON MODAL
const filterBtnMobile = document.querySelector(".mobile_btn");

const sidebarEl = document.querySelector(".mobile_inner");
const refreshCat = document.querySelectorAll(".all_cat");

//---- CART MODAL
const cartEl = qs(".cart");
export const showCart = qs(".cart_modal");

//---- SHOW SIDEBAR WITH CATEGORIES
filterBtnMobile.addEventListener("click", () => {
  sidebarEl.classList.toggle("shown");
});

//---- REFRESH CATEGORIES
refreshCat.forEach((el) =>
  el.addEventListener("click", () => {
    GET(productsUrl).then((res) => {
      removeCards();
      res.map((item) => {
        createCard(item, galleryEl);
      });
    });
  })
);

export let GETProductsArr = [];
cart.init();

//----  GET all products and listener on inner categories
document.addEventListener("DOMContentLoaded", async () => {
  loader.classList.toggle("show_loader");
  await GET(productsUrl)
    .then((res) => {
      GETProductsArr = res;
      loader.classList.toggle("show_loader");
      res.map((item) => createCard(item, galleryEl));
    })
    .then((res) => {
      const innerCat = qsa(".inner_cat");
      innerCat.forEach((el) =>
        el.addEventListener("click", () => {
          categories(el.textContent);
        })
      );
      imgJewellery.addEventListener("click", () => categories("jewelery"));
    });
  await cartEl.addEventListener("click", (e) => {
    e.preventDefault();
    if (cart.products.length < 1) {
      showCart.classList.toggle("show_modal");
      emptyCart(showCart);
    } else {
      showCart.classList.toggle("show_modal");
      createCartModal(cart.products, showCart);
    }
  });
});

const sconto = qs(".discount");
sconto.addEventListener("click", () => {
  alert("Purtroppo questo sito è finto, però è bello che tu ci abbia provato.");
});

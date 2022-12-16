import { cart } from "./cart.js";

const ce = (el) => document.createElement(el);
const qs = (el) => document.querySelector(el);
const checkoutCart = document.querySelector(".checkout__cart");

//---- ELEMENTI DEL FORM
const formEl = document.forms.payment;
const formElements = formEl.elements;
const personalInfo = formElements.generalita;
const cardNumber = formElements.numero;
const securityCode = formElements.security;

//---- THANK YOU MODAL
const thankModal = qs(".thankModalContainer");
const closeModal = qs(".closeModal_btn");
const checkCart = qs(".check");

//---- CARD RIEPILOGO CARRELLO
const createCheckoutCart = (data, parent) => {
  parent.innerHTML = "";
  const cartTitle = ce("h2");
  cartTitle.className = "cart_title";
  cartTitle.textContent = "Your Order:";
  parent.append(cartTitle);
  data.forEach((d) => {
    const cartInner = ce("div");
    cartInner.className = "cart_inner";

    const cartImage = ce("div");
    cartImage.className = "cart_image";
    const cartName = ce("div");
    cartName.className = "cart_name";
    const cartQuantity = ce("div");
    cartQuantity.className = "cart_quantity";
    const cartPrice = ce("div");
    cartPrice.className = "cart_price";

    const image_img = ce("img");
    image_img.setAttribute("src", d.image);

    image_img.className = "image_img";

    const nameTitle = ce("h3");
    nameTitle.className = "name_title";
    nameTitle.textContent = "Product";

    const namePar = ce("p");
    namePar.className = "name_par";
    namePar.textContent = d.title;

    const quantityTitle = ce("h3");
    quantityTitle.className = "name_quantity";
    quantityTitle.textContent = "Quantity";

    const qtyEl = ce("div");
    qtyEl.className = "inner_quantity";

    const quantityNum = ce("span");
    quantityNum.className = "qty_num";
    quantityNum.textContent = d.quantity;

    const quantityPar = ce("p");
    quantityPar.className = "quantity_par";
    quantityPar.textContent = "Quantity";

    const priceTitle = ce("h3");
    priceTitle.className = "name_price";
    priceTitle.textContent = "Price";

    const pricePar = ce("p");
    pricePar.className = "price_par";
    pricePar.innerHTML = `€ ${d.price * d.quantity}`;

    cartInner.append(cartImage, cartName, cartQuantity, cartPrice);
    cartImage.append(image_img);
    cartName.append(nameTitle, namePar);
    qtyEl.append(quantityNum);
    cartQuantity.append(quantityTitle, qtyEl);
    cartPrice.append(priceTitle, pricePar);
    parent.append(cartInner);
  });
  let sub = 0;
  const subtotal = (data) => {
    for (let i = 0; i < data.length; i++) {
      let subprice = parseFloat(data[i].price * data[i].quantity);
      sub = sub + subprice;
    }
    return sub.toFixed(2);
  };

  const total = (data) => {
    let total = parseFloat(subtotal(data) * 1.22).toFixed(2);
    return total;
  };

  const cartPay = ce("div");
  cartPay.className = "cart_pay";
  const paySubtotal = ce("div");
  paySubtotal.className = "pay_subtotal";
  const payIva = ce("div");
  payIva.className = "pay_iva";
  const payTotal = ce("div");
  payTotal.className = "pay_total";

  const subTitle = ce("h4");
  subTitle.className = "sub_title";
  subTitle.textContent = "Subtotal";

  const subPar = ce("p");
  subPar.className = "sub_par";
  subPar.textContent = `€ ${subtotal(cart.products)}`;
  console.log(cart.products);

  const ivaTitle = ce("h4");
  ivaTitle.className = "iva_title";
  ivaTitle.textContent = "TAX";

  const ivaPar = ce("p");
  ivaPar.className = "iva_par";
  ivaPar.textContent = "22%";

  const totalTitle = ce("h4");
  totalTitle.className = "total_title";
  totalTitle.textContent = "Total";

  const totalPar = ce("p");
  totalPar.className = "total_par";
  totalPar.textContent = `€ ${total(data)}`;
  cartPay.append(paySubtotal, payIva, payTotal);
  paySubtotal.append(subTitle, subPar);
  payIva.append(ivaTitle, ivaPar);
  payTotal.append(totalTitle, totalPar);
  parent.append(cartPay);
};

//---- CLICK PER MOSTRARE LA MODALE
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    cardNumber.value.length < 16 ||
    securityCode.value.length < 3 ||
    securityCode.value.length > 3
  ) {
    alert("Valori non Validi");
  }
  thankModal.classList.add("show");
  createCheckoutCart(cart.products, checkCart);
});

//---- CLICK PER NASCONDERE LA MODALE
closeModal.addEventListener("click", () => {
  thankModal.classList.remove("show");
  cart.emptyCart();
  location.href = "./../index.html";
});

document.addEventListener("DOMContentLoaded", () => {
  cart.init();
  //---- RICHIAMO AL CARRELLO ALL'AVVIO DELLA PAGINA
  createCheckoutCart(cart.products, checkoutCart);
});

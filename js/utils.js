import { productsUrl, galleryEl, GETProductsArr } from "./script.js";
import { cart } from "./cart.js";
const ce = (el) => document.createElement(el);
const qs = (el) => document.querySelector(el);
const qsa = (el) => document.querySelectorAll(el);
const showCart = qs(".cart_modal");

const GET = async (url) => {
  const res = await fetch(url);
  return await res.json();
};

const addProduct = (e) => {
  e.preventDefault();
  let id = parseInt(e.target.getAttribute("data-id"));
  cart.addId(id, GETProductsArr);
  createCartModal(cart.products, showCart);
  const addToCart = qs(".sold");
  addToCart.classList.add("shownCard");
  const soldBtn = qs(".sold_btn");
  soldBtn.addEventListener("click", () => {
    addToCart.classList.remove("shownCard");
  });
};

const incrementCart = (e) => {
  e.preventDefault();
  let id = parseInt(e.target.getAttribute("data-id"));
  cart.increaseQuantity(id, 1);
  let controls = e.target.parentElement;
  let quantity = controls.querySelector("span:nth-child(2)");
  let item = cart.findId(id);
  if (item) {
    quantity.textContent = item.quantity;
  } else {
    quantity.textContent = 0;
  }
  createCartModal(cart.products, showCart);
};

const decrementCart = (e) => {
  e.preventDefault();
  let id = parseInt(e.target.getAttribute("data-id"));
  cart.decreaseQuantity(id, 1);
  let controls = e.target.parentElement;
  let quantity = controls.querySelector("span:nth-child(2)");
  let item = cart.findId(id);
  if (item) {
    quantity.textContent = item.quantity;
  } else {
    quantity.textContent = 0;
  }
  createCartModal(cart.products, showCart);
};

//creazione delle card prodotto
const createCard = (data, parent) => {
  const cardEl = ce("div");
  cardEl.className = "single_card";

  const imgDivEl = ce("div");
  imgDivEl.className = "card__image";

  const imgEl = ce("img");
  imgEl.className = "product__img";
  imgEl.setAttribute("src", data.image);
  imgEl.setAttribute("alt", "product image");

  imgDivEl.append(imgEl);

  const prodDivEl = ce("div");
  prodDivEl.className = "product";

  const titleEl = ce("h3");
  titleEl.className = "product__title";
  titleEl.textContent = data.title;

  const descriptionEl = ce("p");
  descriptionEl.className = "product__description";
  descriptionEl.textContent = data.description;

  const priceEl = ce("p");
  priceEl.className = "product__price";
  priceEl.textContent = `€ ${data.price}`;

  const btnEl = ce("button");
  btnEl.className = "product__btn";
  btnEl.textContent = "shop now";
  btnEl.setAttribute("data-id", data.id);
  btnEl.addEventListener("click", addProduct);
  btnEl.addEventListener("click", () => {
    setTimeout(() => {
      showCart.classList.add("show_modal"), "1000";
    });
  });

  const btnImgEl = ce("img");
  btnImgEl.className = "btn__img";
  btnImgEl.setAttribute("src", "./img/bag_icon_white.PNG");
  btnImgEl.setAttribute("alt", "add to cart");

  btnEl.append(btnImgEl);
  prodDivEl.append(titleEl, descriptionEl, priceEl, btnEl);
  cardEl.append(imgDivEl, prodDivEl);
  parent.append(cardEl);
};

const createCartModal = (data, parent) => {
  parent.innerHTML = "";
  const cartTitle = ce("h2");
  cartTitle.className = "cart_title";
  cartTitle.textContent = "Your Cart";
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

    const plus = ce("span");
    plus.className = "qty_plus";
    plus.textContent = "+";
    plus.setAttribute("data-id", d.id);
    plus.addEventListener("click", incrementCart);

    const quantityNum = ce("span");
    quantityNum.className = "qty_num";
    quantityNum.textContent = d.quantity;

    const minus = ce("span");
    minus.className = "qty_minus";
    minus.textContent = "-";
    minus.setAttribute("data-id", d.id);
    minus.addEventListener("click", decrementCart);

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
    qtyEl.append(minus, quantityNum, plus);
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

  const payButton = ce("button");
  payButton.className = "pay_btn";

  const redirect = ce("a");
  redirect.setAttribute("href", "./payment.html");
  redirect.textContent = "Checkout";
  payButton.append(redirect);

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
  cartPay.append(paySubtotal, payIva, payTotal, payButton);
  paySubtotal.append(subTitle, subPar);
  payIva.append(ivaTitle, ivaPar);
  payTotal.append(totalTitle, totalPar);
  parent.append(cartPay);
};

//richiamo alle categorie
const categories = (myCategory) => {
  GET(productsUrl).then((res) => {
    const filtered = res.filter((item) => item.category == myCategory);
    removeCards();
    filtered.map((el) => createCard(el, galleryEl));
  });
};

//rimozione cards
const removeCards = () => {
  galleryEl.textContent = "";
};

//empty cart
const emptyCart = (parent) => {
  parent.innerHTML = "";
  const modal = ce("div");
  modal.className = "empty_cart";

  const empyCartText = ce("div");

  const modalText = ce("h2");
  modalText.className = "empty_text";
  modalText.textContent = "Your Cart is Empty!";

  const modalPar = ce("p");
  modalPar.className = "empty_text";
  modalPar.textContent = "Let's Shopping!";

  const shoppingGif = ce("img");
  shoppingGif.setAttribute("src", "./img/shopping-cart.gif");
  shoppingGif.className = "shopping_gif";

  parent.append(modal);
  empyCartText.append(modalText, modalPar);
  modal.append(shoppingGif, empyCartText);
};

export {
  ce,
  qs,
  qsa,
  GET,
  createCard,
  categories,
  removeCards,
  createCartModal,
  emptyCart,
};

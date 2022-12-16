const cart = {
  key: "HarrodsLocalStorage",
  products: [],
  //controlla il localstorage ed inizializza cart.products
  init() {
    const productsArr = localStorage.getItem(cart.key);
    if (productsArr) {
      cart.products = JSON.parse(productsArr);
    } else {
      cart.products = [];
      cart.save();
    }
  },
  //salva i valori dentro cart nel localStorage
  save() {
    let savedCart = JSON.stringify(cart.products);
    localStorage.setItem(cart.key, savedCart);
    //?
  },
  //verifica che l'id inserito sia presente tra gli elementi nel localStorage e che matchi con il primo elemento dell'array nel localstorage
  findId(id) {
    let matchItem = cart.products.filter((el) => {
      if (el.id == id) return true;
    });
    if (matchItem && matchItem[0]) return matchItem[0];
  },
  //aumenta la quantità di un prodotto nel carrello
  increaseQuantity(id, quantity = 1) {
    cart.products = cart.products.map((prod) => {
      if (prod.id === id) prod.quantity = prod.quantity + quantity;
      return prod;
    });
    cart.save();
  },
  //decrementa la quantità di un prodotto nel carrello. Se è 0, lo elimina dal carrello
  decreaseQuantity(id, quantity = 1) {
    cart.products = cart.products.map((prod) => {
      if (prod.id === id) prod.quantity = prod.quantity - quantity;
      return prod;
    });
    cart.products.forEach(async (prod) => {
      if (prod.id === id && prod.quantity === 0) await cart.removeProduct(id);
    });
    //salvo
    cart.save();
  },
  //rimuove il prodotto dal carrello, salvando solo i prodotti che hanno id diverso da quello dato come argomento
  removeProduct(id) {
    cart.products = cart.products.filter((prod) => {
      if (prod.id !== id) return true;
    });
    cart.save();
  },
  //aggiunge un elemento al carrello e controlla che non ci siano già elementi uguali nel carrello
  addId(id, newArr) {
    if (cart.findId(id)) {
      cart.increaseQuantity(id, 1);
    } else {
      let arr = newArr.filter((prod) => {
        //newArr -> prodotti dalla fetch
        if (prod.id == id) {
          return true;
        }
      });
      if (arr && arr[0]) {
        let obj = {
          id: arr[0].id,
          title: arr[0].title,
          quantity: 1,
          price: arr[0].price,
          image: arr[0].image,
        };
        cart.products.push(obj);
        cart.save();
      } else {
        console.error("errore: l'id non esiste o non è valido");
      }
    }
  },
  //svuota il carrello
  emptyCart() {
    cart.products = [];
    cart.save();
  },
};

export { cart };

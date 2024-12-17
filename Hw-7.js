let productsData = [
  {
    id: 1,
    name: "همبرگر معمولی",
    price: 8000,
    image: "./assets/hamburger.jpg",
  },
  {
    id: 2,
    name: "همبرگر مخصوص ",
    price: 10000,
    image: "https://salamdonya.com/assets/images/88/8870ai12u.jpg",
  },
  {
    id: 3,
    name: "سیب زمینی",
    price: 12000,
    image:
      "https://mamifood.org/images/files1/%D8%B5%D9%85%D8%AF%DB%8C/1/r20220129121255-min.jpg",
  },
  {
    id: 4,
    name: "کباب",
    price: 15000,
    image:
      "https://kabab-yekbonab.rqo.ir/wp-content/uploads/sites/27144/2024/02/kabab-koubide-arzan.jpg",
  },
  {
    id: 5,
    name: "نوشابه",
    price: 15000,
    image: "https://anbarnaft.com/uploads/5fa63f58aebd4e8cadc0a97852fa2231.jpg",
  },
  {
    id: 6,
    name: "کیک",
    price: 20000,
    image: "./assets/hamburger.jpg",
  },
  {
    id: 7,
    name: "کیک",
    price: 20000,
    image: "./assets/hamburger.jpg",
  },
  {
    id: 8,
    name: "کیک",
    price: 20000,
    image: "./assets/hamburger.jpg",
  },
  {
    id: 9,
    name: "کیک",
    price: 20000,
    image: "./assets/hamburger.jpg",
  },
  {
    id: 10,
    name: "کیک",
    price: 20000,
    image: "./assets/hamburger.jpg",
  },
  {
    id: 11,
    name: "کیک",
    price: 20000,
    image: "./assets/hamburger.jpg",
  },
  {
    id: 12,
    name: "کیک",
    price: 20000,
    image: "./assets/hamburger.jpg",
  },
  {
    id: 13,
    name: "کیک",
    price: 20000,
    image: "./assets/hamburger.jpg",
  },
  {
    id: 14,
    name: "کیک",
    price: 20000,
    image: "./assets/hamburger.jpg",
  },
  {
    id: 15,
    name: "کیک",
    price: 20000,
    image: "./assets/hamburger.jpg",
  },
  {
    id: 16,
    name: "کیک",
    price: 20000,
    image: "./assets/hamburger.jpg",
  },
  {
    id: 17,
    name: "کیک",
    price: 20000,
    image: "./assets/hamburger.jpg",
  },
];

const toman = "تومان";

const productDetailsGridElement = document.querySelector(
  "#product-details-grid"
);
const totalPriceSpanElement = document.querySelector("#total-price-span");
const productQuantityElements = document.querySelectorAll("#product-quantity");
const sumSpanElement = document.querySelector("#sum-span");
const servicePriceSpanElement = document.querySelector("#service-span");
const discountSpanElement = document.querySelector("#discount-span");
const discountCodeInputElement = document.querySelector("#discount-code-input");
const cartItemsElement = document.querySelector("#cart-items");
const modalContainerElement = document.querySelector("#modal-container");
const modalOverlayElement = document.querySelector("#modal-overlay");

let cart = [];
let discountCodes = ["gold"];

function renderProducts() {
  productDetailsGridElement.innerHTML = "";
  productsData.forEach((product) => {
    const productQuantity = cart.find(
      (cartProduct) => cartProduct.id === product.id
    );
    const totalProductPrice = product.price * productQuantity?.quantity || 0;
    productDetailsGridElement.innerHTML += `<div class="product-details">
              <span id="product-name">${product.name}</span>
              <span id="product-price">${toFarsiNumber(
                product.price
              )} ${toman}</span>
              <img id="product-image" src="${product.image}" alt="burger" />
              <span id="total-product-price">${toFarsiNumber(
                totalProductPrice
              )} ${toman}</span>
              <div id="product-quantity-container">
                <button onclick="decreaseQuantity(${
                  product.id
                })" id="decrease-quantity-button">-</button>
                <span id="product-quantity">${toFarsiNumber(
                  productQuantity?.quantity || 0
                )}</span>
                <button onclick="increaseQuantity(${
                  product.id
                })" id="increase-quantity-button">+</button>
              </div>
            </div>`;
  });
}

function renderCartItems() {
  cartItemsElement.innerHTML = "";
  cart.forEach((cartItem) => {
    cartItemsElement.innerHTML += `<div class="cart-item">
        <img src="${cartItem.image}" alt="burger" />
        <div id="product-quantity-container">
                <button onclick="decreaseQuantity(${
                  cartItem.id
                })" id="decrease-quantity-button">-</button>
                <span id="product-quantity">${toFarsiNumber(
                  cartItem.quantity || 0
                )}</span>
                <button onclick="increaseQuantity(${
                  cartItem.id
                })" id="increase-quantity-button">+</button>
              </div>
    </div>`;
  });
}

function increaseQuantity(id) {
  const productTemp = productsData.find((product) => product.id === id);
  let cartItem = cart.find((product) => product.id === id);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...productTemp, quantity: 1 });
  }
  calculatePrice();
  renderProducts();
  renderCartItems();
}

function decreaseQuantity(id) {
  const cartItemIndex = cart.findIndex((product) => product.id === id);

  if (cartItemIndex !== -1) {
    if (cart[cartItemIndex].quantity === 1) {
      cart = cart.filter((product) => product.id !== id);
    } else {
      cart[cartItemIndex].quantity--;
    }
  }

  calculatePrice();
  renderProducts();
  renderCartItems();
}

function calculatePrice(hasDiscountCode = 0) {
  const totalBeforeService = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const servicePrice = totalBeforeService * 0.05;
  const discountPercentage = calculateDiscountPercentage() + hasDiscountCode;
  console.log("discountPercentage:", discountPercentage);

  const discount = (totalBeforeService + servicePrice) * discountPercentage;
  const totalAll = totalBeforeService + servicePrice - discount;

  sumSpanElement.textContent = `${toFarsiNumber(totalBeforeService)}`;
  servicePriceSpanElement.textContent = `${toFarsiNumber(servicePrice)}`;

  discountSpanElement.textContent = `${toFarsiNumber(
    discount
  )}  (${toFarsiNumber(discountPercentage * 100)}٪)`;
  totalPriceSpanElement.textContent = `${toFarsiNumber(totalAll)}`;
}

function calculateDiscountPercentage() {
  const cartQuantity = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  if (cartQuantity >= 40) {
    return 0.2;
  } else if (cartQuantity >= 30) {
    return 0.1;
  } else if (cartQuantity >= 20) {
    return 0.08;
  } else if (cartQuantity >= 10) {
    return 0.05;
  } else if (cartQuantity >= 5) {
    return 0.03;
  } else {
    return 0;
  }
}

function applyDiscountCode() {
  const discountCode = discountCodeInputElement.value;
  if (discountCodes.includes(discountCode)) {
    discountCodeInputElement.style.backgroundColor = "green";
    calculatePrice(0.01);
  }
  return 0;
}

function payOrder() {
  if (cart.length === 0) {
    return;
  }
  modalContainerElement.style.display = "flex";
  modalOverlayElement.style.display = "block";

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  modalContainerElement.innerHTML = "";
  cart.forEach((item) => {
    modalContainerElement.innerHTML += `
    <div class="cart-item-modal-container">
    <div class="cart-item-modal">
    ${item.name}: ${toFarsiNumber(item.quantity)} عدد - ${toFarsiNumber(
      item.price * item.quantity
    )} ${toman}   </div>
    </div>`;
  });
  modalContainerElement.innerHTML += `
  <div class="modal-footer">
  <button >پرداخت</button>
  <button >چاپ</button>
  <button >انصراف</button>
  <span class="total-price-modal">مبلغ کل: ${toFarsiNumber(
    totalPrice
  )} ${toman}</span>
  </div>
  `;
}

modalOverlayElement.addEventListener("click", () => {
  modalContainerElement.style.display = "none";
  modalOverlayElement.style.display = "none";
});

function toFarsiNumber(n) {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  let numberWithComma = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return numberWithComma.replace(/\d/g, (x) => farsiDigits[x]);
}

renderProducts();

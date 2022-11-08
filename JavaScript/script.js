
let shoppingCarts = document.querySelectorAll(".addToCart");


let productItems = [
  {
    productName: "Nike Дизайнерская кепка (унисекс)",
    productTag: "nikedesignerhats",
    productPrice: 399,
    productIsInCart: 0,
  },
  {
    productName: "Женская Дизайнерская Шляпа",
    productTag: "ladiesdesignerhats",
    productPrice: 299,
    productIsInCart: 0,
  },
  {
    productName: "Женские дизайнерские кепки",
    productTag: "ladiesdesignerpeakcaps",
    productPrice: 399,
    productIsInCart: 0,
  },
  {
    productName: "Бразильское футбольное джерси",
    productTag: "brazilfootballjersey",
    productPrice: 999,
    productIsInCart: 0,
  },
  {
    productName: "Простые футболки",
    productTag: "plaint-shirts",
    productPrice: 299,
    productIsInCart: 0,
  },
  {
    productName: "Женское  Джерси",
    productTag: "ladiesdesignerjersey",
    productPrice: 799,
    productIsInCart: 0,
  },
  {
    productName: "Замшевые кроссовки",
    productTag: "Bluesuedeshoes",
    productPrice: 1299,
    productIsInCart: 0,
  },
  {
    productName: "Эксклюзив от Nike",
    productTag: "designernikes",
    productPrice: 2999,
    productIsInCart: 0,
  },
  {
    productName: "Дизайнерская обувь Nike",
    productTag: "designernikeshoes",
    productPrice: 1599,
    productIsInCart: 0,
  },
  {
    productName: "Nike Airforce кроссовки",
    productTag: "nikeairforceshoes",
    productPrice: 2999,
    productIsInCart: 0,
  },
  {
    productName: "Nike кроссовки",
    productTag: "niketrainingshoes",
    productPrice: 1999,
    productIsInCart: 0,
  },
  {
    productName: "Salomon Trail Running Shoes",
    productTag: "salomontrailrunningshoes",
    productPrice: 3999,
    productIsInCart: 0,
  },
];



for (let i = 0; i < shoppingCarts.length; i++) {

  shoppingCarts[i].addEventListener("click", () => {
    amountOfItemsIncart(productItems[i]);
    totalCost(productItems[i]);
  });
}



function checkCartItems() {
  let numberOfProducts = localStorage.getItem("itemsInCart");

  if (numberOfProducts) {
    document.querySelector(".amountOfItems").innerHTML = numberOfProducts;
  }
}


function amountOfItemsIncart(productItem, action) {
  let numberOfProducts = localStorage.getItem("itemsInCart");

  numberOfProducts = Number(numberOfProducts);

  let itemsInTheCart = localStorage.getItem("productsInCart");
  itemsInTheCart = JSON.parse(itemsInTheCart);


  if (action === "remove") {
    localStorage.setItem("itemsInCart", numberOfProducts - 1);
    document.querySelector(".cart a span").textContent = numberOfProducts - 1;
  } else if (numberOfProducts) {
    localStorage.setItem("itemsInCart", numberOfProducts + 1);
    document.querySelector(".cart a span").textContent = numberOfProducts + 1;
  } else {
    localStorage.setItem("itemsInCart", 1);
    document.querySelector(".cart a span").textContent = 1;
  }


  setProducts(productItem);
}


function setProducts(productItem) {
  let itemsInThecart = localStorage.getItem("productsInCart");
  itemsInThecart = JSON.parse(itemsInThecart);

  if (itemsInThecart != null) {
    if (itemsInThecart[productItem.productTag] == undefined) {
      itemsInThecart = {
        ...itemsInThecart,
        [productItem.productTag]: productItem,
      };
    }
    itemsInThecart[productItem.productTag].productIsInCart += 1;
  } else {
    productItem.productIsInCart = 1;
    itemsInThecart = {
      [productItem.productTag]: productItem,
    };
  }
  localStorage.setItem("productsInCart", JSON.stringify(itemsInThecart));
}


function totalCost(product, action) {
  let totalCostOfCart = localStorage.getItem("totalCostofItems");

  if (action === "remove") {
    totalCostOfCart = Number(totalCostOfCart);
    localStorage.setItem(
      "totalCostofItems",
      totalCostOfCart - product.productPrice
    );
  } else if (totalCostOfCart != null) {
    totalCostOfCart = Number(totalCostOfCart);
    localStorage.setItem(
      "totalCostofItems",
      totalCostOfCart + product.productPrice
    );
  } else {
    localStorage.setItem("totalCostofItems", product.productPrice);
  }
}


function displayCartTotal() {
  let currentCartCost = localStorage.getItem("totalCostofItems");
  currentCartCost = Number(currentCartCost);
  let addItemToCart = document.querySelectorAll(".addToCart");


  for (i = 0; i < addItemToCart.length; i++) {
    addItemToCart[i].addEventListener("click", () => {
      location.reload();
      alert(
        "Сумма покупок: $" +
          currentCartCost +
          " без НДС. Перейдите на страницу корзины, чтобы увидеть общую стоимость, включая НДС."
      );
    });
  }
}

displayCartTotal();

function couponCodes() {
  let couponInput = document.getElementById("couponInput").value;
  let cartCost = document
    .getElementById("finalCartCost")
    .innerHTML.replace(/$/g, "");
  let finalCartCost = document.getElementById("finalCartCost");

  cartCost = Number(cartCost);

  if (couponInput === "winterSale2022") {
    cartCost = cartCost - (cartCost * 25) / 100;
    alert("Сумма покупок: $" + cartCost.toFixed(2));
    finalCartCost.innerHTML = `$${cartCost.toFixed(2)}`;
  } else if (couponInput === "bestBargain2022") {
    cartCost = cartCost - (cartCost * 50) / 100;
    alert("Сумма покупок: $" + cartCost.toFixed(2));
    finalCartCost.innerHTML = `$${cartCost.toFixed(2)}`;
  } else {
    alert("No discount for you.");
  }
}


function deliveryCost() {
  let localExpress = document.getElementById("localExpress");
  let internationalExpress = document.getElementById("internationalExpress");
  let submitButton = document.getElementById("deliveryOptionsSubmitButton");
  let cartCost = document
    .getElementById("finalCartCost")
    .innerHTML.replace(/$/g, "");
  let finalCartCost = document.getElementById("finalCartCost");

  cartCost = Number(cartCost);


  submitButton.addEventListener("click", () => {
    if (localExpress.checked) {
      cartCost = cartCost + 100;
      finalCartCost.innerHTML = `$${cartCost.toFixed(2)}`;
      alert("Сумма покупок: $" + cartCost.toFixed(2));
    } else if (internationalExpress.checked) {
      cartCost = cartCost + 300;
      finalCartCost.innerHTML = `$${cartCost.toFixed(2)}`;
      alert("Сумма покупок: $" + cartCost.toFixed(2));
    } else {
      alert("без дополнительной оплаты.");
    }
  });
}


function displayItemsInCart() {
  let itemsIncart = localStorage.getItem("productsInCart");

  itemsIncart = JSON.parse(itemsIncart);

  let customerProducts = document.querySelector(".customerProductsContainer");

  let totalCostOfCart = localStorage.getItem("totalCostofItems");

  if (itemsIncart && customerProducts) {
    customerProducts.innerHTML = "";
    Object.values(itemsIncart).map((entry) => {
      customerProducts.innerHTML += `
        <div class="chosenProduct">
            <ion-icon class="removeOption" name="close-circle-outline"></ion-icon>
            <img src="../images/${entry.productTag}.jpg">
            <span class="chosenProductTitleSpan">${entry.productName}</span>
        </div>
        <div class="chosenProductPrice">$${entry.productPrice},00</div>
        <div class="chosenProductQuantity">
            <ion-icon class="remove" name="caret-back-circle-outline"></ion-icon>
            <span class="chosenProductQuantitySpan">${
              entry.productIsInCart
            }</span>
            <ion-icon class="add" name="caret-forward-circle-outline"></ion-icon>
        </div>
        <div class="totalCost">
            $${
              entry.productIsInCart * entry.productPrice
            }
        </div>
        `;
    });


    totalCostOfCart = JSON.parse(totalCostOfCart);
    let vatCost = totalCostOfCart * (15 / 100);
    let totalCost = totalCostOfCart + vatCost;

    customerProducts.innerHTML += `
        <div class="totalCostContainer">
            <h5 class="totalCostOfCartTitle">
            Всего в корзине
            <br> включая НДС:
            </h5>
            <h5 id="finalCartCost" class="totalCostOfCart">
            $${totalCost}
            </h5>
            
    `;
  }


  removeItemsFromCart();
  updateProductQuantity();
}



function removeItemsFromCart() {
  let removeButtons = document.querySelectorAll(".removeOption");
  let nameOfSelectedproduct;
  let amountOfProducts = localStorage.getItem("itemsInCart");
  let itemsInCart = localStorage.getItem("productsInCart");
  itemsInCart = JSON.parse(itemsInCart);
  let cost = localStorage.getItem("totalCostofItems");

  for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener("click", () => {
      nameOfSelectedproduct = removeButtons[i].parentElement.textContent
        .trim()
        .toLocaleLowerCase()
        .replace(/ /g, "");

      localStorage.setItem(
        "itemsInCart",
        amountOfProducts - itemsInCart[nameOfSelectedproduct].productIsInCart
      );

      localStorage.setItem(
        "totalCostofItems",
        cost -
          itemsInCart[nameOfSelectedproduct].productPrice *
            itemsInCart[nameOfSelectedproduct].productIsInCart
      );

      delete itemsInCart[nameOfSelectedproduct];
      localStorage.setItem("productsInCart", JSON.stringify(itemsInCart));

      displayItemsInCart();
      checkCartItems();
    });
  }
}



function updateProductQuantity() {
  let removeItems = document.querySelectorAll(".remove");
  let addItems = document.querySelectorAll(".add");
  let productQuantity = 0;

  let myProduct = "";

  let productsInCart = localStorage.getItem("productsInCart");
  productsInCart = JSON.parse(productsInCart);
  console.log(productsInCart);

  for (let i = 0; i < removeItems.length; i++) {
    removeItems[i].addEventListener("click", () => {
      productQuantity = removeItems[i].parentElement.querySelector(
        ".chosenProductQuantitySpan"
      ).textContent;
      console.log(productQuantity);
      myProduct = removeItems[
        i
      ].parentElement.previousElementSibling.previousElementSibling
        .querySelector("span")
        .textContent.toLocaleLowerCase()
        .replace(/ /g, "")
        .trim();
      console.log(myProduct);


      if (productsInCart[myProduct].productIsInCart > 1) {
        productsInCart[myProduct].productIsInCart -= 1;
        amountOfItemsIncart(productsInCart[myProduct], "remove");
        totalCost(productsInCart[myProduct], "remove");
        localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
        displayItemsInCart();
      }
    });
  }
  for (let i = 0; i < addItems.length; i++) {
    addItems[i].addEventListener("click", () => {
      productQuantity = addItems[i].parentElement.querySelector(
        ".chosenProductQuantitySpan"
      ).textContent;
      console.log(productQuantity);

      myProduct = addItems[
        i
      ].parentElement.previousElementSibling.previousElementSibling
        .querySelector("span")
        .textContent.toLocaleLowerCase()
        .replace(/ /g, "")
        .trim();
      console.log(myProduct);

      productsInCart[myProduct].productIsInCart += 1;
      amountOfItemsIncart(productsInCart[myProduct]);
      totalCost(productsInCart[myProduct]);
      localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
      displayItemsInCart();
    });
  }
}



checkCartItems();
displayItemsInCart();



let confirmOrderButton = document.getElementById("confirmOrderButton");


function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


confirmOrderButton.addEventListener("click", () => {
  alert(
    "Спасибо, ваш заказ выполнен. Ваш номер заказа: " +
      randomNumber(100, 1000)
  );
});



$(document).ready(function () {
  $(".hideFormsButton").click(function () {
    $(
      ".discountCouponSection, .collectionOrDeliverySection, .deliveryOptionsSection"
    ).hide();
  });

  $(".showFormsButton").click(function () {
    $(
      ".discountCouponSection, .collectionOrDeliverySection, .deliveryOptionsSection"
    ).show();
  });

  $(".dropDownNaviagtionMenuSectionButton").click(function () {
    $(".dropDownNaviagtionMenuUnorderedList").show(800);
  });
  $(".dropDownNaviagtionMenuSectionHideButton").click(function () {
    $(".dropDownNaviagtionMenuUnorderedList").hide(800);
  });
  $(".animateButton").click(function () {
    $(".deliveryOptionsSection, .deliveryOptionForm").animate({
      width: "900px",
    });
  });
  $(".reverseAnimation").click(function () {
    $(".deliveryOptionsSection, .deliveryOptionForm").animate({
      width: "600px",
    });
  });
  $("#confirmOrderButton")
    .css("background-color", "orangered")
    .css("color", "black")
    .slideUp(1300)
    .slideDown(1300);
});


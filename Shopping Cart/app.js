import products from './product.js';
import { addToCart, removeCartItem, clearCart, getCartItems, calculateCartTotal } from './cart.js';

function displayProductList() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';

  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
    `;

    const addToCartButton = productDiv.querySelector('.add-to-cart');
    addToCartButton.addEventListener('click', () => {
      const quantity = parseInt(prompt('Enter quantity:', '1'));
      if (!isNaN(quantity) && quantity > 0) {
        addToCart(product, quantity);
        displayCartItems();
      }
    });

    productList.appendChild(productDiv);
  });
}

function displayCartItems() {
  const shoppingCart = document.getElementById('shopping-cart');
  shoppingCart.innerHTML = '';

  const cartItems = getCartItems();
  cartItems.forEach(item => {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.innerHTML = `
      <h3>${item.product.name}</h3>
      <p>Quantity: ${item.quantity}</p>
      <p>Price: $${item.product.price}</p>
      <p>Total: $${item.product.price * item.quantity}</p>
      <button class="remove-from-cart" data-product-id="${item.product.id}">Remove</button>
    `;

    const removeFromCartButton = cartItemDiv.querySelector('.remove-from-cart');
    removeFromCartButton.addEventListener('click', () => {
      removeCartItem(item.product.id);
      displayCartItems();
    });

    shoppingCart.appendChild(cartItemDiv);
  });

  const cartTotal = calculateCartTotal();
  shoppingCart.innerHTML += `<p>Total Amount: $${cartTotal}</p>`;
}

function bindClearCartButton() {
  const clearCartButton = document.getElementById('clear-cart');
  clearCartButton.addEventListener('click', () => {
    clearCart();
    displayCartItems();
  });
}

displayProductList();
displayCartItems();
bindClearCartButton();

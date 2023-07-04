let cart = [];

export function addToCart(product, quantity) {
  const item = cart.find(item => item.product.id === product.id);
  if (item) {
    item.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
}

export function removeCartItem(productId) {
  cart = cart.filter(item => item.product.id !== productId);
}

export function clearCart() {
  cart = [];
}

export function getCartItems() {
  return cart;
}

export function calculateCartTotal() {
  return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
}

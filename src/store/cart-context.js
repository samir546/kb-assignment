import React from 'react';

const CartContext = React.createContext({
  city: 'Bengaluru',
  products: [],
  totalAmount: 0,
  addProduct: (product) => {},
  removeProduct: (id) => {},
  clearCart: () => {},
  changeCity: (NewCity) => {}
});

export default CartContext;
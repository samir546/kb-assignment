import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  city: 'Bengaluru',
  products: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.product.price * action.product.duration;

    const existingCartProductIndex = state.products.findIndex(
      (product) => product.id === action.product.id
    );
    const existingCartProduct = state.products[existingCartProductIndex];
    let updatedProducts;

    if (existingCartProduct) {
      const updatedProduct = {
        ...existingCartProduct,
        duration: existingCartProduct.duration + action.product.duration,
      };
      updatedProducts = [...state.products];
      updatedProducts[existingCartProductIndex] = updatedProduct;
    } else {
      updatedProducts = state.products.concat(action.product);
    }

    return {
      products: updatedProducts,
      totalAmount: updatedTotalAmount,
      city: state.city,
    };
  }
  
  if (action.type === 'REMOVE') {
    const existingCartProductIndex = state.products.findIndex(
      (product) => product.id === action.id
    );
    const existingProduct = state.products[existingCartProductIndex];
    const updatedTotalAmount = state.totalAmount - existingProduct.price;
    let updatedProducts;
    if (existingProduct.duration === 1) {
      updatedProducts = state.products.filter(product => product.id !== action.id);
    } else {
      const updatedProduct = { ...existingProduct, duration: existingProduct.duration - 1 };
      updatedProducts = [...state.products];
      updatedProducts[existingCartProductIndex] = updatedProduct;
    }

    return {
      products: updatedProducts,
      totalAmount: updatedTotalAmount,
      city: state.city,
    };
  }

  if (action.type === 'CLEAR') {
    return defaultCartState;
  }

  if (action.type === 'CHANGECITY'){
    return {
      products: state.products,
      totalAmount: state.totalAmount,
      city: action.newCity
    }

  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addProductToCartHandler = (product) => {
    dispatchCartAction({ type: 'ADD', product: product });
  };

  const removeProductFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({type: 'CLEAR'});
  };

  const changeCityHandler = (newCity) => {
    dispatchCartAction({type: 'CHANGECITY', newCity: newCity});
  }

  const cartContext = {
    city: cartState.city,
    products: cartState.products,
    totalAmount: cartState.totalAmount,
    addProduct: addProductToCartHandler,
    removeProduct: removeProductFromCartHandler,
    clearCart: clearCartHandler,
    changeCity: changeCityHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

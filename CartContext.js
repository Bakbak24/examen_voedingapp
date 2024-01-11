import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);

  const addToCart = (pizza) => {
    setCartItems([...cartItems, pizza]);
  };
 
  const removeFromCart = (pizza) => {
    const updatedCart = cartItems.filter((item) => item.id !== pizza.id);
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addToFavorites = (pizza) => {
    setFavoriteItems([...favoriteItems, pizza]);
  };

  const removeFromFavorites = (pizza) => {
    const updatedFavorites = favoriteItems.filter((item) => item.id !== pizza.id);
    setFavoriteItems(updatedFavorites);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, favoriteItems, addToFavorites, removeFromFavorites }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart moet in de CartProvider zitten');
  }
  return context;
};

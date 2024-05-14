import React, {createContext, useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import PropTypes from "prop-types";

const CartContext = createContext(undefined);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    let [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    const addToCart = (product) => {
        setCartItems([...cartItems, product]);
        redirect('/cart');
    };

    const redirect = (path) => {
        navigate(path)
    }

    return (
      <CartContext.Provider value={{cartItems, addToCart, redirect, setCartItems}}>
          <div id={'container'}>
              {children}
          </div>
      </CartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.node.isRequired
}

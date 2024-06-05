import React, {createContext, useContext, useMemo, useState} from 'react';
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

    const contextValue = useMemo(() => ({
        cartItems,
        addToCart,
        redirect,
        setCartItems
    }), [cartItems, addToCart, redirect, setCartItems]);

    return (
      <CartContext.Provider value={contextValue}>
          <div id={'container'}>
              {children}
          </div>
      </CartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.node.isRequired
}

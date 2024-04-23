import React from 'react';
import {useCart} from "./CartContext";
import axios from "axios";

function Payments() {
    const { cartItems, redirect, setCartItems } = useCart();

    let amount = 0;
    cartItems.forEach(product => amount += product.price)

    const orderAndPay = async () => {
        await axios.post('http://localhost:8080/payments', {id: 1, products: cartItems, amount: amount});
        setCartItems([])
        redirect('/')
    }

    return (
        <div>
            <h2>Amount to pay: {amount.toFixed(2)} PLN</h2>
            <button onClick={() => orderAndPay()}>Order and pay</button>
            <br/><br/>
            <button onClick={() => redirect('/cart')}>Back to cart</button>
        </div>
    );
}

export default Payments;
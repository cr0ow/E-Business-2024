import React from 'react';
import {useCart} from "./CartContext";

function Cart() {
    const { cartItems, redirect } = useCart();

    let amount = 0;
    cartItems.forEach(product => amount += product.price)

    return (
        <div>
            <button id='cartButton' onClick={() => redirect('/')}>Back to products</button>
            <h1>Cart</h1>
            <ul>
                {cartItems.map((product, index) => (
                    <li key={product.id}> {product.name} </li>
                ))}
            </ul>
            <h2>Amount: {amount.toFixed(2)} PLN</h2>
            <button id='cartButton' onClick={() => redirect('/payments')}>Buy</button>
        </div>
    );
}

export default Cart;
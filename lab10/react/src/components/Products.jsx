import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useCart} from "./CartContext";

function Products() {

    const [products, setProducts] = useState([]);
    const { addToCart, redirect } = useCart();

    useEffect( () => {
        async function fetchProducts() {
            try {
                const res = await axios.get('https://backend10.azurewebsites.net/products');
                setProducts(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchProducts().then(r => r);
    }, []);

    return (
        <>
            <h1>Products</h1>
            <ul>
                {
                    products.map(((product, index) => {
                        return (<li key={product.id}>{product.name}, {product.price} PLN <button
                            onClick={() => addToCart(product)}>Add to cart</button></li>);
                    }))
                }
            </ul>
            <button id='cartButton' onClick={() => redirect('/cart')}>Cart</button>
        </>
    );
}

export default Products;

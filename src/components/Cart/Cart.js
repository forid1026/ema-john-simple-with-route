import React from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';

const Cart = (props) => {

    const cart = props.cart;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
    }

    let shipping = 0;
    if (total > 35) {
        shipping = 15.99;
    }
    else if (total > 15) {
        shipping = 4.99;
    }
    else if (total > 0) {
        shipping = 12.99;
    }

    const totalPrice = total + shipping;
    let estimatedTax = 0;
    estimatedTax = (total * 10 / 100);
    let grandTotal = (totalPrice + estimatedTax);

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h2>Order Summery</h2>
            <p>Items Ordered: {cart.length}</p>
            <p>Shipping & Handling: ${shipping}</p>
            <p>Total Before Tax: ${formatNumber(total)} </p>
            <p>Estimated Tax: ${formatNumber(estimatedTax)}</p>
            <p>Product Price: ${formatNumber(total)}</p>
            <h2 className="orderTotal">Order Total: ${formatNumber(grandTotal)}</h2>
            <br></br>
            {
                props.children
            }
        </div>
    );
};

export default Cart;
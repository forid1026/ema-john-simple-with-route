import React from 'react';
import Cart from '../Cart/Cart';
import { useState, useEffect } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';
 
const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();
    const handleProceedCheckout = () =>{
        history.push('/Shipment');        
    }


    const removeProduct = (productKey) => {
        const newCart = cart.filter(product => product.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);


    }

    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(product => product.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);    
    }, []);

    let thankYou;
     if(orderPlaced){
       thankYou = <img src={happyImage} alt=""/>
     }


    return ( 
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(product => <ReviewItem product={product} key={product.key}
                    removeProduct={removeProduct}></ReviewItem>)
                }
                {
                    thankYou
                }
            </div>
            
            <div className="cart-container">
                <Cart cart={cart}>
                    <button className="main-btn" onClick={handleProceedCheckout}>Proceed Checkout</button>
                </Cart>

            </div>
        </div>
    );

};
export default Review;
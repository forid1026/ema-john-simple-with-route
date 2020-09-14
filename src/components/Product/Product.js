import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Product = (props) => {
    //console.log(props);
    const { img, name, seller, price, stock, star, key } = props.product;
    return (
        <div className="product">

            <div>
                <img src={img} alt="" />
            </div>

            <div>
                <h4 className="product-heading"><Link to={"/product/"+ key}>{name}</Link></h4>
                <p><small>by: {seller} </small></p>
                <p>&#36;{price}</p><br></br>
                <p><small>only {stock} left in stock - order soon</small></p>
               {
               props.showAddToCart &&
               <button className="main-btn"
                onClick = {() => props.handleAddProduct(props.product)}
                > <FontAwesomeIcon icon={ faShoppingCart } />  add to cart</button
                >}
                
            </div>





        </div>


    );
};

export default Product;
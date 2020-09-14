import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity,key,price} = props.product;
    const reviewItemStyle ={
        borderBottom : '1px solid lightgray',
        marginBottom : '5px',
        paddingBottom: '5px',
        marginLeft: '200px',
    }
    return (
        <div className="review-item" style={reviewItemStyle} >
            <h4 className="product-name">{name}</h4>
            <p>Quantity: {quantity}</p>
            <br/>
            <button className="main-btn" onClick={()=> props.removeProduct(key)}>Remove</button>
    <p><small>${price}</small></p>
        </div>
    );
};

export default ReviewItem;
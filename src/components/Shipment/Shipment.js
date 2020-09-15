import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import './shipment.css';import {UserContext} from '../../App';
const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = data => {
        console.log(data);
    };


    return (
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input name="name" defaultValue={loggedInUser.name} placeholder="Your Name" ref={register({ maxLength: 20 })} />
            {errors.name && <span className="error">This field is required</span>}


            <input type="email" name="email" placeholder="Your Email" defaultValue={loggedInUser.email} ref={register({ required: true })} />
            {errors.email && <span className="error">This field is required</span>}

            <input type="tel" placeholder="Your Phone Number" name="phone" ref={register({ required: true })} />
            {errors.phone && <span className="error">This field is required</span>}

            <input type="number" placeholder="Your Age" name="age" ref={register({ min: 18, max: 99 })} />
            {errors.age && <span className="error">This field is required</span>}

            <input placeholder="Permanent Address" ref={register} />
            <input placeholder="Current Address" name="address" ref={register({ required: true })} />
            
            {errors.address && <span className="error">This field is required</span>}

            <input type="submit" />
        </form>
    );
};

export default Shipment;
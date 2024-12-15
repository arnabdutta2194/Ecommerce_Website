import axios from 'axios';
import { CART_ADD_ITEM,CART_REMOVE_ITEM } from '../constants/cartConstants';

export const addToCart = (id,qty) => async (dispatch, getState) => {
    try {
        // Dispatch request action to set loading state
        const { data } = await axios.get(`/api/products/${id}/`); // Make an API call to fetch products
        console.log(data)
        dispatch({ type: CART_ADD_ITEM ,
            payload : {
                product : data._id,
                name : data.name,
                image : data.image,
                price : data.price,
                countStock : data.countStock,
                qty ,
            } 
        });
    } catch (error) {
        console.log(error)
        // dispatch({
        //     type: PRODUCT_LIST_FAIL,
        //     payload: error.response && error.response.data.message ? error.response.data.message : error.message, // Dispatch error if something fails
        // });
    }
        localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
};

export const removeFromCart = (id) => (dispatch, getState) =>{
    dispatch({
        type: CART_REMOVE_ITEM,
        payload:id,
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL ,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL 
} from '../constants/productConstants';
import axios from 'axios';

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST }); // Dispatch request action to set loading state
        const { data } = await axios.get('/api/products/'); // Make an API call to fetch products
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data, // Dispatch success action with the fetched data
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message, // Dispatch error if something fails
        });
    }
};

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST }); // Dispatch request action to set loading state
        const { data } = await axios.get(`/api/product/${id}`); // Make an API call to fetch products
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data, // Dispatch success action with the fetched data
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message, // Dispatch error if something fails
        });
    }
};


// listProducts: This is an action creator that returns a thunk (a function) to dispatch actions.
// It first dispatches PRODUCT_LIST_REQUEST to indicate that the data is being fetched.
// Then, it uses axios to make a GET request to the API (api/products/) to fetch the list of products.
// Once the data is fetched, it dispatches PRODUCT_LIST_SUCCESS with the fetched data (payload: data).
// If an error occurs during the API call, it dispatches PRODUCT_LIST_FAIL with the error message.

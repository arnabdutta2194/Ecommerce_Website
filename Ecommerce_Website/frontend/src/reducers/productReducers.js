import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL ,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL 

} from '../constants/productConstants';

export const productListReducer = (state = { products: [] }, action) => {
    switch(action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }; // State while loading products
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }; // Successfully fetched products
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }; // Failed to fetch products
        default:
            return state;
    }
};

export const productDetailsReducer = (state = { product:{reviews : []} }, action) => {
    switch(action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }; // State while loading products
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }; // Successfully fetched products
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }; // Failed to fetch products
        default:
            return state;
    }
};


// productListReducer: A reducer function that manages the productList state. It handles three action types:
// PRODUCT_LIST_REQUEST: Sets loading to true and clears any existing products (i.e., state is reset when a new request is made).
// PRODUCT_LIST_SUCCESS: Updates the state with the fetched products and sets loading to false.
// PRODUCT_LIST_FAIL: Updates the state with an error message and sets loading to false.
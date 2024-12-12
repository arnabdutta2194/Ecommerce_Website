import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer,productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails : productDetailsReducer,
    cart : cartReducer,

     // Combining reducers
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')) : 
    []


const initialState = {
    cart : {cartItems : cartItemsFromStorage }
}; // Initial state of the application

const middleware = [thunk]; // Using thunk for async actions

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware)) // Middleware to handle async actions
);

export default store;

//createStore: Creates a Redux store with a combined set of reducers (productListReducer), an initial state, and middleware.
//applyMiddleware(thunk): Adds redux-thunk middleware to handle asynchronous actions.
//composeWithDevTools: Integrates with Redux DevTools Extension for easier debugging in the browser.
//Reducers: Combines the productListReducer which will manage the productList slice of the state.
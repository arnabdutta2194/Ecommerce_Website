import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL , USER_LOGOUT,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_RESET
} from '../constants/userConstants';
import axios from 'axios';

export const login = (email,password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST }); // Dispatch request action to set loading state
        const config =  {headers : {'Content-type':'application/json'}}
        const { data } = await axios.post('/api/users/login/',
            {'username':email, 'password':password}, config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data, // Dispatch success action with the fetched data
        });
        localStorage.setItem('userInfo',JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message, // Dispatch error if something fails
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type:USER_LOGOUT})
    dispatch({type:USER_DETAILS_RESET})
}

export const register = (name, email,password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST }); // Dispatch request action to set loading state
        const config =  {headers : {'Content-type':'application/json'}}
        const { data } = await axios.post('/api/users/register/',
            {'name' : name, 'email':email, 'password':password}, config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data, // Dispatch success action with the fetched data
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data, // Dispatch success action with the fetched data
        });
        localStorage.setItem('userInfo',JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message, // Dispatch error if something fails
        });
    }
};


export const getUserDetails = (id) => async (dispatch,getState) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST }); // Dispatch request action to set loading state
        const {userLogin : {userInfo}} = getState() // Fetch data of the current loggedin User from state , this works like use selector
        const config =  {headers : {'Content-type':'application/json', Authorization :`Bearer ${userInfo.token}`}} // Add the token to the header as it is a authenticated route
        const { data } = await axios.get(`/api/users/${id}`,config)
        

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data, // Dispatch success action with the fetched data
        });


    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message, // Dispatch error if something fails
        });
    }
};


export const updateUserProfile = (user) => async (dispatch,getState) => {
    try {
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST }); // Dispatch request action to set loading state
        const {userLogin : {userInfo}} = getState() // Fetch data of the current loggedin User from state , this works like use selector
        const config =  {headers : {'Content-type':'application/json', Authorization :`Bearer ${userInfo.token}`}} // Add the token to the header as it is a authenticated route
        const { data } = await axios.put(`/api/users/profile/update/`,
            user,config)
        
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data, // Dispatch success action with the fetched data
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data, // Dispatch success action with the fetched data
        });
        localStorage.setItem('userInfo',JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message, // Dispatch error if something fails
        });
    }
};
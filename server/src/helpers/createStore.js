// This is redux store for server-side

// Packages for redux store
import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';

// importing axios to create server-side specific axios instance
import axios from 'axios';

// importing reducers
import reducers from '../client/reducers';

// req is to grab browser cookies
export default (req) => {

    // Creating a server-side axios specific instance
    const axiosInstance = axios.create({
        baseURL: 'http://react-ssr-api.herokuapp.com', // base url is full because server-side is not being proxied
        headers: {cookie: req.get('cookie') || ''} // if there is a cookie use cookie else default to empty string
    });

    // Creating redux store for server-side
    const store = createStore(
        reducers,
        {},
        applyMiddleware(thunk.withExtraArgument(axiosInstance))
    );

    return store;
};
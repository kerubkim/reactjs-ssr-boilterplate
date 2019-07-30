// Intended to ONLY run on the browser-side

import * as apiEndpoints from '../static/strings/apiEndpoints';

// This is for webpack to bundle JS event handlers, onClicks, etc..
import 'babel-polyfill'; // allows babel to use async function
import React from 'react';
import ReactDom from 'react-dom';

// BrowserRouter for client-side routing
import {BrowserRouter} from "react-router-dom";

// Packages for redux store
import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

// renderRoutes if for handling Routes array items
import {renderRoutes} from "react-router-config";

// importing axios to create a client-side specific axios instance
import axios from 'axios';

// importing reducers
import reducers from './reducers';

import Routes from './Routes';

// axios instance specific for client-side api requests
const axiosInstance = axios.create({
   baseURL: apiEndpoints.CLIENT_SIDE_BASE_URL // baseUrl is not full url because of the proxy. '/api' will be prepended on the proxy url during api calls
});

// Creating a redux store for client-side
// window.INITIAL_STATE is from renderer.js hardcoded script
const store = createStore(
    reducers,
    window.INITIAL_STATE,
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

ReactDom.hydrate(
    <Provider store={store}>
        <BrowserRouter>
            <div>{renderRoutes(Routes)}</div>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
);
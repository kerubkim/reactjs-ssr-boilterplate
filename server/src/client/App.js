import React from 'react';
import { renderRoutes } from 'react-router-config';

import { fetchCurrentUser } from "./actions/userActions";

import Header from './components/Header';

// parameter 'route' are the child components that is matched from Routes.js
const App = ({route}) => {
    return (
        <div>
            <Header />
            {renderRoutes(route.routes)}
        </div>
    );
};

// function to load data on server-side. Only ROOT && Pages level components should have loadData
const loadData = (state) => {
    return state.dispatch(fetchCurrentUser());
};

export default {
    component: App,
    loadData,
};
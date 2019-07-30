// Routes for client and server-side routing

import * as routeNames from '../static/strings/routeNames';

import React from 'react';

import App from './App';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';
import AdminsListPage from './pages/AdminsListPage';

// each object item is a browser url path
export default [
    {
        ...App, // ROOT Component (this component is being rendered all the time)
        routes: [ // any routes that is matched will be passed into App component as child component and placed inside of App component
            {
                ...HomePage,
                path: routeNames.HOME,
                exact: true,
            },
            {
                ...UsersListPage,
                path: routeNames.USERS,
            },
            {
              ...AdminsListPage,
              path: routeNames.ADMINS,
            },
            {
                ...NotFoundPage  // This component will be rendered if there are NO route matches
            },
        ]
    }

];

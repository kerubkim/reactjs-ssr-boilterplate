// Intended to ONLY run on the server-side

import * as apiEndpoints from './static/strings/apiEndpoints';

// We are able to use import statements instead of require() because we are using babel with es15
import 'babel-polyfill'; // allows babel to use async function
import express from 'express';
import renderer from './helpers/renderer';

// matchRoutes is for identifying path is the viewer trying to view and matches the url path from Routes
import {matchRoutes} from 'react-router-config';
import Routes from './client/Routes';

// importing createStore for server-side redux store
import createStore from './helpers/createStore';

// Proxy package to api server that we are making requests from the server-side using client-side cookies
import proxy from 'express-http-proxy';

const port = 3000;

// Create Express instance
const app = express();

// any attempt at a route with '/api' we will proxy client-side with cookie api calls as server-side calls
app.use(apiEndpoints.CLIENT_SIDE_BASE_URL,
    proxy(apiEndpoints.SERVER_SIDE_BASE_URL, // <-- test api
        { // <-- Options object is ONLY for test api in use
            proxyReqOptDecorator(opts) {
                opts.headers['x-forwarded-host'] = 'localhost:3000';
                return opts;
            }
        }
    )
);

// making public directory available to everyone
app.use(express.static('public'));

// ROUTE
app.get('*', (req, res) => {

    // initialize store for server-side
    const store = createStore(req); // passing req for createStore to use browser cookies

    // ********************************************
    // logic to initialize and load data into store
    // ********************************************

    // match viewer url path to Route paths and returns promises list of loadData's and sets of components to render
    const promises = matchRoutes(Routes, req.path)
        .map(({route}) => {
            // map through each matched route paths and route path has a loadData function, if so provoke function
            return route.loadData ? route.loadData(store) : null;
        })
        .map(promise => {
            // Handling api request failed status responses. Render components even at failed responses
            // resolving all promises, even if a promise returned a failed response
            if (promise) {
                return new Promise((resolve, reject) => {
                    promise.then(resolve).catch(resolve);
                });
            }
        });

    // Waits until all promises in loadData axios requests is finish
    Promise.all(promises).then(() => {

        // context is used for redirects, navigation change, error handling, etc...
        const context = {};
        // pass server-side request, redux server-side store, error contexts into renderer
        const content = renderer(req, store, context);

        // checking if context has a URL to redirect to instead of rendering content
        if (context.url) {
            return res.redirect(301, context.url);
        }

        // checking if the page component has a context object key 'notFound'
        if (context.notFound) {
            res.status(404);
        }

        res.send(content);

    });

});

app.listen(port, () => {
    console.log(`Its over port ${port}!!!`);
});
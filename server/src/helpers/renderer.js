// Render React app and return as string

import React from 'react';
import {renderToString} from 'react-dom/server';

// StaticRouter for server-side rendering
import {StaticRouter} from 'react-router-dom';

// Provider for redux server-side store
import {Provider} from 'react-redux';

// renderRoutes if for handling Routes array items
import {renderRoutes} from "react-router-config";

// To prevent XSS attacks
import serialize from 'serialize-javascript';

// SEO package
import {Helmet} from 'react-helmet';

import Routes from '../client/Routes';

// StaticRouter needs the exact url path of what the viewer is requesting for
// StaticRouter with context is redirects, navigation change, error handling, etc...
export default (req, store, context) => {
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.path} context={context}>
                <div>{renderRoutes(Routes)}</div>
            </StaticRouter>
        </Provider>
    );

    // grabbing all meta tags of a page component that is using Helmet
    const helmet = Helmet.renderStatic();

    // html with public bundle.js
    return `
        <html>
            <head>
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
                <link rel="stylesheet" href="main.css" />
            </head>
            <body>
                <div id="root">${content}</div>
                <!-- initialize state to redux store for client-side -->
                <script>
                    window.INITIAL_STATE = ${serialize(store.getState())}
                </script>
                <script src="bundle.js"></script>
            </body>
        </html>
    `;
};
import React from 'react';


// renderer context is passed inside of staticContext
// if staticContext is not defined, default staticContext as empty {}
const NotFoundPage = ({ staticContext = {} }) => {
    // Setting notFound context object key as true;
    staticContext.notFound = true;
    return <h1>Oops, route not found.</h1>;
};

export default {
    component: NotFoundPage
};
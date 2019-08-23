import React from 'react';

const HomePage = () => {
    return (
        <div className={"center-align"} style={{marginTop: 200}}>
            <h3>Welcome</h3>
            <img alt="Wingman" src={require("../../assets/img/willatwo.jpg")}/>
            <p>This is a isomorphic(server side rendering) boiler plate with Google Auth</p>
        </div>
    );
};

// exporting as object for the use of spread operator in Routes
export default {
    component: HomePage
};
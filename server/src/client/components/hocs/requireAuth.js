// ********************
// High Order Component
// ********************

import * as routeNames from '../../../static/strings/routeNames';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

// ChildComponent = child components of App.js, ie: pages component
export default (ChildComponent) => {

    class RequireAuth extends Component {

        render() {
            switch(this.props.auth) {
                case false:
                    // if auth is not authenticated
                    return <Redirect to={routeNames.HOME}/>;
                case null:
                    // if auth is not fetched yet
                    return <div>Loading...</div>;
                default:
                    // if auth is authenticated, return ChildComponent with this.props for rendering
                    return <ChildComponent {...this.props}/>
            }
        }

    }

    const mapStateToProps = ({auth}) => {
        return {auth}
    };

    // returning/exporting RequireAuth component
    return connect(mapStateToProps)(RequireAuth);

};
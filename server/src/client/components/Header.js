
import * as routeNames from '../../static/strings/routeNames';

import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const Header = ({auth}) => {

    const authButton = auth ? (
        <a href={routeNames.LOG_OUT}>Logout</a>
    ) : (
        <a href={routeNames.LOG_IN}>Login</a>
    );

    return (
        <nav>
            <div className={"nav-wrapper"}>
                <Link to={routeNames.HOME} className={"brand-logo"}>LOGO HERE</Link>
                <ul className={"right"}>
                    <li><Link to={routeNames.USERS}>Users</Link></li>
                    <li><Link to={routeNames.ADMINS}>Admins</Link></li>
                    <li>{authButton}</li>
                </ul>
            </div>
        </nav>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
};

export default connect(mapStateToProps)(Header);
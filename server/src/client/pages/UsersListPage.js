import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchUsers} from "../actions/userActions";
import {Helmet} from 'react-helmet';

class UsersListPage extends Component {

    componentDidMount() {
        // fetching is still required. To prevent data missing if ie: viewer is on the HomePage and navigated to thisPage view button click and not directly typing the browser url route
        this.props.onFetchUsers();
    }

    _renderUsers() {
        return this.props.users.map(user => {
           return <li key={user.id}>{user.name}</li>;
        });
    }

    _renderMetas() {
        return (
            <Helmet>
                <title>{`${this.props.users.length} Users Loaded`}</title>
                <meta property={"og:title"} content={"Users App"} />
            </Helmet>
        );
    }

    render() {
        return (
          <div>
              {this._renderMetas()}
              <h3>Here's a list of users</h3>
              <ul>{this._renderUsers()}</ul>
          </div>
        );
    }
}

const mapStateToProps = state => {
    return {users: state.users}
};

const mapDispatchToProps = {
    onFetchUsers: fetchUsers,
};

// function to load data on server-side. Only ROOT && Pages level components should have loadData
const loadData = (store) => {
    return store.dispatch(fetchUsers());
};

// exporting as object for spread the use of operator in Routes
export default {
    loadData,
    component: connect(mapStateToProps, mapDispatchToProps)(UsersListPage),
};
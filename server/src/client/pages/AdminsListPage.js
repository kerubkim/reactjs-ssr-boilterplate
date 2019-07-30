import React, { Component} from 'react';
import { connect } from 'react-redux';

import requireAuth from '../components/hocs/requireAuth';
import {fetchAdmins} from "../actions/adminActions";

class AdminsListPage extends Component {
    componentDidMount() {
        this.props.onFetchAdmins();
    }

    _renderAdmins() {
        return this.props.admins.map(admin => {
            return <li key={admin.id}>{admin.name}</li>
        });
    }

    render() {
        return (
            <div>
                <h3>Authorized only</h3>
                <ul>
                    {this._renderAdmins()}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({ admins }) => {
    return {admins}
};

const mapDispatchToProps = {
    onFetchAdmins: fetchAdmins,
};

// function to load data on server-side. Only ROOT && Pages level components should have loadData
const loadData = (store) => {
    return store.dispatch(fetchAdmins());
};

// exporting as object for spread the use of operator in Routes
export default {
    component: connect(mapStateToProps,mapDispatchToProps)(requireAuth(AdminsListPage)), // <-- passing AdminsListPage page component into requireAuth component function for checking authentication
    loadData
}
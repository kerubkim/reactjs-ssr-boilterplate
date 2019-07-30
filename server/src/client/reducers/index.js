// Combining all reducers for client-side and server-side store
import { combineReducers } from "redux";

import usersReducer from './usersReducer';
import authReducer from './authReducer';
import adminReducer from './adminsReducer';

export default combineReducers({
    users: usersReducer,
    auth: authReducer,
    admins: adminReducer,
});

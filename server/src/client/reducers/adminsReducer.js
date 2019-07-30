import * as actionNames from '../../static/strings/actionNames';

export default (state = [], action) => {
    switch(action.type) {
        case actionNames.FETCH_ADMINS:
            return action.payload.data;
        default:
            return state;
    }
}
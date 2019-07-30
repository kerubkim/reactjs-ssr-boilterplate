import * as actionNames from '../../static/strings/actionNames';

export default function(state = null, action) {
    switch(action.type) {
        case actionNames.FETCH_CURRENT_USER:
            return action.payload.data || false;

        default:
            return state;
    }
}
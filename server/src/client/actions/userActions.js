import * as actionNames from "../../static/strings/actionNames";
import * as apiEndpoints from '../../static/strings/apiEndpoints';

export const fetchUsers = () => async (dispatch, getState, api) => { // api parameter is being passed from thunk.withExtraArgument(axiosInstance) argument
    const res = await api.get(apiEndpoints.FETCH_USERS);

    dispatch({
        type: actionNames.FETCH_USERS,
        payload: res,
    })
};

export const fetchCurrentUser = () => async (dispatch, getState, api) => { // api parameter is being passed from thunk.withExtraArgument(axiosInstance) argument
    const res = await api.get(apiEndpoints.FETCH_CURRENT_USER);

    dispatch({
        type: actionNames.FETCH_CURRENT_USER,
        payload: res,
    })

};
import * as actionNames from "../../static/strings/actionNames";
import * as apiEndpoints from '../../static/strings/apiEndpoints';

export const fetchAdmins = () => async (dispatch, getState, api) => { // api parameter is being passed from thunk.withExtraArgument(axiosInstance) argument
    const res = await api.get(apiEndpoints.FETCH_ADMINS);

    dispatch({
        type: actionNames.FETCH_ADMINS,
        payload: res,
    })
};
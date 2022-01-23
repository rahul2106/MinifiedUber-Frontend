import initialState from "../initialState";
import { GET_USER_REQUEST,GET_USER_SUCCESS,GET_USER_FAILURE } from "../actions";

const getUsers = (state = initialState,type,payload) => {
    switch(type){
        case GET_USER_REQUEST:
            return {...state,getUserLoading:true};

        case GET_USER_SUCCESS:
            return {...state,getUserLoading:false};
        
        case GET_USER_FAILURE:
            return {...state,getUserLoading:false};
        
        default:
            return state;
    }
};

export default getUsers;
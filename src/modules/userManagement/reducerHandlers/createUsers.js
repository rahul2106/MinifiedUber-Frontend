import initialState from "../initialState";
import { CREATE_USER_REQUEST,CREATE_USER_SUCCESS,CREATE_USER_FAILURE } from "../actions";

const createUsers = (state = initialState,type,payload) => {
    switch(type){
        case CREATE_USER_REQUEST:
            return {...state,getUserLoading:true};

        case CREATE_USER_SUCCESS:
            return {...state,getUserLoading:false};
        
        case CREATE_USER_FAILURE:
            return {...state,getUserLoading:false};
        
        default:
            return state;
    }
};

export default createUsers;
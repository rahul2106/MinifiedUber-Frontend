import initialState from "./initialState";
import * as actions from "./actions";
import getUsers from "./reducerHandlers/getUsers";
import createUsers from "./reducerHandlers/createUsers";

const reducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.GET_USER_REQUEST:
    case actions.GET_USER_SUCCESS:
    case actions.GET_USER_FAILURE:
      return getUsers(state, type, payload);

    case actions.CREATE_USER_REQUEST:
    case actions.CREATE_USER_SUCCESS:
    case actions.CREATE_USER_FAILURE:
      return createUsers(state, type, payload);

    default:
      return state;
  }
};

export default reducers;

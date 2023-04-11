import {
  ALL_BOXES_FAIL,
  ALL_BOXES_REQUEST,
  ALL_BOXES_SUCCESS,
  BOX_DETAILS_FAIL,
  BOX_DETAILS_REQUEST,
  BOX_DETAILS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_BOX_FAIL,
  DELETE_BOX_REQUEST,
  DELETE_BOX_RESET,
  DELETE_BOX_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  NEW_BOX_FAIL,
  NEW_BOX_REQUEST,
  NEW_BOX_RESET,
  NEW_BOX_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  UPDATE_BOX_FAIL,
  UPDATE_BOX_REQUEST,
  UPDATE_BOX_RESET,
  UPDATE_BOX_SUCCESS,
} from "../constants/constants";

export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case LOGIN_FAIL:
    case REGISTER_USER_FAIL:
    case LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};
export function boxReducer(state = { products: [] }, action) {
  switch (action.type) {
    case ALL_BOXES_REQUEST:
      return {
        loading: true,
        boxes: [],
      };
    case ALL_BOXES_SUCCESS:
      return {
        loading: false,
        boxes: action.payload,
      };
    case ALL_BOXES_FAIL:
      return {
        loading: false,
        error: action.payload,
        boxes: [],
      };
    case CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }
    default:
      return {
        ...state,
      };
  }
}

export function boxUDReducer(state = {}, action) {
  switch (action.type) {
    case DELETE_BOX_REQUEST:
    case UPDATE_BOX_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_BOX_SUCCESS:
      return {
        loading: false,
        isDeleted: true,
      };
    case UPDATE_BOX_SUCCESS:
      return {
        loading: false,
        isUpdated: true,
      };
    case DELETE_BOX_FAIL:
    case UPDATE_BOX_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }
    case DELETE_BOX_RESET: {
      return {
        ...state,
        isDeleted: false,
      };
    }
    case UPDATE_BOX_RESET: {
      return {
        ...state,
        isUpdated: false,
      };
    }
    default:
      return {
        ...state,
      };
  }
}

export function boxDetailsReducer(state = { box: {} }, action) {
  switch (action.type) {
    case BOX_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BOX_DETAILS_SUCCESS:
      return {
        box: action.payload,
        loading: false,
      };
    case BOX_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
export function newBoxReducer(state = { product: {} }, action) {
  switch (action.type) {
    case NEW_BOX_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_BOX_SUCCESS:
      return {
        product: action.payload.product,
        success: true,
        loading: false,
      };
    case NEW_BOX_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }
    case NEW_BOX_RESET: {
      return {
        ...state,
        success: false,
      };
    }
    default:
      return {
        ...state,
      };
  }
}

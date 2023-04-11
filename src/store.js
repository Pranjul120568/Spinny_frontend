import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { authReducer, boxDetailsReducer, boxReducer, boxUDReducer, newBoxReducer } from "./reducers/reducers";

const reducer = combineReducers({
  auth: authReducer,
  boxes:boxReducer,
  box:boxUDReducer,
  boxDetails:boxDetailsReducer,
  newBox:newBoxReducer
});
let initialState = {
  boxes:{
    boxes:[]
  },
  boxDetails:{
    box:{}
  },
  auth:{
    user:{}
  }
};
let store;
export function configureStore() {
  store = createStore(reducer, initialState, applyMiddleware(thunk, logger));
  return store;
}

import {
  Action,
  Reducer,
  Store,
  StoreEnhancer,
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux';
import { AppState, userState } from '../app.state';
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED} from '../types';
const initState = {
  authenticated: false,
  credentials: {}
}
export const userReducer: Reducer<userState> =
  (state: userState = initState, action: Action): userState => {
    switch (action.type) {
    case SET_AUTHENTICATED:
      return Object.assign({}, state, { authenticated: true });
    case SET_UNAUTHENTICATED:
      return Object.assign({}, state, { authenticated: false });
    default:
      return state;
    }
  };

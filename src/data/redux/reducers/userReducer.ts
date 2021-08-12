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
import { User_Action } from '../actions/userActions';
import { AppState, userState } from '../app.state';
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_TOKEN} from '../types';
const initState = {
  authenticated: false,
  credentials: {},
  token: undefined
}
export const userReducer: Reducer<userState> =
  (state: userState = initState, action: User_Action): userState => {
    switch (action.type) {
    case SET_AUTHENTICATED:
      return Object.assign({}, state, { authenticated: true });
    case SET_UNAUTHENTICATED:
      return Object.assign({}, state, { authenticated: false });
    case SET_TOKEN:
      return Object.assign({}, state, { token: action.payload})
    default:
      return state;
    }
  };

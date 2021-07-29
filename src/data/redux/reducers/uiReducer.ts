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
import { UI_Action } from '../actions/uiActions';
import { AppState, uiState } from '../app.state';
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED} from '../types';
const initState = {
  loading: false
}
export const uiReducer: Reducer<uiState> =
  (state: uiState = initState, action: UI_Action): uiState => {
    switch (action.type) {
      case LOADING_UI:
        return Object.assign({}, state, { loading: action.payload ? action.payload : true });
      default:
        return state;
    }
  };

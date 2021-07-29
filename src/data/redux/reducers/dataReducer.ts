import {
  Action,
  Reducer
} from 'redux';
import { I_Data_Action } from '../actions/dataActions';
import { AppState, dataState } from '../app.state';
import { CLEAR_ENTRIES, ADD_DOCKET_ENTRIES, ADD_DOCKETS, CLEAR_SEARCH, ADD_DOCKET } from '../types';
const initialState = {
  docket: {},
  search: [],
  entries: []
}
export const dataReducer: Reducer<dataState> =
  (state = initialState, action: I_Data_Action): dataState => {
    switch (action.type) {
    case CLEAR_ENTRIES:
      return {...state, entries: []};
    case CLEAR_SEARCH:
      return {...state, search: []};
    case ADD_DOCKET_ENTRIES :
      return {
        ...state,
        entries: state.entries.concat(action.payload)
      }
    case ADD_DOCKETS :
      return {
        ...state,
        search: state.search.concat(action.payload)
      }
    case ADD_DOCKET :
      return {
        ...state,
        docket: action.payload
      }
    default:
      return state;
    }
  };


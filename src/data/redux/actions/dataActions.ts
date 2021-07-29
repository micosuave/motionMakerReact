import {
  Action,
  ActionCreator
} from 'redux';
import { CLEAR_ENTRIES, ADD_DOCKETS, ADD_DOCKET_ENTRIES, CLEAR_SEARCH, ADD_DOCKET } from '../types';
import { IDocketEntry } from '../../../interfaces/IDocketEntry';
import { IDocket } from '../../../interfaces/IDocket';
export interface I_Data_Action extends Action {
  payload?: any
}
export const clearEntries: ActionCreator<I_Data_Action> = () => ({
  type: CLEAR_ENTRIES,
});
export const clearSearch: ActionCreator<I_Data_Action> = () => ({
  type: CLEAR_SEARCH,
});

export const addEntries: ActionCreator<I_Data_Action> = (payload: IDocketEntry | IDocketEntry[]) => ({
  type: ADD_DOCKET_ENTRIES,
  payload: payload
});

export const addDockets: ActionCreator<I_Data_Action> = (payload: IDocket | IDocket[]) => ({
  type: ADD_DOCKETS,
  payload: payload
});
export const addDocket: ActionCreator<I_Data_Action> = (payload: IDocket) => ({
  type: ADD_DOCKET,
  payload: payload
});


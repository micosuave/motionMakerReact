import {
  Action,
  ActionCreator
} from 'redux';
import { LOADING_UI, SET_ERRORS, CLEAR_ERRORS } from '../types';
export interface UI_Action extends Action {
  payload?: boolean | string
}
export const loadingUI: ActionCreator<UI_Action> = (payload = true) => ({
  type: LOADING_UI,
  payload: payload
});

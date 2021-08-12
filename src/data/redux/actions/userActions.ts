import {
  Action,
  ActionCreator
} from 'redux';
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_TOKEN, SET_AUTHENTICATED, SET_UNAUTHENTICATED} from '../types';

export interface User_Action extends Action {
  payload?: boolean | string
}
export const setTokenAction: ActionCreator<User_Action> = (payload: string | undefined) => ({
  type: SET_TOKEN,
  payload: payload
});
export const setUserAction: ActionCreator<User_Action> = (payload) => ({
  type: SET_USER,
  payload: payload
});
export const setAuthenticatedAction: ActionCreator<User_Action> = (payload: boolean) => ({
  type: SET_TOKEN,
  payload: payload
});

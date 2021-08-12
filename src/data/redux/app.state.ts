import { User } from '../../interfaces/user';
import { IDocket } from '../../interfaces/IDocket';
import { IDocketEntry } from '../../interfaces/IDocketEntry';

export interface uiState {
  loading: (boolean | string)
}

export interface userState {
  authenticated: boolean,
  credentials?: any,
  token?: string
}
export interface dataState {
  docket?: IDocket | {},
  entries?: IDocketEntry[],
  search?: IDocket[]
}
export interface AppState {
  uiState: uiState,
  userState: userState,
  dataState: dataState
}

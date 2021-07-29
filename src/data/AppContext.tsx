import React, { createContext, useReducer } from 'react';
import { createStore, combineReducers, compose, Store, StoreEnhancer } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { initialState, AppState, reducers } from './state'
import {userReducer} from './redux/reducers/userReducer';
import {dataReducer} from './redux/reducers/dataReducer';
import {uiReducer} from './redux/reducers/uiReducer';
// import { AppState } from './redux/app.state';


const Myreducers = combineReducers({
  userState: userReducer,
  uiState: uiReducer,
  dataState: dataReducer
});

const ReduxStore = createStore(Myreducers, composeWithDevTools());
export interface AppContextState {
  state: AppState;
  dispatch: React.Dispatch<any>;
}

export const AppContext = createContext<AppContextState>({
  state: initialState,
  dispatch: () => undefined
});

export const AppContextProvider: React.FC = (props => {

  const [store, dispatch] = useReducer(reducers, initialState);

  return (
    <Provider store={ReduxStore}>
      <AppContext.Provider value={{
        state: store,
        dispatch
      }}>
        {props.children}
      </AppContext.Provider>
    </Provider>

  )
});

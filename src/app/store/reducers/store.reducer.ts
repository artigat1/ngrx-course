import {ActionReducer, combineReducers} from '@ngrx/store';
import {compose} from '@ngrx/core';
import {routerReducer} from '@ngrx/router-store';
import {storeFreeze} from 'ngrx-store-freeze';

import {ApplicationState, INITIAL_APPLICATION_STATE} from '../application-state';
import {uiStateReducer} from './uiState.reducer';
import {storeDataReducer} from './storeData.reducer';
import {environment} from '../../../environments/environment';

const reducers = {
  router: routerReducer,
  uiState: uiStateReducer,
  storeData: storeDataReducer
};

const developmentReducer: ActionReducer<ApplicationState> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<ApplicationState> = combineReducers(reducers);

export function appReducer(state: ApplicationState = INITIAL_APPLICATION_STATE, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  }

  return developmentReducer(state, action);
}

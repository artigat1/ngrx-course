import {RouterState} from '@ngrx/router-store';

import {INITIAL_UI_STATE, UiState} from './ui-state';
import {INITIAL_STORE_DATA, StoreData} from './store-data';

export interface ApplicationState {
  router: RouterState,
  uiState: UiState;
  storeData: StoreData;
}

export const INITIAL_APPLICATION_STATE: ApplicationState = {
  router: {
    path: 'home'
  },
  uiState: INITIAL_UI_STATE,
  storeData: INITIAL_STORE_DATA
};

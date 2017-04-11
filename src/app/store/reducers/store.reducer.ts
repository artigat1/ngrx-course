import {Action} from '@ngrx/store';

import {ApplicationState, INITIAL_APPLICATION_STATE} from '../application-state';
import {uiStateReducer} from './uiState.reducer';
import {storeDataReducer} from './storeData.reducer';

export function storeReducer(state: ApplicationState = INITIAL_APPLICATION_STATE,
                             action: Action): ApplicationState {
  return {
    uiState: uiStateReducer(state.uiState, action),
    storeData: storeDataReducer(state.storeData, action)
  };
}

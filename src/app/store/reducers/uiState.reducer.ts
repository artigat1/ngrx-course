import {Action} from '@ngrx/store';

import {INITIAL_UI_STATE, UiState} from '../ui-state';
import {THREAD_SELECTED_ACTION} from '../actions';

export function uiStateReducer(state: UiState = INITIAL_UI_STATE, action: Action): UiState {

  switch (action.type) {

    case THREAD_SELECTED_ACTION:
      return Object.assign({}, state, {
        currentThreadId: action.payload
      });

    default:
      return state;
  }
}

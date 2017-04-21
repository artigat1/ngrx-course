import {Action} from '@ngrx/store';

import {INITIAL_UI_STATE, UiState} from '../ui-state';
import {ERROR_OCCURRED_ACTION, SELECT_USER_ACTION, THREAD_SELECTED_ACTION} from '../actions';

export function uiStateReducer(state: UiState = INITIAL_UI_STATE, action: Action): UiState {

  switch (action.type) {

    case THREAD_SELECTED_ACTION:
      return Object.assign({}, state, {
        currentThreadId: action.payload.selectedThreadId
      });

    case SELECT_USER_ACTION:
      return Object.assign({}, state, {
        userId: action.payload,
        currentThreadId: undefined
      });

    case ERROR_OCCURRED_ACTION:
      return Object.assign({}, state, {
        currentError: action.payload
      });

    default:
      return state;
  }
}

import * as _ from 'lodash';

import {INITIAL_STORE_DATA, StoreData} from '../store-data';
import {USER_THREADS_LOADED_ACTION, UserThreadsLoadedAction} from '../actions';

export function storeDataReducer(state: StoreData = INITIAL_STORE_DATA, action: any): StoreData {

  switch (action.type) {

    case USER_THREADS_LOADED_ACTION:
      return handleLoadUserThreadsAction(state, action);

    default:
      return state;
  }
}

function handleLoadUserThreadsAction(state: StoreData, action: UserThreadsLoadedAction): StoreData {

  return {
    participants: _.keyBy(action.payload.participants, 'id'),
    messages: _.keyBy(action.payload.messages, 'id'),
    threads: _.keyBy(action.payload.threads, 'id')
  };
}

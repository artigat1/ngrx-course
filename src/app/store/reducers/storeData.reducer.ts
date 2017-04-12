import * as _ from 'lodash';

const uuid = require('uuid/v4');

import {INITIAL_STORE_DATA, StoreData} from '../store-data';
import {SEND_NEW_MESSAGE_ACTION, SendNewMessageAction, USER_THREADS_LOADED_ACTION, UserThreadsLoadedAction} from '../actions';
import {Message} from '../../../../shared/model/message';

export function storeDataReducer(state: StoreData = INITIAL_STORE_DATA, action: any): StoreData {

  switch (action.type) {

    case USER_THREADS_LOADED_ACTION:
      return handleLoadUserThreadsAction(state, action);

    case SEND_NEW_MESSAGE_ACTION:
      return handleSendNewMessageAction(state, action);

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

function handleSendNewMessageAction(state: StoreData, action: SendNewMessageAction): StoreData {
  const newStoreData = _.cloneDeep(state);

  const currentThread = newStoreData.threads[action.payload.threadId];
  const newMessage: Message = {
    text: action.payload.text,
    threadId: action.payload.threadId,
    timestamp: new Date().getTime(),
    participantId: action.payload.participantId,
    id: uuid()
  };

  currentThread.messageIds.push(newMessage.id);
  newStoreData.messages[newMessage.id] = newMessage;

  return newStoreData;
}

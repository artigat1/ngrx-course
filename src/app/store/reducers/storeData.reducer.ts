import * as _ from 'lodash';
import {INITIAL_STORE_DATA, StoreData} from '../store-data';
import {
  NEW_MESSAGES_RECEIVED_ACTION,
  NewMessagesReceivedAction,
  SEND_NEW_MESSAGE_ACTION,
  SendNewMessageAction,
  THREAD_SELECTED_ACTION,
  ThreadSelectedAction,
  USER_THREADS_LOADED_ACTION,
  UserThreadsLoadedAction
} from '../actions';
import {Message} from '../../../../shared/model/message';

const uuid = require('uuid/v4');

export function storeDataReducer(state: StoreData = INITIAL_STORE_DATA, action: any): StoreData {

  switch (action.type) {

    case USER_THREADS_LOADED_ACTION:
      return handleLoadUserThreadsAction(state, action);

    case SEND_NEW_MESSAGE_ACTION:
      return handleSendNewMessageAction(state, action);

    case NEW_MESSAGES_RECEIVED_ACTION:
      return handleNewMessagesReceivedAction(state, action);

    case THREAD_SELECTED_ACTION:
      return handleThreadSelectedAction(state, action);

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
  const newStoreData: StoreData = {
    participants: state.participants,
    threads: Object.assign({}, state.threads),
    messages: Object.assign({}, state.messages)
  };

  newStoreData.threads[action.payload.threadId] = Object.assign({}, state.threads[action.payload.threadId]);

  const currentThread = newStoreData.threads[action.payload.threadId];

  const newMessage: Message = {
    text: action.payload.text,
    threadId: action.payload.threadId,
    timestamp: new Date().getTime(),
    participantId: action.payload.participantId,
    id: uuid()
  };

  currentThread.messageIds = currentThread.messageIds.slice(0);
  currentThread.messageIds.push(newMessage.id);

  newStoreData.messages[newMessage.id] = newMessage;

  return newStoreData;
}

function handleNewMessagesReceivedAction(state: StoreData, action: NewMessagesReceivedAction): StoreData {
  const newStoreState: StoreData = {
    participants: state.participants,
    threads: _.clone(state.threads),
    messages: _.clone(state.messages)
  };

  const newMessages: Message[] = action.payload.unreadMessages;
  const currentThreadId: number = action.payload.currentThreadId;
  const currentUserId: number = action.payload.currentUserId;

  newMessages.forEach(message => {
    newStoreState.messages[message.id] = message;

    const messageThread = _.clone(state.threads[message.threadId]);

    messageThread.messageIds = _.clone(messageThread.messageIds);
    messageThread.messageIds.push(message.id);

    if (message.threadId !== currentThreadId) {
      messageThread.participants = _.clone(newStoreState.threads[message.threadId].participants);
      messageThread.participants[currentUserId] += 1;
    }
  });

  return newStoreState;
}

function handleThreadSelectedAction(state: StoreData, action: ThreadSelectedAction): StoreData {
  const newStoreState: StoreData = {
    participants: Object.assign({}, state.participants),
    messages: Object.assign({}, state.messages),
    threads: Object.assign({}, state.threads)
  };

  newStoreState.threads[action.payload.selectedThreadId] = Object.assign({}, state.threads[action.payload.selectedThreadId]);

  const currentThread = newStoreState.threads[action.payload.selectedThreadId];

  currentThread.participants = Object.assign({}, currentThread.participants);

  currentThread.participants[action.payload.currentUserId] = 0;

  return newStoreState;
}

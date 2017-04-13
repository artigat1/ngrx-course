import {Action} from '@ngrx/store';

import {AllUserData} from '../../../shared/to/all-user-data';
import {Message} from '../../../shared/model/message';

export const USER_THREADS_LOADED_ACTION = 'USER_THREADS_LOADED_ACTION';
export const LOAD_USER_THREADS_ACTION = 'LOAD_USER_THREADS_ACTION';
export const THREAD_SELECTED_ACTION = 'THREAD_SELECTED_ACTION';
export const SELECT_USER_ACTION = 'SELECT_USER_ACTION';
export const SEND_NEW_MESSAGE_ACTION = 'SEND_NEW_MESSAGE_ACTION';
export const NEW_MESSAGES_RECEIVED_ACTION = 'NEW_MESSAGES_RECEIVED_ACTION';

export class LoadUserThreadsAction implements Action {
  readonly type = LOAD_USER_THREADS_ACTION;

  constructor(public payload: number) {
  }
}

export class UserThreadsLoadedAction implements Action {
  readonly type = USER_THREADS_LOADED_ACTION;

  constructor(public payload?: AllUserData) {
  }
}

export class ThreadSelectedAction implements Action {
  readonly type = THREAD_SELECTED_ACTION;

  constructor(public payload: number) {
  }
}

export class SelectUserAction implements Action {
  readonly type = SELECT_USER_ACTION;

  constructor(public payload: number) {
  }
}


export interface SendNewMessageActionPayload {
  text: string;
  threadId: number;
  participantId: number;
}

export class SendNewMessageAction implements Action {
  readonly type = SEND_NEW_MESSAGE_ACTION;

  constructor(public payload: SendNewMessageActionPayload) {
  }
}

export class NewMessagesReceivedAction implements Action {
  readonly type = NEW_MESSAGES_RECEIVED_ACTION;

  constructor(public payload?: Message[]) {
  }
}

import {Injectable} from '@angular/core';
import {Effect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Rx';

import {ThreadsService} from '../../services/threads.service';
import {NewMessagesReceivedAction} from '../actions';
import {ApplicationState} from '../application-state';
import {Message} from '../../../../shared/model/message';
import {UiState} from '../ui-state';

@Injectable()
export class ServerNotificationsEffectService {

  constructor(private threadsService: ThreadsService,
              private store: Store<ApplicationState>) {
  }

  @Effect()
  newMessages$ = Observable
    .interval(3000)
    .withLatestFrom(this.store.select('uiState'))
    .map(([any, uiState]) => uiState)
    .filter((uiState: any) => uiState.userId)
    .switchMap(uiState => this.threadsService.loadNewMessagesForUser(uiState.userId))
    .debug('new messages received from server')
    .withLatestFrom(this.store.select('uiState'))
    .map(([unreadMessages, uiState]: [Message[], UiState]) => new NewMessagesReceivedAction({
      unreadMessages,
      currentThreadId: uiState.currentThreadId,
      currentUserId: uiState.userId
    }))
}

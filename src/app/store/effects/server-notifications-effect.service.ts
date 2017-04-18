import {Injectable} from '@angular/core';
import {Effect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Rx';

import {ThreadsService} from '../../services/threads.service';
import {NewMessagesReceivedAction} from '../actions';
import {ApplicationState} from '../application-state';

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
    .filter((uiState: any) => !!uiState.userId)
    .switchMap(uiState => this.threadsService.loadNewMessagesForUser(uiState.userId))
    .map(messages => new NewMessagesReceivedAction(messages));
}

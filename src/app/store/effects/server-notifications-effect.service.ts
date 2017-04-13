import {Injectable} from '@angular/core';
import {Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Rx';

import {ThreadsService} from '../../services/threads.service';
import {NewMessagesReceivedAction} from '../actions';

@Injectable()
export class ServerNotificationsEffectService {

  constructor(private threadsService: ThreadsService) {
  }

  @Effect()
  newMessages$ = Observable
    .interval(3000)
    .switchMap(() => this.threadsService.loadNewMessagesForUser())
    .map(messages => new NewMessagesReceivedAction(messages));
}

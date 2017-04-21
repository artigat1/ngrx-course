import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';

import {ThreadsService} from '../../services/threads.service';
import {ErrorOccurredAction, SEND_NEW_MESSAGE_ACTION} from '../actions';

@Injectable()
export class WriteNewMessageEffectService {

  constructor(private actions$: Actions, private threadsService: ThreadsService) {
  }

  @Effect()
  newMessages$: Observable<any> = this.actions$
    .ofType(SEND_NEW_MESSAGE_ACTION)
    .debug('sending new message to the server')
    .switchMap(action => this.threadsService
      .saveNewMessage(action.payload)
      .catch(() => Observable.of(new ErrorOccurredAction('Error occurred while saving message')))
    );
}

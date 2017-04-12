import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {ThreadsService} from '../../services/threads.service';
import {LOAD_USER_THREADS_ACTION, LoadUserThreadsAction, SELECT_USER_ACTION, UserThreadsLoadedAction} from '../actions';

@Injectable()
export class LoadThreadsEffectService {

  @Effect()
  userThreads$: Observable<Action> = this.actions$
    .ofType(LOAD_USER_THREADS_ACTION)
    .debug('action received')
    .switchMap((action) => this.threadsService.loadUserThreads(action.payload))
    .debug('data received via the HTTP request')
    .map(allUserData => new UserThreadsLoadedAction(allUserData));

  @Effect()
  newUserSelected$: Observable<Action> = this.actions$
    .ofType(SELECT_USER_ACTION)
    .debug('new user selected')
    .map((action) => new LoadUserThreadsAction(action.payload));

  constructor(private actions$: Actions,
              private threadsService: ThreadsService) {
  }
}

import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import {ThreadsService} from '../../services/threads.service';
import {LOAD_USER_THREADS_ACTION, UserThreadsLoadedAction} from '../actions';

@Injectable()
export class LoadThreadsEffectService {

  constructor(private actions$: Actions,
              private threadsService: ThreadsService) {
  }

  @Effect() userThreads$: Observable<Action> = this.actions$
    .ofType(LOAD_USER_THREADS_ACTION)
    .debug('action received')
    .switchMap(() => this.threadsService.loadUserThreads())
    .debug('data received via the HTTP request')
    .map(allUserData => new UserThreadsLoadedAction(allUserData));
}

import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {ThreadsService} from '../../services/threads.service';
import {THREAD_SELECTED_ACTION, ThreadSelectedAction} from '../actions';

@Injectable()
export class MarkMessageAsReadEffectService {

  constructor(private actions$: Actions,
              private threadService: ThreadsService) {
  }

  @Effect({
    dispatch: false
  })
  markMessageAsRead$ = this.actions$
    .ofType(THREAD_SELECTED_ACTION)
    .switchMap((action: ThreadSelectedAction) =>
      this.threadService.markMessageAsRead(
        action.payload.currentUserId,
        action.payload.selectedThreadId));
}

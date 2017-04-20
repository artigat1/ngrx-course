import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import * as _ from 'lodash';

import {ApplicationState} from '../store/application-state';
import {ThreadSummaryVM} from './thread-summary.vm';
import {ThreadSelectedAction} from '../store/actions';
import {UiState} from '../store/ui-state';

import {userNameSelector} from './userNameSelector';
import {mapStateToUnreadMessagesCounter} from './mapStateToUnreadMessagesCounter';
import {stateToThreadSummariesSelector} from './stateToThreadSummariesSelector';


@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadSummaries$: Observable<ThreadSummaryVM[]>;

  uiState: UiState;

  constructor(private store: Store<ApplicationState>) {

    this.userName$ = store.select(userNameSelector);

    this.unreadMessagesCounter$ = store.map(mapStateToUnreadMessagesCounter);

    this.threadSummaries$ = store.select(stateToThreadSummariesSelector);

    store
      .select(state => state.uiState)
      .subscribe(uiState => this.uiState = _.cloneDeep(uiState));
  }

  onThreadSelected(selectedThreadId: number): void {
    this.store.dispatch(new ThreadSelectedAction({selectedThreadId, currentUserId: this.uiState.userId}));
  }
}

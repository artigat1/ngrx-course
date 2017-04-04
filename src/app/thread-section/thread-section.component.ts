import {Component, OnInit} from '@angular/core';
import {ThreadsService} from '../services/threads.service';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

import * as _ from 'lodash';

import {ApplicationState} from '../store/application-state';
import {LoadUserThreadsAction} from '../store/actions';
import {Thread} from '../../../shared/model/thread';
import {ThreadSummaryVM} from './thread-summary.vm';
import {mapStateToUserName} from './mapStateToUserName';
import {mapStateToUnreadMessagesCounter} from './mapStateToUnreadMessagesCounter';


@Component({
  selector: 'thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadSummaries$: Observable<ThreadSummaryVM[]>;

  constructor(private threadsService: ThreadsService,
              private store: Store<ApplicationState>) {
    this.userName$ = store
      .skip(1)
      .map(mapStateToUserName);

    this.unreadMessagesCounter$ = store
      .skip(1)
      .map(mapStateToUnreadMessagesCounter);

    this.threadSummaries$ = store.select(
      state => {
        const threads: Thread[] = _.values<Thread>(state.storeData.threads);
        return threads.map(thread => {

          const names: string[] = _.keys(thread.participants)
            .map(participantId => state.storeData.participants[participantId].name);

          const lastMessageId = _.last(thread.messageIds);

          return {
            id: thread.id,
            participantNames: _.join(names, ', '),
            lastMessageText: state.storeData.messages[lastMessageId].text
          };
        });
      }
    );
  }

  ngOnInit() {
    this.threadsService.loadUserThreads()
      .subscribe(
        allUserData => this.store.dispatch(
          new LoadUserThreadsAction(allUserData)
        )
      );
  }
}

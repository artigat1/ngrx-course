import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

import {ThreadSummaryVM} from '../thread-section/thread-summary.vm';

@Component({
  selector: 'thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThreadListComponent {

  @Input() threads: ThreadSummaryVM[];

  @Input() currentSelectedThreadId: number;

  @Output() threadSelected = new EventEmitter<number>();

  selectThread(threadId: number): void {
    this.threadSelected.emit(threadId);
  }
}

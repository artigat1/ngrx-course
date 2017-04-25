import {ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';

import * as _ from 'lodash';

import {MessageVM} from '../message-section/message.vm';

@Component({
  selector: 'message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageListComponent implements OnChanges {

  @Input()
  messages: MessageVM[];

  @ViewChild('list')
  list: ElementRef;

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['messages']) {
      const previousMessages = changes['messages'].previousValue;
      const newMessages = changes['messages'].currentValue;

      if(newMessages && previousMessages) {
        if (newMessages.length > previousMessages.length) {
          setTimeout(() => {
            this.scrollLastMessageIntoView();
          });
        }
      }
    }
  }

  private scrollLastMessageIntoView(): void {
    const items = this.list.nativeElement.querySelectorAll('li');
    const lastItem: any = _.last(items);
    if (lastItem) {
      lastItem.scrollIntoView();
    }
  }
}

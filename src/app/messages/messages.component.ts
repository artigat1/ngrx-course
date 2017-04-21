import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';

import {ApplicationState} from '../store/application-state';
import {UiState} from '../store/ui-state';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  message: string;

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {
    this.store
      .select('uiState')
      .subscribe((uiState: UiState) => this.message = uiState.currentError);
  }

  close(): void {
    this.message = '';
  }
}

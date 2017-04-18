import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {AllUserData} from '../../../shared/to/all-user-data';
import {SendNewMessageActionPayload} from '../store/actions';
import {commonHttpHeaders} from './common-http-headers';
import {Message} from '../../../shared/model/message';

@Injectable()
export class ThreadsService {

  constructor(private http: Http) {
  }


  loadUserThreads(userId: number): Observable<AllUserData> {
    return this.http
      .get('/api/threads', commonHttpHeaders(userId))
      .map(res => res.json());
  }

  saveNewMessage(payload: SendNewMessageActionPayload): Observable<any> {

    const body: any = JSON.stringify({text: payload.text});

    return this.http
      .post(`/api/threads/${payload.threadId}`, body, commonHttpHeaders(payload.participantId));
  }

  loadNewMessagesForUser(userId: number): Observable<Message[]> {
    return this.http
      .post('/api/notifications/messages', null, commonHttpHeaders(userId))
      .map(res => res.json().payload);
  }
}

import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {AllUserData} from '../../../shared/to/all-user-data';

@Injectable()
export class ThreadsService {

  constructor(private http: Http) {
  }


  loadUserThreads(userId: number): Observable<AllUserData> {
    const headers = new Headers();
    headers.append('USERID', userId.toString());

    return this.http.get('/api/threads', {headers})
      .map(res => res.json());
  }

}

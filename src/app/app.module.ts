import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import * as _ from 'lodash';

import {AppComponent} from './app.component';
import {UserSelectionComponent} from './user-selection/user-selection.component';
import {ThreadSectionComponent} from './thread-section/thread-section.component';
import {MessageSectionComponent} from './message-section/message-section.component';
import {ThreadListComponent} from './thread-list/thread-list.component';
import {MessageListComponent} from './message-list/message-list.component';
import {ThreadsService} from './services/threads.service';
import {ApplicationState, INITIAL_APPLICATION_STATE} from './store/application-state';
import {USER_THREADS_LOADED_ACTION, UserThreadsLoadedAction} from './store/actions';
import {LoadThreadsEffectService} from './store/effects/load-threads-effect.service';

export function storeReducer(state: ApplicationState = INITIAL_APPLICATION_STATE,
                             action: any): ApplicationState {
  switch (action.type) {

    case USER_THREADS_LOADED_ACTION:
      return handleLoadUserThreadsAction(state, action);

    default:
      return state;
  }
}

export function handleLoadUserThreadsAction(state: ApplicationState, action: UserThreadsLoadedAction): ApplicationState {
  const userData = action.payload;

  const newState: ApplicationState = Object.assign({}, state);

  newState.storeData = {
    participants: _.keyBy(userData.participants, 'id'),
    messages: _.keyBy(userData.messages, 'id'),
    threads: _.keyBy(userData.threads, 'id')
  };

  return newState;
}

@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent,
    ThreadSectionComponent,
    MessageSectionComponent,
    ThreadListComponent,
    MessageListComponent
  ],
  imports: [
    BrowserModule,
    EffectsModule.run(LoadThreadsEffectService),
    FormsModule,
    HttpModule,
    StoreModule.provideStore(storeReducer)
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

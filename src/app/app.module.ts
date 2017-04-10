import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {EffectsModule} from '@ngrx/effects';
import {combineReducers, StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {AppComponent} from './app.component';
import {UserSelectionComponent} from './user-selection/user-selection.component';
import {ThreadSectionComponent} from './thread-section/thread-section.component';
import {MessageSectionComponent} from './message-section/message-section.component';
import {ThreadListComponent} from './thread-list/thread-list.component';
import {MessageListComponent} from './message-list/message-list.component';
import {ThreadsService} from './services/threads.service';
import {INITIAL_APPLICATION_STATE} from './store/application-state';
import {LoadThreadsEffectService} from './store/effects/load-threads-effect.service';
import {uiState} from 'app/store/reducers/uiStateReducer';
import {storeData} from './store/reducers/storeDataReducer';

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
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 50
    }),
    StoreModule.provideStore(combineReducers({uiState, storeData}), INITIAL_APPLICATION_STATE)
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

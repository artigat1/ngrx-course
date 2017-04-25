import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {AppComponent} from './app.component';
import {LoadThreadsEffectService} from './store/effects/load-threads-effect.service';
import {MarkMessageAsReadEffectService} from './store/effects/mark-message-as-read-effect.service';
import {MessageListComponent} from './message-list/message-list.component';
import {MessageSectionComponent} from './message-section/message-section.component';
import {ServerNotificationsEffectService} from './store/effects/server-notifications-effect.service';
import {ThreadListComponent} from './thread-list/thread-list.component';
import {ThreadSectionComponent} from './thread-section/thread-section.component';
import {ThreadsService} from './services/threads.service';
import {UserSelectionComponent} from './user-selection/user-selection.component';
import {WriteNewMessageEffectService} from './store/effects/write-new-messages-effect.service';
import {appReducer} from './store/reducers/store.reducer';
import {MessagesComponent} from './messages/messages.component';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import {RouterStoreModule} from '@ngrx/router-store';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    MessageListComponent,
    MessageSectionComponent,
    ThreadListComponent,
    ThreadSectionComponent,
    UserSelectionComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    EffectsModule.run(LoadThreadsEffectService),
    EffectsModule.run(MarkMessageAsReadEffectService),
    EffectsModule.run(ServerNotificationsEffectService),
    EffectsModule.run(WriteNewMessageEffectService),
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, {useHash: true}),
    RouterStoreModule.connectRouter(),
    StoreModule.provideStore(appReducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 50
    })
  ],
  providers: [ThreadsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

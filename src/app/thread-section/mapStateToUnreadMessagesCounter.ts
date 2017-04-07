import * as _ from 'lodash';

import {ApplicationState} from '../store/application-state';
import {Thread} from '../../../shared/model/thread';

export function mapStateToUnreadMessagesCounter(state: ApplicationState): number {
  const currentUserId = state.uiState.userId;

  return _.values<Thread>(state.storeData.threads)
    .reduce(
      (acc, thread) => acc + (thread.participants[currentUserId] || 0), 0);
}

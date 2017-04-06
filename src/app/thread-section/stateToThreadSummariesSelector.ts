import * as _ from 'lodash';

import {ApplicationState} from '../store/application-state';
import {Thread} from '../../../shared/model/thread';
import {ThreadSummaryVM} from './thread-summary.vm';

export function stateToThreadSummariesSelector(state: ApplicationState): ThreadSummaryVM[] {
  const threads: Thread[] = _.values<Thread>(state.storeData.threads);

  return threads.map(_.partial(mapThreadToThreadSummary, state));
}

function mapThreadToThreadSummary(state: ApplicationState, thread: Thread): ThreadSummaryVM {
  const names: string[] = _.keys(thread.participants)
    .map(participantId => state.storeData.participants[participantId].name);

  const lastMessageId = _.last(thread.messageIds);
  const lastMessage = state.storeData.messages[lastMessageId];

  return <ThreadSummaryVM>{
    id: thread.id,
    participantNames: _.join(names, ', '),
    lastMessageText: lastMessage.text,
    timestamp: lastMessage.timestamp
  };
}

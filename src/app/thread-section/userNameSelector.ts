import {ApplicationState} from '../store/application-state';

export function userNameSelector(state: ApplicationState): string {

  const currentUserId = state.uiState.userId;
  const currentParticipant = state.storeData.participants[currentUserId];

  if (!currentParticipant) {
    return '';
  }

  return currentParticipant.name;
}

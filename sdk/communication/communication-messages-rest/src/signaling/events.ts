// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ChatMessageReceivedEvent,
  ChatThreadPropertiesUpdatedEvent,
  ParticipantsAddedEvent,
  ParticipantsRemovedEvent,
} from "@azure/communication-signaling";

type ChatEventId =
  | "chatMessageReceived"
  | "chatMessageEdited"
  | "chatMessageDeleted"
  | "typingIndicatorReceived"
  | "readReceiptReceived"
  | "chatThreadCreated"
  | "chatThreadDeleted"
  | "chatThreadPropertiesUpdated"
  | "participantsAdded"
  | "participantsRemoved"
  | "realTimeNotificationConnected"
  | "realTimeNotificationDisconnected";

export {
  ChatEventId,
  ChatMessageReceivedEvent,
  ChatThreadPropertiesUpdatedEvent,
  ParticipantsAddedEvent,
  ParticipantsRemovedEvent,
};

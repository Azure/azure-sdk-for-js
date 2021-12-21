// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ChatMessageReceivedEvent,
  ChatMessageEditedEvent,
  ChatMessageDeletedEvent,
  ReadReceiptReceivedEvent,
  TypingIndicatorReceivedEvent,
  ChatThreadCreatedEvent,
  ChatThreadDeletedEvent,
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
  ChatMessageEditedEvent,
  ChatMessageDeletedEvent,
  ReadReceiptReceivedEvent,
  TypingIndicatorReceivedEvent,
  ChatThreadCreatedEvent,
  ChatThreadDeletedEvent,
  ChatThreadPropertiesUpdatedEvent,
  ParticipantsAddedEvent,
  ParticipantsRemovedEvent,
};

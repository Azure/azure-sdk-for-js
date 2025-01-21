// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ChatMessageDeletedEvent,
  ChatMessageEditedEvent,
  ChatMessageReceivedEvent,
  ChatThreadCreatedEvent,
  ChatThreadDeletedEvent,
  ChatThreadPropertiesUpdatedEvent,
  ParticipantsAddedEvent,
  ParticipantsRemovedEvent,
  ReadReceiptReceivedEvent,
  StreamingChatMessageChunkReceivedEvent,
  StreamingChatMessageStartEvent,
  StreamEndReason,
  StreamingMessageMetadata,
  StreamingMessageType,
  TypingIndicatorReceivedEvent,
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
  | "streamingChatMessageStarted"
  | "streamingChatMessageChunkReceived"
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
  StreamingChatMessageChunkReceivedEvent,
  StreamingChatMessageStartEvent,
  StreamEndReason,
  StreamingMessageMetadata,
  StreamingMessageType
};

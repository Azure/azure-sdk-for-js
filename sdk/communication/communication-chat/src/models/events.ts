// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ChatMessageDeletedEvent,
  ChatMessageEditedEvent,
  ChatMessageReceivedEvent as SignallingMessageReceivedEvent,
  ChatThreadCreatedEvent,
  ChatThreadDeletedEvent,
  ChatThreadPropertiesUpdatedEvent,
  ParticipantsAddedEvent,
  ParticipantsRemovedEvent,
  ReadReceiptReceivedEvent,
  // StreamingChatMessageChunkReceivedEvent, // TODO: from signaling once package available
  // StreamingChatMessageStartEvent,         // rush local packages broken
  TypingIndicatorReceivedEvent,
} from "@azure/communication-signaling";

// TODO: Remove these once the signaling package is available
interface ChatMessageReceivedEvent extends SignallingMessageReceivedEvent {
  streamingContentType?: "informative" | "streaming" | "final";
}
interface StreamingChatMessageStartEvent extends ChatMessageReceivedEvent { }
interface StreamingChatMessageChunkReceivedEvent extends ChatMessageEditedEvent {
  streamingSequenceNumber: number;
}

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
};

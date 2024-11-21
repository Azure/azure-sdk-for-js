// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ChatMessageDeletedEvent,
  ChatMessageEditedEvent,
  ChatMessageReceivedEvent as OldSignalingMessageReceivedEvent,
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
export type StreamingContentType = "start" | "informative" | "streaming" | "final";
export type StreamEndReason = "completed" | "expired" | "canceled";

/**
 * Type definition for information on a streaming message
 */
export interface StreamingMessageMetadata {
  streamingContentType?: StreamingContentType;
  streamingSequenceNumber?: number; // Only present on informative or streaming type messages
  streamEndReason?: StreamEndReason;  // Only present on final type messages
}
interface ChatMessageReceivedEvent extends OldSignalingMessageReceivedEvent {
  /**
   * If a streaming message, details about the streaming message.
   */
  streamingMetadata?: StreamingMessageMetadata;
}
interface StreamingChatMessageStartEvent extends ChatMessageReceivedEvent { }
interface StreamingChatMessageChunkReceivedEvent extends ChatMessageEditedEvent { }

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

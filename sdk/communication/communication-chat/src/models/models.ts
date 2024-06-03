// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationIdentifier, CommunicationIdentifierKind } from "@azure/communication-common";
import { ChatError, ChatMessageType } from "../generated/src";

export {
  AddChatParticipantsResult,
  ChatMessageType,
  ChatThreadItem,
  ChatError,
  SendChatMessageResult,
} from "../generated/src/models";

/** Chat thread. */
export interface ChatThreadProperties {
  /** Chat thread id. */
  id: string;
  /** Chat thread topic. */
  topic: string;
  /** The timestamp when the chat thread was created. The timestamp is in RFC3339 format: `yyyy-MM-ddTHH:mm:ssZ`. */
  createdOn: Date;
  /** Identifies a participant in Azure Communication services. A participant is, for example, a phone number or an Azure communication user. This model must be interpreted as a union: Apart from rawId, at most one further property may be set. */
  readonly createdBy?: CommunicationIdentifierKind;
  /** The timestamp when the chat thread was deleted. The timestamp is in RFC3339 format: `yyyy-MM-ddTHH:mm:ssZ`. */
  deletedOn?: Date;
  /** metadata */
  metadata?: Record<string, string>;
  /** Data retention policy for auto deletion. */
  retentionPolicy?: ChatRetentionPolicy;
  /** Messaging policy for a chat thread. */
  messagingPolicy?: MessagingPolicy;
}

/** Thread retention policy based on thread creation date. */
export interface ThreadCreationDateRetentionPolicy {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  kind: "threadCreationDate";
  /** Indicates how many days after the thread creation the thread will be deleted. */
  deleteThreadAfterDays: number;
}

/** No thread retention policy. */
export interface NoneRetentionPolicy {
  /** Polymorphic discriminator, which specifies the different types this object can be */
  kind: "none";
}

/** Data retention policy for auto deletion. */
export declare type ChatRetentionPolicy = ThreadCreationDateRetentionPolicy | NoneRetentionPolicy;

/** Chat message. */
export interface ChatMessage {
  /** The id of the chat message. This id is server generated. */
  id: string;
  /** The chat message type. */
  type: ChatMessageType;
  /** Sequence of the chat message in the conversation. */
  sequenceId: string;
  /** Version of the chat message. */
  version: string;
  /** Content of a chat message. */
  content?: ChatMessageContent;
  /** The display name of the chat message sender. This property is used to populate sender name for push notifications. */
  senderDisplayName?: string;
  /** The timestamp when the chat message arrived at the server. The timestamp is in RFC3339 format: `yyyy-MM-ddTHH:mm:ssZ`. */
  createdOn: Date;
  /** Identifies a participant in Azure Communication services. A participant is, for example, a phone number or an Azure communication user. This model must be interpreted as a union: Apart from rawId, at most one further property may be set. */
  sender?: CommunicationIdentifierKind;
  /** The timestamp (if applicable) when the message was deleted. The timestamp is in RFC3339 format: `yyyy-MM-ddTHH:mm:ssZ`. */
  deletedOn?: Date;
  /** The last timestamp (if applicable) when the message was edited. The timestamp is in RFC3339 format: `yyyy-MM-ddTHH:mm:ssZ`. */
  editedOn?: Date;
  /** metadata */
  metadata?: Record<string, string>;
  /** Policy Violation of a chat message. */
  policyViolation?: PolicyViolation;
}

/** Content of a chat message. */
export interface ChatMessageContent {
  /** Chat message content for messages of types text or html. */
  message?: string;
  /** Chat message content for messages of type topicUpdated. */
  topic?: string;
  /** Chat message content for messages of types participantAdded or participantRemoved. */
  participants?: ChatParticipant[];
  /** List of attachments for this message */
  attachments?: ChatAttachment[];
  /** Identifies a participant in Azure Communication services. A participant is, for example, a phone number or an Azure communication user. This model must be interpreted as a union: Apart from rawId, at most one further property may be set. */
  initiator?: CommunicationIdentifierKind;
}

/** An attachment in a chat message. */
export interface ChatAttachment {
  /** Id of the attachment */
  id: string;
  /** The type of attachment. */
  attachmentType: ChatAttachmentType;
  /** The name of the attachment content. */
  name?: string;
  /** The URL where the attachment can be downloaded */
  url?: string;
  /** The URL where the preview of attachment can be downloaded */
  previewUrl?: string;
}

/** A chat message read receipt indicates the time a chat message was read by a recipient. */
export interface ChatMessageReadReceipt {
  /** Identifies a participant in Azure Communication services. A participant is, for example, a phone number or an Azure communication user. This model must be interpreted as a union: Apart from rawId, at most one further property may be set. */
  sender: CommunicationIdentifierKind;
  /** Id of the chat message that has been read. This id is generated by the server. */
  chatMessageId: string;
  /** The time at which the message was read. The timestamp is in RFC3339 format: `yyyy-MM-ddTHH:mm:ssZ`. */
  readOn: Date;
}

/** A participant of the chat thread. */
export interface ChatParticipant {
  /** Identifies a participant in Azure Communication services. A participant is, for example, a phone number or an Azure communication user. This model must be interpreted as a union: Apart from rawId, at most one further property may be set. */
  id: CommunicationIdentifier;
  /** Display name for the chat participant. */
  displayName?: string;
  /** Time from which the chat history is shared with the participant. The timestamp is in RFC3339 format: `yyyy-MM-ddTHH:mm:ssZ`. */
  shareHistoryTime?: Date;
  /** metadata */
  metadata?: Record<string, string>;
}

/** Result of the create chat thread operation. */
export interface CreateChatThreadResult {
  /** Chat thread. */
  chatThread?: ChatThreadProperties;
  /**
   * The participants that failed to be added to the chat thread.
   * NOTE: This property will not be serialized. It can only be populated by the server.
   */
  readonly invalidParticipants?: ChatError[];
}

/**
 * Arguments for retrieving the next page of search results.
 */
export interface ListPageSettings {
  /**
   * A token used for retrieving the next page of results when the server
   * enforces pagination.
   */
  continuationToken?: string;
}

/** Result payload for uploading an image. */
export interface UploadChatImageResult {
  /** Id of the image. */
  id: string;
  /** The type of attachment. */
  attachmentType?: ChatAttachmentType;
  /** The name including file extension type of the attachment. */
  name?: string;
}

/** Type of Supported Attachments. */
export type ChatAttachmentType = "image" | "file" | "unknown";

/** Result of Policy Violation message. */
export type PolicyViolationMessageResult = "contentBlocked" | "warning";

/** Policy violation of a message (if applicable). */
export interface PolicyViolation {
  /** State of Policy Violation message. */
  result: PolicyViolationMessageResult;
}

/** Messaging policy of a chat thread. */
export interface MessagingPolicy {
  textOnlyChat?: boolean;
}

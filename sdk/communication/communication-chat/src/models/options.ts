// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CommonClientOptions, OperationOptions } from "@azure/core-client";
import {
  ChatMessageType,
  ChatListChatThreadsOptionalParams as RestListChatThreadsOptions,
  ChatThreadListChatMessagesOptionalParams as RestListMessagesOptions,
  ChatThreadListChatParticipantsOptionalParams as RestListParticipantsOptions,
  ChatThreadListChatReadReceiptsOptionalParams as RestListReadReceiptsOptions,
} from "../generated/src/models";
import { ChatParticipant } from "./models";

export {
  RestListMessagesOptions,
  RestListChatThreadsOptions,
  RestListParticipantsOptions,
  RestListReadReceiptsOptions,
};

/**
 * Options to create chat client.
 */
export interface ChatClientOptions extends CommonClientOptions {}

/**
 * Options to create chat thread client.
 */
export interface ChatThreadClientOptions extends ChatClientOptions {}

/**
 * Options to update a chat thread.
 */
export interface UpdateTopicOptions extends OperationOptions {}

/**
 * Options to get chat threads.
 */
export type ListChatThreadsOptions = RestListChatThreadsOptions;

/**
 * Options to send a chat message.
 */
export interface SendMessageOptions extends OperationOptions {
  /** The display name of the chat message sender. This property is used to populate sender name for push notifications. */
  senderDisplayName?: string;
  /** The chat message type. */
  type?: ChatMessageType;
  /** Message metadata. */
  metadata?: Record<string, string>;
}

/**
 * Options to update a chat message.
 */
export interface UpdateMessageOptions extends OperationOptions {
  /** Chat message content. */
  content?: string;
  /** Message metadata. */
  metadata?: Record<string, string>;
}

/**
 * Options to list chat messages.
 */
export type ListMessagesOptions = RestListMessagesOptions;

/**
 * Options to create a chat thread.
 */
export interface CreateChatThreadOptions extends OperationOptions {
  /** Participants to be added to the chat thread. */
  participants?: ChatParticipant[];
  /** If specified, the client directs that the request is repeatable; that is, that the client can make the request multiple times with the same Idempotency-Token and get back an appropriate response without the server executing the request multiple times. The value of the Idempotency-Token is an opaque string representing a client-generated, globally unique for all time, identifier for the request. It is recommended to use version 4 (random) UUIDs. */
  idempotencyToken?: string;
}

/**
 * Options to get a chat thread.
 */
export type GetPropertiesOptions = OperationOptions;

/**
 * Options to delete a chat thread.
 */
export type DeleteChatThreadOptions = OperationOptions;

/**
 * Options to get a chat message.
 */
export type GetMessageOptions = OperationOptions;

/**
 * Options to delete a chat message.
 */
export type DeleteMessageOptions = OperationOptions;

/**
 * Options to add a chat participant.
 */
export type AddParticipantsOptions = OperationOptions;

/**
 * Options to list chat participants.
 */
export type ListParticipantsOptions = RestListParticipantsOptions;

/**
 * Options to remove a chat participant.
 */
export type RemoveParticipantOptions = OperationOptions;

/**
 * Options to send typing notifications.
 */
export interface SendTypingNotificationOptions extends OperationOptions {
  /** The display name of the typing notification sender. This property is used to populate sender name for push notifications. */
  senderDisplayName?: string;
}

/**
 * Options to send read receipt.
 */
export type SendReadReceiptOptions = OperationOptions;

/**
 * Options to list read receipts.
 */
export type ListReadReceiptsOptions = RestListReadReceiptsOptions;

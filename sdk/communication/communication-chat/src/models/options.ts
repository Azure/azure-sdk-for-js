// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PipelineOptions, OperationOptions } from "@azure/core-http";
import {
  SendChatMessageRequest as RestSendMessageOptions,
  UpdateChatMessageRequest as RestUpdateMessageOptions,
  ChatThreadListChatMessagesOptionalParams as RestListMessagesOptions,
  ChatListChatThreadsOptionalParams as RestListChatThreadsOptions,
  ChatThreadListChatReadReceiptsOptionalParams as RestListReadReceiptsOptions,
  ChatThreadListChatParticipantsOptionalParams as RestListParticipantsOptions,
  ChatCreateChatThreadOptionalParams as RestCreateChatThreadOptions
} from "../generated/src/models";

export {
  RestCreateChatThreadOptions,
  RestSendMessageOptions,
  RestUpdateMessageOptions,
  RestListMessagesOptions,
  RestListChatThreadsOptions,
  RestListParticipantsOptions,
  RestListReadReceiptsOptions
};

/**
 * Options to create chat client.
 */
export interface ChatClientOptions extends PipelineOptions {}

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
export interface SendMessageOptions
  extends Omit<RestSendMessageOptions, "content">,
    OperationOptions {}

/**
 * Options to update a chat message.
 */
export interface UpdateMessageOptions extends RestUpdateMessageOptions, OperationOptions {}

/**
 * Options to list chat messages.
 */
export type ListMessagesOptions = RestListMessagesOptions;

/**
 * Options to create a chat thread.
 */
export type CreateChatThreadOptions = RestCreateChatThreadOptions;

/**
 * Options to get a chat thread.
 */
export type GetChatThreadOptions = OperationOptions;

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
export type SendTypingNotificationOptions = OperationOptions;

/**
 * Options to send read receipt.
 */
export type SendReadReceiptOptions = OperationOptions;

/**
 * Options to list read receipts.
 */
export type ListReadReceiptsOptions = RestListReadReceiptsOptions;

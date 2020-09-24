// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PipelineOptions, OperationOptions } from "@azure/core-http";
import {
  SendChatMessageRequest as RestSendMessageOptions,
  UpdateChatMessageRequest as RestUpdateMessageOptions,
  UpdateChatThreadRequest as RestUpdateThreadOptions,
  ChatApiClientListChatMessagesOptionalParams as RestListMessagesOptions,
  ChatApiClientListChatThreadsOptionalParams as RestListChatThreadsOptions
} from "../generated/src/models";

export {
  RestSendMessageOptions,
  RestUpdateMessageOptions,
  RestUpdateThreadOptions,
  RestListMessagesOptions,
  RestListChatThreadsOptions
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
export interface UpdateThreadOptions extends RestUpdateThreadOptions, OperationOptions {}

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
export type CreateChatThreadOptions = OperationOptions;

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
 * Options to add a chat thread member.
 */
export type AddMembersOptions = OperationOptions;

/**
 * Options to list chat thread members.
 */
export type ListMembersOptions = OperationOptions;

/**
 * Options to remove a chat thread member.
 */
export type RemoveMemberOptions = OperationOptions;

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
export type ListReadReceiptsOptions = OperationOptions;

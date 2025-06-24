// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  GetMediaParameters,
  SendParameters,
  ListTemplatesParameters,
  AddParticipantsParameters,
  RemoveParticipantsParameters,
  ListConversationsParameters,
  CreateConversationParameters,
  ListMessagesParameters,
  SendMessageParameters,
  AnalyzeConversationParameters,
  GetConversationParameters,
  DeleteConversationParameters,
  TerminateConversationParameters,
} from "./parameters.js";
import type {
  GetMedia200Response,
  GetMediaDefaultResponse,
  Send202Response,
  SendDefaultResponse,
  ListTemplates200Response,
  ListTemplatesDefaultResponse,
  AddParticipants207Response,
  AddParticipantsDefaultResponse,
  RemoveParticipants207Response,
  RemoveParticipantsDefaultResponse,
  ListConversations200Response,
  ListConversationsDefaultResponse,
  CreateConversation201Response,
  CreateConversationDefaultResponse,
  ListMessages200Response,
  ListMessagesDefaultResponse,
  SendMessage200Response,
  SendMessageDefaultResponse,
  AnalyzeConversation200Response,
  AnalyzeConversationDefaultResponse,
  GetConversation200Response,
  GetConversationDefaultResponse,
  DeleteConversation204Response,
  DeleteConversationDefaultResponse,
  TerminateConversation200Response,
  TerminateConversationDefaultResponse,
} from "./responses.js";
import type { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetMedia {
  /** Download the Media payload from a User to Business message. */
  get(
    options?: GetMediaParameters,
  ): StreamableMethod<GetMedia200Response | GetMediaDefaultResponse>;
}

export interface Send {
  /** Sends a notification message from Business to User. */
  post(
    options: SendParameters,
  ): StreamableMethod<Send202Response | SendDefaultResponse>;
}

export interface ListTemplates {
  /** List all templates for given Azure Communication Services channel */
  get(
    options?: ListTemplatesParameters,
  ): StreamableMethod<ListTemplates200Response | ListTemplatesDefaultResponse>;
}

export interface AddParticipants {
  /** Adds participants to a specific conversation. */
  post(
    options: AddParticipantsParameters,
  ): StreamableMethod<
    AddParticipants207Response | AddParticipantsDefaultResponse
  >;
}

export interface RemoveParticipants {
  /** remove a participant from a conversation */
  post(
    options: RemoveParticipantsParameters,
  ): StreamableMethod<
    RemoveParticipants207Response | RemoveParticipantsDefaultResponse
  >;
}

export interface ListConversations {
  /** Retrieves list of conversations. */
  get(
    options?: ListConversationsParameters,
  ): StreamableMethod<
    ListConversations200Response | ListConversationsDefaultResponse
  >;
  /** Creates a new conversation. This is only for create operation. */
  post(
    options: CreateConversationParameters,
  ): StreamableMethod<
    CreateConversation201Response | CreateConversationDefaultResponse
  >;
}

export interface ListMessages {
  /** Retrieves list of conversation messages. */
  get(
    options?: ListMessagesParameters,
  ): StreamableMethod<ListMessages200Response | ListMessagesDefaultResponse>;
}

export interface SendMessage {
  /** Sends a conversation message from Business to User. */
  post(
    options: SendMessageParameters,
  ): StreamableMethod<SendMessage200Response | SendMessageDefaultResponse>;
}

export interface AnalyzeConversation {
  /** Get AI Analysis of a conversation. */
  post(
    options?: AnalyzeConversationParameters,
  ): StreamableMethod<
    AnalyzeConversation200Response | AnalyzeConversationDefaultResponse
  >;
}

export interface GetConversation {
  /** Gets the details of a specific conversation. */
  get(
    options?: GetConversationParameters,
  ): StreamableMethod<
    GetConversation200Response | GetConversationDefaultResponse
  >;
  /** Deletes a specific conversation. */
  delete(
    options?: DeleteConversationParameters,
  ): StreamableMethod<
    DeleteConversation204Response | DeleteConversationDefaultResponse
  >;
}

export interface TerminateConversation {
  /** Terminates a specific conversation. */
  post(
    options?: TerminateConversationParameters,
  ): StreamableMethod<
    TerminateConversation200Response | TerminateConversationDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/messages/streams/\{id\}' has methods for the following verbs: get */
  (path: "/messages/streams/{id}", id: string): GetMedia;
  /** Resource for '/messages/notifications:send' has methods for the following verbs: post */
  (path: "/messages/notifications:send"): Send;
  /** Resource for '/messages/channels/\{channelId\}/templates' has methods for the following verbs: get */
  (
    path: "/messages/channels/{channelId}/templates",
    channelId: string,
  ): ListTemplates;
  /** Resource for '/messages/conversations/\{conversationId\}/participants:add' has methods for the following verbs: post */
  (
    path: "/messages/conversations/{conversationId}/participants:add",
    conversationId: string,
  ): AddParticipants;
  /** Resource for '/messages/conversations/\{conversationId\}/participants:remove' has methods for the following verbs: post */
  (
    path: "/messages/conversations/{conversationId}/participants:remove",
    conversationId: string,
  ): RemoveParticipants;
  /** Resource for '/messages/conversations' has methods for the following verbs: get, post */
  (path: "/messages/conversations"): ListConversations;
  /** Resource for '/messages/conversations/\{conversationId\}/messages' has methods for the following verbs: get */
  (
    path: "/messages/conversations/{conversationId}/messages",
    conversationId: string,
  ): ListMessages;
  /** Resource for '/messages/conversations/\{conversationId\}/messages:send' has methods for the following verbs: post */
  (
    path: "/messages/conversations/{conversationId}/messages:send",
    conversationId: string,
  ): SendMessage;
  /** Resource for '/messages/conversations/\{conversationId\}:analyze' has methods for the following verbs: post */
  (
    path: "/messages/conversations/{conversationId}:analyze",
    conversationId: string,
  ): AnalyzeConversation;
  /** Resource for '/messages/conversations/\{conversationId\}' has methods for the following verbs: get, delete */
  (
    path: "/messages/conversations/{conversationId}",
    conversationId: string,
  ): GetConversation;
  /** Resource for '/messages/conversations/\{conversationId\}:terminate' has methods for the following verbs: post */
  (
    path: "/messages/conversations/{conversationId}:terminate",
    conversationId: string,
  ): TerminateConversation;
}

export type MessagesServiceClient = Client & {
  path: Routes;
};

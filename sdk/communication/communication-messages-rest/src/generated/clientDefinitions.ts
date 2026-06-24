// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  StreamOperationsGetMediaParameters,
  ReadReceiptsOperationsSendParameters,
  NotificationMessagesOperationsSendParameters,
  TemplateOperationsListTemplatesParameters,
  ConversationThreadOperationsAddParticipantsParameters,
  ConversationThreadOperationsRemoveParticipantsParameters,
  ConversationThreadOperationsListConversationsParameters,
  ConversationAdministrationOperationsCreateConversationParameters,
  ConversationThreadOperationsListMessagesParameters,
  ConversationThreadOperationsSendMessageParameters,
  ConversationThreadOperationsAnalyzeConversationParameters,
  ConversationAdministrationOperationsGetConversationParameters,
  ConversationAdministrationOperationsDeleteConversationParameters,
  ConversationAdministrationOperationsTerminateConversationParameters,
} from "./parameters.js";
import type {
  StreamOperationsGetMedia200Response,
  StreamOperationsGetMediaDefaultResponse,
  ReadReceiptsOperationsSend202Response,
  ReadReceiptsOperationsSendDefaultResponse,
  NotificationMessagesOperationsSend202Response,
  NotificationMessagesOperationsSendDefaultResponse,
  TemplateOperationsListTemplates200Response,
  TemplateOperationsListTemplatesDefaultResponse,
  ConversationThreadOperationsAddParticipants207Response,
  ConversationThreadOperationsAddParticipantsDefaultResponse,
  ConversationThreadOperationsRemoveParticipants207Response,
  ConversationThreadOperationsRemoveParticipantsDefaultResponse,
  ConversationThreadOperationsListConversations200Response,
  ConversationThreadOperationsListConversationsDefaultResponse,
  ConversationAdministrationOperationsCreateConversation201Response,
  ConversationAdministrationOperationsCreateConversationDefaultResponse,
  ConversationThreadOperationsListMessages200Response,
  ConversationThreadOperationsListMessagesDefaultResponse,
  ConversationThreadOperationsSendMessage200Response,
  ConversationThreadOperationsSendMessageDefaultResponse,
  ConversationThreadOperationsAnalyzeConversation200Response,
  ConversationThreadOperationsAnalyzeConversationDefaultResponse,
  ConversationAdministrationOperationsGetConversation200Response,
  ConversationAdministrationOperationsGetConversationDefaultResponse,
  ConversationAdministrationOperationsDeleteConversation204Response,
  ConversationAdministrationOperationsDeleteConversationDefaultResponse,
  ConversationAdministrationOperationsTerminateConversation200Response,
  ConversationAdministrationOperationsTerminateConversationDefaultResponse,
} from "./responses.js";
import type { Client, StreamableMethod } from "@azure-rest/core-client";

export interface StreamOperationsGetMedia {
  /** Download the Media payload from a User to Business message. */
  get(
    options?: StreamOperationsGetMediaParameters,
  ): StreamableMethod<
    StreamOperationsGetMedia200Response | StreamOperationsGetMediaDefaultResponse
  >;
}

export interface ReadReceiptsOperationsSend {
  /** Sends a read receipt update from Business to User. */
  post(
    options: ReadReceiptsOperationsSendParameters,
  ): StreamableMethod<
    ReadReceiptsOperationsSend202Response | ReadReceiptsOperationsSendDefaultResponse
  >;
}

export interface NotificationMessagesOperationsSend {
  /** Sends a notification message from Business to User. */
  post(
    options: NotificationMessagesOperationsSendParameters,
  ): StreamableMethod<
    | NotificationMessagesOperationsSend202Response
    | NotificationMessagesOperationsSendDefaultResponse
  >;
}

export interface TemplateOperationsListTemplates {
  /** List all templates for given Azure Communication Services channel */
  get(
    options?: TemplateOperationsListTemplatesParameters,
  ): StreamableMethod<
    TemplateOperationsListTemplates200Response | TemplateOperationsListTemplatesDefaultResponse
  >;
}

export interface ConversationThreadOperationsAddParticipants {
  /** Adds participants to a specific conversation. */
  post(
    options: ConversationThreadOperationsAddParticipantsParameters,
  ): StreamableMethod<
    | ConversationThreadOperationsAddParticipants207Response
    | ConversationThreadOperationsAddParticipantsDefaultResponse
  >;
}

export interface ConversationThreadOperationsRemoveParticipants {
  /** remove a participant from a conversation */
  post(
    options: ConversationThreadOperationsRemoveParticipantsParameters,
  ): StreamableMethod<
    | ConversationThreadOperationsRemoveParticipants207Response
    | ConversationThreadOperationsRemoveParticipantsDefaultResponse
  >;
}

export interface ConversationThreadOperationsListConversations {
  /** Retrieves list of conversations. */
  get(
    options?: ConversationThreadOperationsListConversationsParameters,
  ): StreamableMethod<
    | ConversationThreadOperationsListConversations200Response
    | ConversationThreadOperationsListConversationsDefaultResponse
  >;
  /** Creates a new conversation. This is only for create operation. */
  post(
    options: ConversationAdministrationOperationsCreateConversationParameters,
  ): StreamableMethod<
    | ConversationAdministrationOperationsCreateConversation201Response
    | ConversationAdministrationOperationsCreateConversationDefaultResponse
  >;
}

export interface ConversationThreadOperationsListMessages {
  /** Retrieves list of conversation messages. */
  get(
    options?: ConversationThreadOperationsListMessagesParameters,
  ): StreamableMethod<
    | ConversationThreadOperationsListMessages200Response
    | ConversationThreadOperationsListMessagesDefaultResponse
  >;
}

export interface ConversationThreadOperationsSendMessage {
  /** Sends a conversation message from Business to User. */
  post(
    options: ConversationThreadOperationsSendMessageParameters,
  ): StreamableMethod<
    | ConversationThreadOperationsSendMessage200Response
    | ConversationThreadOperationsSendMessageDefaultResponse
  >;
}

export interface ConversationThreadOperationsAnalyzeConversation {
  /** Get AI Analysis of a conversation. */
  post(
    options?: ConversationThreadOperationsAnalyzeConversationParameters,
  ): StreamableMethod<
    | ConversationThreadOperationsAnalyzeConversation200Response
    | ConversationThreadOperationsAnalyzeConversationDefaultResponse
  >;
}

export interface ConversationAdministrationOperationsGetConversation {
  /** Gets the details of a specific conversation. */
  get(
    options?: ConversationAdministrationOperationsGetConversationParameters,
  ): StreamableMethod<
    | ConversationAdministrationOperationsGetConversation200Response
    | ConversationAdministrationOperationsGetConversationDefaultResponse
  >;
  /** Deletes a specific conversation. */
  delete(
    options?: ConversationAdministrationOperationsDeleteConversationParameters,
  ): StreamableMethod<
    | ConversationAdministrationOperationsDeleteConversation204Response
    | ConversationAdministrationOperationsDeleteConversationDefaultResponse
  >;
}

export interface ConversationAdministrationOperationsTerminateConversation {
  /** Terminates a specific conversation. */
  post(
    options?: ConversationAdministrationOperationsTerminateConversationParameters,
  ): StreamableMethod<
    | ConversationAdministrationOperationsTerminateConversation200Response
    | ConversationAdministrationOperationsTerminateConversationDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/messages/streams/\{id\}' has methods for the following verbs: get */
  (path: "/messages/streams/{id}", id: string): StreamOperationsGetMedia;
  /** Resource for '/messages/readreceipts:send' has methods for the following verbs: post */
  (path: "/messages/readreceipts:send"): ReadReceiptsOperationsSend;
  /** Resource for '/messages/notifications:send' has methods for the following verbs: post */
  (path: "/messages/notifications:send"): NotificationMessagesOperationsSend;
  /** Resource for '/messages/channels/\{channelId\}/templates' has methods for the following verbs: get */
  (
    path: "/messages/channels/{channelId}/templates",
    channelId: string,
  ): TemplateOperationsListTemplates;
  /** Resource for '/messages/conversations/\{conversationId\}/participants:add' has methods for the following verbs: post */
  (
    path: "/messages/conversations/{conversationId}/participants:add",
    conversationId: string,
  ): ConversationThreadOperationsAddParticipants;
  /** Resource for '/messages/conversations/\{conversationId\}/participants:remove' has methods for the following verbs: post */
  (
    path: "/messages/conversations/{conversationId}/participants:remove",
    conversationId: string,
  ): ConversationThreadOperationsRemoveParticipants;
  /** Resource for '/messages/conversations' has methods for the following verbs: get, post */
  (path: "/messages/conversations"): ConversationThreadOperationsListConversations;
  /** Resource for '/messages/conversations/\{conversationId\}/messages' has methods for the following verbs: get */
  (
    path: "/messages/conversations/{conversationId}/messages",
    conversationId: string,
  ): ConversationThreadOperationsListMessages;
  /** Resource for '/messages/conversations/\{conversationId\}/messages:send' has methods for the following verbs: post */
  (
    path: "/messages/conversations/{conversationId}/messages:send",
    conversationId: string,
  ): ConversationThreadOperationsSendMessage;
  /** Resource for '/messages/conversations/\{conversationId\}:analyze' has methods for the following verbs: post */
  (
    path: "/messages/conversations/{conversationId}:analyze",
    conversationId: string,
  ): ConversationThreadOperationsAnalyzeConversation;
  /** Resource for '/messages/conversations/\{conversationId\}' has methods for the following verbs: get, delete */
  (
    path: "/messages/conversations/{conversationId}",
    conversationId: string,
  ): ConversationAdministrationOperationsGetConversation;
  /** Resource for '/messages/conversations/\{conversationId\}:terminate' has methods for the following verbs: post */
  (
    path: "/messages/conversations/{conversationId}:terminate",
    conversationId: string,
  ): ConversationAdministrationOperationsTerminateConversation;
}

export type MessagesServiceClient = Client & {
  path: Routes;
};

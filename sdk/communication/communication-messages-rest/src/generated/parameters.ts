// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import type { RequestParameters } from "@azure-rest/core-client";
import type {
  ReadReceiptContent,
  NotificationContent,
  AddParticipantsOptions,
  RemoveParticipantsOptions,
  SendConversationMessageOptions,
  CreateConversationRequest,
} from "./models.js";

export interface StreamOperationsGetMediaHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface StreamOperationsGetMediaHeaderParam {
  headers?: RawHttpHeadersInput & StreamOperationsGetMediaHeaders;
}

export type StreamOperationsGetMediaParameters = StreamOperationsGetMediaHeaderParam &
  RequestParameters;

export interface ReadReceiptsOperationsSendHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ReadReceiptsOperationsSendBodyParam {
  /** Details of the read receipt update to send. */
  body: ReadReceiptContent;
}

export interface ReadReceiptsOperationsSendHeaderParam {
  headers?: RawHttpHeadersInput & ReadReceiptsOperationsSendHeaders;
}

export type ReadReceiptsOperationsSendParameters = ReadReceiptsOperationsSendHeaderParam &
  ReadReceiptsOperationsSendBodyParam &
  RequestParameters;

export interface NotificationMessagesOperationsSendHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface NotificationMessagesOperationsSendBodyParam {
  /** Details of the message to send. */
  body: NotificationContent;
}

export interface NotificationMessagesOperationsSendHeaderParam {
  headers?: RawHttpHeadersInput & NotificationMessagesOperationsSendHeaders;
}

export type NotificationMessagesOperationsSendParameters =
  NotificationMessagesOperationsSendHeaderParam &
    NotificationMessagesOperationsSendBodyParam &
    RequestParameters;

export interface TemplateOperationsListTemplatesHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface TemplateOperationsListTemplatesQueryParamProperties {
  /** Number of objects to return per page. */
  maxPageSize?: number;
}

export interface TemplateOperationsListTemplatesQueryParam {
  queryParameters?: TemplateOperationsListTemplatesQueryParamProperties;
}

export interface TemplateOperationsListTemplatesHeaderParam {
  headers?: RawHttpHeadersInput & TemplateOperationsListTemplatesHeaders;
}

export type TemplateOperationsListTemplatesParameters = TemplateOperationsListTemplatesQueryParam &
  TemplateOperationsListTemplatesHeaderParam &
  RequestParameters;

export interface ConversationThreadOperationsAddParticipantsHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ConversationThreadOperationsAddParticipantsBodyParam {
  /** Details of the payload for adding participants to a conversation. */
  body: AddParticipantsOptions;
}

export interface ConversationThreadOperationsAddParticipantsHeaderParam {
  headers?: RawHttpHeadersInput & ConversationThreadOperationsAddParticipantsHeaders;
}

export type ConversationThreadOperationsAddParticipantsParameters =
  ConversationThreadOperationsAddParticipantsHeaderParam &
    ConversationThreadOperationsAddParticipantsBodyParam &
    RequestParameters;

export interface ConversationThreadOperationsRemoveParticipantsHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ConversationThreadOperationsRemoveParticipantsBodyParam {
  /** Details of the request body for removing participants from a conversation. */
  body: RemoveParticipantsOptions;
}

export interface ConversationThreadOperationsRemoveParticipantsHeaderParam {
  headers?: RawHttpHeadersInput & ConversationThreadOperationsRemoveParticipantsHeaders;
}

export type ConversationThreadOperationsRemoveParticipantsParameters =
  ConversationThreadOperationsRemoveParticipantsHeaderParam &
    ConversationThreadOperationsRemoveParticipantsBodyParam &
    RequestParameters;

export interface ConversationThreadOperationsListConversationsHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ConversationThreadOperationsListConversationsQueryParamProperties {
  /** Number of objects to return per page. */
  maxPageSize?: number;
  /** The participant user ID */
  participantId?: string;
  /** The id of channel */
  channelId?: string;
}

export interface ConversationThreadOperationsListConversationsQueryParam {
  queryParameters?: ConversationThreadOperationsListConversationsQueryParamProperties;
}

export interface ConversationThreadOperationsListConversationsHeaderParam {
  headers?: RawHttpHeadersInput & ConversationThreadOperationsListConversationsHeaders;
}

export type ConversationThreadOperationsListConversationsParameters =
  ConversationThreadOperationsListConversationsQueryParam &
    ConversationThreadOperationsListConversationsHeaderParam &
    RequestParameters;

export interface ConversationThreadOperationsListMessagesHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ConversationThreadOperationsListMessagesQueryParamProperties {
  /** Number of objects to return per page. */
  maxPageSize?: number;
  /** The participant user ID */
  participantId?: string;
}

export interface ConversationThreadOperationsListMessagesQueryParam {
  queryParameters?: ConversationThreadOperationsListMessagesQueryParamProperties;
}

export interface ConversationThreadOperationsListMessagesHeaderParam {
  headers?: RawHttpHeadersInput & ConversationThreadOperationsListMessagesHeaders;
}

export type ConversationThreadOperationsListMessagesParameters =
  ConversationThreadOperationsListMessagesQueryParam &
    ConversationThreadOperationsListMessagesHeaderParam &
    RequestParameters;

export interface ConversationThreadOperationsSendMessageHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ConversationThreadOperationsSendMessageBodyParam {
  /** Details of the conversation message to send. */
  body: SendConversationMessageOptions;
}

export interface ConversationThreadOperationsSendMessageHeaderParam {
  headers?: RawHttpHeadersInput & ConversationThreadOperationsSendMessageHeaders;
}

export type ConversationThreadOperationsSendMessageParameters =
  ConversationThreadOperationsSendMessageHeaderParam &
    ConversationThreadOperationsSendMessageBodyParam &
    RequestParameters;

export interface ConversationThreadOperationsAnalyzeConversationHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ConversationThreadOperationsAnalyzeConversationHeaderParam {
  headers?: RawHttpHeadersInput & ConversationThreadOperationsAnalyzeConversationHeaders;
}

export type ConversationThreadOperationsAnalyzeConversationParameters =
  ConversationThreadOperationsAnalyzeConversationHeaderParam & RequestParameters;

export interface ConversationAdministrationOperationsCreateConversationBodyParam {
  body: CreateConversationRequest;
}

export type ConversationAdministrationOperationsCreateConversationParameters =
  ConversationAdministrationOperationsCreateConversationBodyParam & RequestParameters;

export interface ConversationAdministrationOperationsGetConversationHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ConversationAdministrationOperationsGetConversationHeaderParam {
  headers?: RawHttpHeadersInput & ConversationAdministrationOperationsGetConversationHeaders;
}

export type ConversationAdministrationOperationsGetConversationParameters =
  ConversationAdministrationOperationsGetConversationHeaderParam & RequestParameters;

export interface ConversationAdministrationOperationsDeleteConversationHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ConversationAdministrationOperationsDeleteConversationHeaderParam {
  headers?: RawHttpHeadersInput & ConversationAdministrationOperationsDeleteConversationHeaders;
}

export type ConversationAdministrationOperationsDeleteConversationParameters =
  ConversationAdministrationOperationsDeleteConversationHeaderParam & RequestParameters;

export interface ConversationAdministrationOperationsTerminateConversationHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ConversationAdministrationOperationsTerminateConversationHeaderParam {
  headers?: RawHttpHeadersInput & ConversationAdministrationOperationsTerminateConversationHeaders;
}

export type ConversationAdministrationOperationsTerminateConversationParameters =
  ConversationAdministrationOperationsTerminateConversationHeaderParam & RequestParameters;

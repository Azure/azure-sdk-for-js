// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import type { RequestParameters } from "@azure-rest/core-client";
import type {
  NotificationContent,
  AddParticipantsOptions,
  RemoveParticipantsOptions,
  SendConversationMessageOptions,
  CreateConversationRequest,
} from "./models.js";

export interface GetMediaHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface GetMediaHeaderParam {
  headers?: RawHttpHeadersInput & GetMediaHeaders;
}

export type GetMediaParameters = GetMediaHeaderParam & RequestParameters;

export interface SendHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface SendBodyParam {
  /** Details of the message to send. */
  body: NotificationContent;
}

export interface SendHeaderParam {
  headers?: RawHttpHeadersInput & SendHeaders;
}

export type SendParameters = SendHeaderParam &
  SendBodyParam &
  RequestParameters;

export interface ListTemplatesHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ListTemplatesQueryParamProperties {
  /** Number of objects to return per page. */
  maxPageSize?: number;
}

export interface ListTemplatesQueryParam {
  queryParameters?: ListTemplatesQueryParamProperties;
}

export interface ListTemplatesHeaderParam {
  headers?: RawHttpHeadersInput & ListTemplatesHeaders;
}

export type ListTemplatesParameters = ListTemplatesQueryParam &
  ListTemplatesHeaderParam &
  RequestParameters;

export interface AddParticipantsHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface AddParticipantsBodyParam {
  /** Details of the payload for adding participants to a conversation. */
  body: AddParticipantsOptions;
}

export interface AddParticipantsHeaderParam {
  headers?: RawHttpHeadersInput & AddParticipantsHeaders;
}

export type AddParticipantsParameters = AddParticipantsHeaderParam &
  AddParticipantsBodyParam &
  RequestParameters;

export interface RemoveParticipantsHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface RemoveParticipantsBodyParam {
  /** Details of the request body for removing participants from a conversation. */
  body: RemoveParticipantsOptions;
}

export interface RemoveParticipantsHeaderParam {
  headers?: RawHttpHeadersInput & RemoveParticipantsHeaders;
}

export type RemoveParticipantsParameters = RemoveParticipantsHeaderParam &
  RemoveParticipantsBodyParam &
  RequestParameters;

export interface ListConversationsHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ListConversationsQueryParamProperties {
  /** Number of objects to return per page. */
  maxPageSize?: number;
  /** The participant user ID */
  participantId?: string;
  /** The id of channel */
  channelId?: string;
}

export interface ListConversationsQueryParam {
  queryParameters?: ListConversationsQueryParamProperties;
}

export interface ListConversationsHeaderParam {
  headers?: RawHttpHeadersInput & ListConversationsHeaders;
}

export type ListConversationsParameters = ListConversationsQueryParam &
  ListConversationsHeaderParam &
  RequestParameters;

export interface ListMessagesHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface ListMessagesQueryParamProperties {
  /** Number of objects to return per page. */
  maxPageSize?: number;
  /** The participant user ID */
  participantId?: string;
}

export interface ListMessagesQueryParam {
  queryParameters?: ListMessagesQueryParamProperties;
}

export interface ListMessagesHeaderParam {
  headers?: RawHttpHeadersInput & ListMessagesHeaders;
}

export type ListMessagesParameters = ListMessagesQueryParam &
  ListMessagesHeaderParam &
  RequestParameters;

export interface SendMessageHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface SendMessageBodyParam {
  /** Details of the conversation message to send. */
  body: SendConversationMessageOptions;
}

export interface SendMessageHeaderParam {
  headers?: RawHttpHeadersInput & SendMessageHeaders;
}

export type SendMessageParameters = SendMessageHeaderParam &
  SendMessageBodyParam &
  RequestParameters;

export interface AnalyzeConversationHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface AnalyzeConversationHeaderParam {
  headers?: RawHttpHeadersInput & AnalyzeConversationHeaders;
}

export type AnalyzeConversationParameters = AnalyzeConversationHeaderParam &
  RequestParameters;

export interface CreateConversationBodyParam {
  body: CreateConversationRequest;
}

export type CreateConversationParameters = CreateConversationBodyParam &
  RequestParameters;

export interface GetConversationHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface GetConversationHeaderParam {
  headers?: RawHttpHeadersInput & GetConversationHeaders;
}

export type GetConversationParameters = GetConversationHeaderParam &
  RequestParameters;

export interface DeleteConversationHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface DeleteConversationHeaderParam {
  headers?: RawHttpHeadersInput & DeleteConversationHeaders;
}

export type DeleteConversationParameters = DeleteConversationHeaderParam &
  RequestParameters;

export interface TerminateConversationHeaders {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "Repeatability-Request-ID"?: string;
  /** Specifies the date and time at which the request was first created. */
  "Repeatability-First-Sent"?: string;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

export interface TerminateConversationHeaderParam {
  headers?: RawHttpHeadersInput & TerminateConversationHeaders;
}

export type TerminateConversationParameters = TerminateConversationHeaderParam &
  RequestParameters;

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import type {
  RepeatabilityResultOutput,
  SendMessageResultOutput,
  PagedMessageTemplateItemOutput,
  AddParticipantsResultOutput,
  RemoveParticipantsResultOutput,
  PagedConversationOutput,
  PagedConversationMessageItemOutput,
  SendConversationMessageResultOutput,
  GetConversationThreadAnalysisResultOutput,
  ConversationOutput,
} from "./outputModels.js";

export interface StreamOperationsGetMedia200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
  /** The stream content type. */
  "content-type": "application/octet-stream";
}

/** The request has succeeded. */
export interface StreamOperationsGetMedia200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & StreamOperationsGetMedia200Headers;
}

export interface StreamOperationsGetMediaDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface StreamOperationsGetMediaDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & StreamOperationsGetMediaDefaultHeaders;
}

export interface ReadReceiptsOperationsSend202Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: RepeatabilityResultOutput;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface ReadReceiptsOperationsSend202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & ReadReceiptsOperationsSend202Headers;
}

export interface ReadReceiptsOperationsSendDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ReadReceiptsOperationsSendDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ReadReceiptsOperationsSendDefaultHeaders;
}

export interface NotificationMessagesOperationsSend202Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: RepeatabilityResultOutput;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface NotificationMessagesOperationsSend202Response extends HttpResponse {
  status: "202";
  body: SendMessageResultOutput;
  headers: RawHttpHeaders & NotificationMessagesOperationsSend202Headers;
}

export interface NotificationMessagesOperationsSendDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface NotificationMessagesOperationsSendDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & NotificationMessagesOperationsSendDefaultHeaders;
}

export interface TemplateOperationsListTemplates200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface TemplateOperationsListTemplates200Response extends HttpResponse {
  status: "200";
  body: PagedMessageTemplateItemOutput;
  headers: RawHttpHeaders & TemplateOperationsListTemplates200Headers;
}

export interface TemplateOperationsListTemplatesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TemplateOperationsListTemplatesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TemplateOperationsListTemplatesDefaultHeaders;
}

export interface ConversationThreadOperationsAddParticipants207Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: RepeatabilityResultOutput;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** Successful */
export interface ConversationThreadOperationsAddParticipants207Response extends HttpResponse {
  status: "207";
  body: AddParticipantsResultOutput;
  headers: RawHttpHeaders & ConversationThreadOperationsAddParticipants207Headers;
}

export interface ConversationThreadOperationsAddParticipantsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ConversationThreadOperationsAddParticipantsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ConversationThreadOperationsAddParticipantsDefaultHeaders;
}

export interface ConversationThreadOperationsRemoveParticipants207Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: RepeatabilityResultOutput;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** Successful */
export interface ConversationThreadOperationsRemoveParticipants207Response extends HttpResponse {
  status: "207";
  body: RemoveParticipantsResultOutput;
  headers: RawHttpHeaders & ConversationThreadOperationsRemoveParticipants207Headers;
}

export interface ConversationThreadOperationsRemoveParticipantsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ConversationThreadOperationsRemoveParticipantsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ConversationThreadOperationsRemoveParticipantsDefaultHeaders;
}

export interface ConversationThreadOperationsListConversations200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface ConversationThreadOperationsListConversations200Response extends HttpResponse {
  status: "200";
  body: PagedConversationOutput;
  headers: RawHttpHeaders & ConversationThreadOperationsListConversations200Headers;
}

export interface ConversationThreadOperationsListConversationsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ConversationThreadOperationsListConversationsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ConversationThreadOperationsListConversationsDefaultHeaders;
}

export interface ConversationThreadOperationsListMessages200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface ConversationThreadOperationsListMessages200Response extends HttpResponse {
  status: "200";
  body: PagedConversationMessageItemOutput;
  headers: RawHttpHeaders & ConversationThreadOperationsListMessages200Headers;
}

export interface ConversationThreadOperationsListMessagesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ConversationThreadOperationsListMessagesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ConversationThreadOperationsListMessagesDefaultHeaders;
}

export interface ConversationThreadOperationsSendMessage200Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: RepeatabilityResultOutput;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface ConversationThreadOperationsSendMessage200Response extends HttpResponse {
  status: "200";
  body: SendConversationMessageResultOutput;
  headers: RawHttpHeaders & ConversationThreadOperationsSendMessage200Headers;
}

export interface ConversationThreadOperationsSendMessageDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ConversationThreadOperationsSendMessageDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ConversationThreadOperationsSendMessageDefaultHeaders;
}

export interface ConversationThreadOperationsAnalyzeConversation200Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: RepeatabilityResultOutput;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface ConversationThreadOperationsAnalyzeConversation200Response extends HttpResponse {
  status: "200";
  body: GetConversationThreadAnalysisResultOutput;
  headers: RawHttpHeaders & ConversationThreadOperationsAnalyzeConversation200Headers;
}

export interface ConversationThreadOperationsAnalyzeConversationDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ConversationThreadOperationsAnalyzeConversationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ConversationThreadOperationsAnalyzeConversationDefaultHeaders;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface ConversationAdministrationOperationsCreateConversation201Response extends HttpResponse {
  status: "201";
  body: ConversationOutput;
}

export interface ConversationAdministrationOperationsCreateConversationDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ConversationAdministrationOperationsCreateConversationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ConversationAdministrationOperationsCreateConversationDefaultHeaders;
}

export interface ConversationAdministrationOperationsGetConversation200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface ConversationAdministrationOperationsGetConversation200Response extends HttpResponse {
  status: "200";
  body: ConversationOutput;
  headers: RawHttpHeaders & ConversationAdministrationOperationsGetConversation200Headers;
}

export interface ConversationAdministrationOperationsGetConversationDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ConversationAdministrationOperationsGetConversationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ConversationAdministrationOperationsGetConversationDefaultHeaders;
}

export interface ConversationAdministrationOperationsDeleteConversation204Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: RepeatabilityResultOutput;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface ConversationAdministrationOperationsDeleteConversation204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & ConversationAdministrationOperationsDeleteConversation204Headers;
}

export interface ConversationAdministrationOperationsDeleteConversationDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ConversationAdministrationOperationsDeleteConversationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ConversationAdministrationOperationsDeleteConversationDefaultHeaders;
}

export interface ConversationAdministrationOperationsTerminateConversation200Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: RepeatabilityResultOutput;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface ConversationAdministrationOperationsTerminateConversation200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & ConversationAdministrationOperationsTerminateConversation200Headers;
}

export interface ConversationAdministrationOperationsTerminateConversationDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ConversationAdministrationOperationsTerminateConversationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ConversationAdministrationOperationsTerminateConversationDefaultHeaders;
}

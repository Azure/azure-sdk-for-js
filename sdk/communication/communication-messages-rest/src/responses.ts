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

export interface GetMedia200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
  /** The stream content type. */
  "content-type": "application/octet-stream";
}

/** The request has succeeded. */
export interface GetMedia200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & GetMedia200Headers;
}

export interface GetMediaDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetMediaDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetMediaDefaultHeaders;
}

export interface Send202Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: RepeatabilityResultOutput;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface Send202Response extends HttpResponse {
  status: "202";
  body: SendMessageResultOutput;
  headers: RawHttpHeaders & Send202Headers;
}

export interface SendDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface SendDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & SendDefaultHeaders;
}

export interface ListTemplates200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface ListTemplates200Response extends HttpResponse {
  status: "200";
  body: PagedMessageTemplateItemOutput;
  headers: RawHttpHeaders & ListTemplates200Headers;
}

export interface ListTemplatesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListTemplatesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListTemplatesDefaultHeaders;
}

export interface AddParticipants207Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: RepeatabilityResultOutput;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** Successful */
export interface AddParticipants207Response extends HttpResponse {
  status: "207";
  body: AddParticipantsResultOutput;
  headers: RawHttpHeaders & AddParticipants207Headers;
}

export interface AddParticipantsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AddParticipantsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AddParticipantsDefaultHeaders;
}

export interface RemoveParticipants207Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: RepeatabilityResultOutput;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** Successful */
export interface RemoveParticipants207Response extends HttpResponse {
  status: "207";
  body: RemoveParticipantsResultOutput;
  headers: RawHttpHeaders & RemoveParticipants207Headers;
}

export interface RemoveParticipantsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface RemoveParticipantsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & RemoveParticipantsDefaultHeaders;
}

export interface ListConversations200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface ListConversations200Response extends HttpResponse {
  status: "200";
  body: PagedConversationOutput;
  headers: RawHttpHeaders & ListConversations200Headers;
}

export interface ListConversationsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListConversationsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListConversationsDefaultHeaders;
}

export interface ListMessages200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface ListMessages200Response extends HttpResponse {
  status: "200";
  body: PagedConversationMessageItemOutput;
  headers: RawHttpHeaders & ListMessages200Headers;
}

export interface ListMessagesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ListMessagesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ListMessagesDefaultHeaders;
}

export interface SendMessage200Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: RepeatabilityResultOutput;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface SendMessage200Response extends HttpResponse {
  status: "200";
  body: SendConversationMessageResultOutput;
  headers: RawHttpHeaders & SendMessage200Headers;
}

export interface SendMessageDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface SendMessageDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & SendMessageDefaultHeaders;
}

export interface AnalyzeConversation200Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: RepeatabilityResultOutput;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface AnalyzeConversation200Response extends HttpResponse {
  status: "200";
  body: GetConversationThreadAnalysisResultOutput;
  headers: RawHttpHeaders & AnalyzeConversation200Headers;
}

export interface AnalyzeConversationDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AnalyzeConversationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AnalyzeConversationDefaultHeaders;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface CreateConversation201Response extends HttpResponse {
  status: "201";
  body: ConversationOutput;
}

export interface CreateConversationDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateConversationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateConversationDefaultHeaders;
}

export interface GetConversation200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface GetConversation200Response extends HttpResponse {
  status: "200";
  body: ConversationOutput;
  headers: RawHttpHeaders & GetConversation200Headers;
}

export interface GetConversationDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetConversationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetConversationDefaultHeaders;
}

export interface DeleteConversation204Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: RepeatabilityResultOutput;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface DeleteConversation204Response extends HttpResponse {
  status: "204";
  headers: RawHttpHeaders & DeleteConversation204Headers;
}

export interface DeleteConversationDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DeleteConversationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DeleteConversationDefaultHeaders;
}

export interface TerminateConversation200Headers {
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: RepeatabilityResultOutput;
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface TerminateConversation200Response extends HttpResponse {
  status: "200";
  headers: RawHttpHeaders & TerminateConversation200Headers;
}

export interface TerminateConversationDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface TerminateConversationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & TerminateConversationDefaultHeaders;
}

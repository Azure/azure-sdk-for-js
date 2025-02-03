// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import {
  RepeatabilityResultOutput,
  SendMessageResultOutput,
  PagedMessageTemplateItemOutput,
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

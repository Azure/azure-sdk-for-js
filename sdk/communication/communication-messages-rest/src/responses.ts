// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import {
  RepeatabilityResultOutput,
  SendMessageResultOutput,
  PagedMessageTemplateItemOutput,
} from "./outputModels";

export interface DownloadMedia200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface DownloadMedia200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
  headers: RawHttpHeaders & DownloadMedia200Headers;
}

export interface DownloadMediaDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface DownloadMediaDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & DownloadMediaDefaultHeaders;
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

export interface GetTemplates200Headers {
  /** An opaque, globally-unique, client-generated string identifier for the request. */
  "x-ms-client-request-id"?: string;
}

/** The request has succeeded. */
export interface GetTemplates200Response extends HttpResponse {
  status: "200";
  body: PagedMessageTemplateItemOutput;
  headers: RawHttpHeaders & GetTemplates200Headers;
}

export interface GetTemplatesDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetTemplatesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetTemplatesDefaultHeaders;
}

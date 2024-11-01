// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import {
  SessionCodeExecutionResourceOutput,
  PagedSessionResourceFileOutput,
  SessionResourceFileOutput,
} from "./outputModels.js";

export interface CodeExecutionExecute202Headers {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
  /** The id of this execution operation. */
  "operation-id"?: string;
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface CodeExecutionExecute202Response extends HttpResponse {
  status: "202";
  body: SessionCodeExecutionResourceOutput;
  headers: RawHttpHeaders & CodeExecutionExecute202Headers;
}

export interface CodeExecutionExecuteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CodeExecutionExecuteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CodeExecutionExecuteDefaultHeaders;
}

/** The final response for long-running execute operation */
export interface CodeExecutionExecuteLogicalResponse extends HttpResponse {
  status: "200";
  body: SessionCodeExecutionResourceOutput;
}

export interface CodeExecutionGet200Headers {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** The request has succeeded. */
export interface CodeExecutionGet200Response extends HttpResponse {
  status: "200";
  body: SessionCodeExecutionResourceOutput;
  headers: RawHttpHeaders & CodeExecutionGet200Headers;
}

export interface CodeExecutionGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CodeExecutionGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CodeExecutionGetDefaultHeaders;
}

/** The request has succeeded. */
export interface SessionResourceFilesList200Response extends HttpResponse {
  status: "200";
  body: PagedSessionResourceFileOutput;
}

export interface SessionResourceFilesListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface SessionResourceFilesListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & SessionResourceFilesListDefaultHeaders;
}

/** The request has succeeded. */
export interface SessionResourceFilesGet200Response extends HttpResponse {
  status: "200";
  body: SessionResourceFileOutput;
}

export interface SessionResourceFilesGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface SessionResourceFilesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & SessionResourceFilesGetDefaultHeaders;
}

/** There is no content to send for this request, but the headers may be useful. */
export interface SessionResourceFilesDelete204Response extends HttpResponse {
  status: "204";
}

export interface SessionResourceFilesDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface SessionResourceFilesDeleteDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & SessionResourceFilesDeleteDefaultHeaders;
}

/** The request has succeeded. */
export interface SessionResourceFilesUpload200Response extends HttpResponse {
  status: "200";
  body: SessionResourceFileOutput;
}

export interface SessionResourceFilesUploadDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface SessionResourceFilesUploadDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & SessionResourceFilesUploadDefaultHeaders;
}

/** The request has succeeded. */
export interface SessionResourceFilesGetContent200Response
  extends HttpResponse {
  status: "200";
  body: string;
}

export interface SessionResourceFilesGetContentDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface SessionResourceFilesGetContentDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & SessionResourceFilesGetContentDefaultHeaders;
}

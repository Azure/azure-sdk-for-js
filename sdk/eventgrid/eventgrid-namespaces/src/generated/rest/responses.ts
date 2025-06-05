// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import type {
  PublishResultOutput,
  ReceiveResultOutput,
  AcknowledgeResultOutput,
  ReleaseResultOutput,
  RejectResultOutput,
  RenewCloudEventLocksResultOutput,
} from "./outputModels.js";

/** The request has succeeded. */
export interface PublishCloudEvent200Response extends HttpResponse {
  status: "200";
  body: PublishResultOutput;
}

export interface PublishCloudEventDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PublishCloudEventDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PublishCloudEventDefaultHeaders;
}

/** The request has succeeded. */
export interface PublishCloudEvents200Response extends HttpResponse {
  status: "200";
  body: PublishResultOutput;
}

export interface PublishCloudEventsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface PublishCloudEventsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & PublishCloudEventsDefaultHeaders;
}

/** The request has succeeded. */
export interface ReceiveCloudEvents200Response extends HttpResponse {
  status: "200";
  body: ReceiveResultOutput;
}

export interface ReceiveCloudEventsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ReceiveCloudEventsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ReceiveCloudEventsDefaultHeaders;
}

/** The request has succeeded. */
export interface AcknowledgeCloudEvents200Response extends HttpResponse {
  status: "200";
  body: AcknowledgeResultOutput;
}

export interface AcknowledgeCloudEventsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AcknowledgeCloudEventsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AcknowledgeCloudEventsDefaultHeaders;
}

/** The request has succeeded. */
export interface ReleaseCloudEvents200Response extends HttpResponse {
  status: "200";
  body: ReleaseResultOutput;
}

export interface ReleaseCloudEventsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface ReleaseCloudEventsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & ReleaseCloudEventsDefaultHeaders;
}

/** The request has succeeded. */
export interface RejectCloudEvents200Response extends HttpResponse {
  status: "200";
  body: RejectResultOutput;
}

export interface RejectCloudEventsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface RejectCloudEventsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & RejectCloudEventsDefaultHeaders;
}

/** The request has succeeded. */
export interface RenewCloudEventLocks200Response extends HttpResponse {
  status: "200";
  body: RenewCloudEventLocksResultOutput;
}

export interface RenewCloudEventLocksDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface RenewCloudEventLocksDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & RenewCloudEventLocksDefaultHeaders;
}

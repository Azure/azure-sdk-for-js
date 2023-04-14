// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import { ReceiveResponseOutput, LockTokensResponseOutput } from "./outputModels";

/** The request has succeeded. */
export interface PublishCloudEvent200Response extends HttpResponse {
  status: "200";
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
export interface publishCloudEvents200Response extends HttpResponse {
  status: "200";
}

export interface publishCloudEventsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface publishCloudEventsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & publishCloudEventsDefaultHeaders;
}

/** The request has succeeded and a new resource has been created as a result. */
export interface receiveCloudEvents201Response extends HttpResponse {
  status: "201";
  body: ReceiveResponseOutput;
}

export interface receiveCloudEventsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface receiveCloudEventsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & receiveCloudEventsDefaultHeaders;
}

/** The request has succeeded. */
export interface acknowledgeCloudEvents200Response extends HttpResponse {
  status: "200";
  body: LockTokensResponseOutput;
}

export interface acknowledgeCloudEventsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface acknowledgeCloudEventsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & acknowledgeCloudEventsDefaultHeaders;
}

/** The request has succeeded. */
export interface releaseCloudEvents200Response extends HttpResponse {
  status: "200";
  body: LockTokensResponseOutput;
}

export interface releaseCloudEventsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface releaseCloudEventsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & releaseCloudEventsDefaultHeaders;
}

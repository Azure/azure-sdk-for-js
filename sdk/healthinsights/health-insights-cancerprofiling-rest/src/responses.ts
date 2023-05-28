// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import { OncoPhenotypeResultOutput } from "./outputModels";

/** The request has succeeded. */
export interface InferCancerProfile200Response extends HttpResponse {
  status: "200";
  body: OncoPhenotypeResultOutput;
}

export interface InferCancerProfile202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: "accepted" | "rejected";
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface InferCancerProfile202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & InferCancerProfile202Headers;
}

export interface InferCancerProfileDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface InferCancerProfileDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & InferCancerProfileDefaultHeaders;
}

/** The final response for long-running inferCancerProfile operation */
export interface InferCancerProfileLogicalResponse extends HttpResponse {
  status: "200";
}

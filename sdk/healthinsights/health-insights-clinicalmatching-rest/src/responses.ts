// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import { TrialMatcherResultOutput } from "./outputModels";

/** The request has succeeded. */
export interface MatchTrials200Response extends HttpResponse {
  status: "200";
  body: TrialMatcherResultOutput;
}

export interface MatchTrials202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
  /** The Retry-After header can indicate how long the client should wait before polling the operation status. */
  "retry-after"?: number;
  /** Indicates whether the repeatable request was accepted or rejected. */
  "repeatability-result"?: "accepted" | "rejected";
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface MatchTrials202Response extends HttpResponse {
  status: "202";
  headers: RawHttpHeaders & MatchTrials202Headers;
}

export interface MatchTrialsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface MatchTrialsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & MatchTrialsDefaultHeaders;
}

/** The final response for long-running MatchTrials operation */
export interface MatchTrialsLogicalResponse extends HttpResponse {
  status: "200";
}

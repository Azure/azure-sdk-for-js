// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import { ImageAnalysisResultOutput } from "./outputModels.js";

/** The request has succeeded. */
export interface AnalyzeFromStream200Response extends HttpResponse {
  status: "200";
  body: ImageAnalysisResultOutput;
}

export interface AnalyzeFromStreamDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AnalyzeFromStreamDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AnalyzeFromStreamDefaultHeaders;
}

/** The request has succeeded. */
export interface AnalyzeFromUrl200Response extends HttpResponse {
  status: "200";
  body: ImageAnalysisResultOutput;
}

export interface AnalyzeFromUrlDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AnalyzeFromUrlDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AnalyzeFromUrlDefaultHeaders;
}

/** The request has succeeded. */
export interface SegmentFromUrl200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

export interface SegmentFromUrlDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface SegmentFromUrlDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & SegmentFromUrlDefaultHeaders;
}

/** The request has succeeded. */
export interface SegmentFromStream200Response extends HttpResponse {
  status: "200";
  /** Value may contain any sequence of octets */
  body: Uint8Array;
}

export interface SegmentFromStreamDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface SegmentFromStreamDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & SegmentFromStreamDefaultHeaders;
}

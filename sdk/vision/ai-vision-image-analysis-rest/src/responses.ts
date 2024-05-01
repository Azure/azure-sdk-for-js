// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import { ImageAnalysisResultOutput } from "./outputModels";

/** The request has succeeded. */
export interface AnalyzeFromBuffer200Response extends HttpResponse {
  status: "200";
  body: ImageAnalysisResultOutput;
}

export interface AnalyzeFromBufferDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface AnalyzeFromBufferDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & AnalyzeFromBufferDefaultHeaders;
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

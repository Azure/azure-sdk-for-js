// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import { ChatCompletionChunkOutput, ChatCompletionOutput } from "./outputModels.js";

/** The request has succeeded. */
export interface CreateStreaming200Response extends HttpResponse {
  status: "200";
  body: ChatCompletionChunkOutput;
}

export interface CreateStreamingDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateStreamingDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateStreamingDefaultHeaders;
}

/** The request has succeeded. */
export interface Create200Response extends HttpResponse {
  status: "200";
  body: ChatCompletionOutput;
}

export interface CreateDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface CreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & CreateDefaultHeaders;
}

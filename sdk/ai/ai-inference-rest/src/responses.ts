// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import {
  ChatCompletionsOutput,
  ModelInfoOutput,
  EmbeddingsResultOutput,
} from "./outputModels.js";

/** The request has succeeded. */
export interface GetChatCompletions200Response extends HttpResponse {
  status: "200";
  body: ChatCompletionsOutput;
}

export interface GetChatCompletionsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetChatCompletionsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetChatCompletionsDefaultHeaders;
}

/** The request has succeeded. */
export interface GetModelInfo200Response extends HttpResponse {
  status: "200";
  body: ModelInfoOutput;
}

export interface GetModelInfoDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetModelInfoDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetModelInfoDefaultHeaders;
}

/** The request has succeeded. */
export interface GetEmbeddings200Response extends HttpResponse {
  status: "200";
  body: EmbeddingsResultOutput;
}

export interface GetEmbeddingsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetEmbeddingsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetEmbeddingsDefaultHeaders;
}

/** The request has succeeded. */
export interface GetImageEmbeddings200Response extends HttpResponse {
  status: "200";
  body: EmbeddingsResultOutput;
}

export interface GetImageEmbeddingsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetImageEmbeddingsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetImageEmbeddingsDefaultHeaders;
}

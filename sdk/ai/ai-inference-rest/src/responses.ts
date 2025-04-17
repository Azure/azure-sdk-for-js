// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import type { ErrorResponse, HttpResponse } from "@azure-rest/core-client";
import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type {
  ChatCompletionsOutput,
  EmbeddingsResultOutput,
  ModelInfoOutput,
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

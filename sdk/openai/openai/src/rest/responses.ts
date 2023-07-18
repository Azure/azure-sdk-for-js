// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import {
  EmbeddingsOutput,
  CompletionsOutput,
  ChatCompletionsOutput,
  BatchImageGenerationOperationResponseOutput,
} from "./outputModels.js";

/** The request has succeeded. */
export interface GetEmbeddings200Response extends HttpResponse {
  status: "200";
  body: EmbeddingsOutput;
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
export interface GetCompletions200Response extends HttpResponse {
  status: "200";
  body: CompletionsOutput;
}

export interface GetCompletionsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetCompletionsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetCompletionsDefaultHeaders;
}

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
export interface GetAzureBatchImageGenerationOperationStatus200Response extends HttpResponse {
  status: "200";
  body: BatchImageGenerationOperationResponseOutput;
}

export interface GetAzureBatchImageGenerationOperationStatusDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetAzureBatchImageGenerationOperationStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetAzureBatchImageGenerationOperationStatusDefaultHeaders;
}

/** The final response for long-running getAzureBatchImageGenerationOperationStatus operation */
export interface GetAzureBatchImageGenerationOperationStatusLogicalResponse extends HttpResponse {
  status: "200";
  body: BatchImageGenerationOperationResponseOutput;
}

export interface BeginAzureBatchImageGeneration202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface BeginAzureBatchImageGeneration202Response extends HttpResponse {
  status: "202";
  body: BatchImageGenerationOperationResponseOutput;
  headers: RawHttpHeaders & BeginAzureBatchImageGeneration202Headers;
}

export interface BeginAzureBatchImageGenerationDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface BeginAzureBatchImageGenerationDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & BeginAzureBatchImageGenerationDefaultHeaders;
}

/** The final response for long-running beginAzureBatchImageGeneration operation */
export interface BeginAzureBatchImageGenerationLogicalResponse extends HttpResponse {
  status: "200";
  body: BatchImageGenerationOperationResponseOutput;
}

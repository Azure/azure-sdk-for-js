// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse, ErrorResponse } from "@azure-rest/core-client";
import {
  AudioTranscriptionSimpleJsonOutput,
  AudioTranscriptionVerboseJsonOutput,
  CompletionsOutput,
  ChatCompletionsOutput,
  EmbeddingsOutput,
  BatchImageGenerationOperationResponseOutput,
} from "./outputModels.js";

/** The request has succeeded. */
export interface GetAudioTranscriptionSimpleJson200Response
  extends HttpResponse {
  status: "200";
  body: AudioTranscriptionSimpleJsonOutput;
}

export interface GetAudioTranscriptionSimpleJsonDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetAudioTranscriptionSimpleJsonDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetAudioTranscriptionSimpleJsonDefaultHeaders;
}

/** The request has succeeded. */
export interface GetAudioTranscriptionVerboseJson200Response
  extends HttpResponse {
  status: "200";
  body: AudioTranscriptionVerboseJsonOutput;
}

export interface GetAudioTranscriptionVerboseJsonDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetAudioTranscriptionVerboseJsonDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetAudioTranscriptionVerboseJsonDefaultHeaders;
}

/** The request has succeeded. */
export interface GetAudioTranscriptionPlainText200Response
  extends HttpResponse {
  status: "200";
  body: string;
}

export interface GetAudioTranscriptionPlainTextDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetAudioTranscriptionPlainTextDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetAudioTranscriptionPlainTextDefaultHeaders;
}

/** The request has succeeded. */
export interface GetAudioTranscriptionSrt200Response extends HttpResponse {
  status: "200";
  body: string;
}

export interface GetAudioTranscriptionSrtDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetAudioTranscriptionSrtDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetAudioTranscriptionSrtDefaultHeaders;
}

/** The request has succeeded. */
export interface GetAudioTranscriptionVtt200Response extends HttpResponse {
  status: "200";
  body: string;
}

export interface GetAudioTranscriptionVttDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetAudioTranscriptionVttDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetAudioTranscriptionVttDefaultHeaders;
}

/** The request has succeeded. */
export interface GetAudioTranslationSimpleJson200Response extends HttpResponse {
  status: "200";
  body: AudioTranscriptionSimpleJsonOutput;
}

export interface GetAudioTranslationSimpleJsonDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetAudioTranslationSimpleJsonDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetAudioTranslationSimpleJsonDefaultHeaders;
}

/** The request has succeeded. */
export interface GetAudioTranslationVerboseJson200Response
  extends HttpResponse {
  status: "200";
  body: AudioTranscriptionVerboseJsonOutput;
}

export interface GetAudioTranslationVerboseJsonDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetAudioTranslationVerboseJsonDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetAudioTranslationVerboseJsonDefaultHeaders;
}

/** The request has succeeded. */
export interface GetAudioTranslationPlainText200Response extends HttpResponse {
  status: "200";
  body: string;
}

export interface GetAudioTranslationPlainTextDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetAudioTranslationPlainTextDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetAudioTranslationPlainTextDefaultHeaders;
}

/** The request has succeeded. */
export interface GetAudioTranslationSrt200Response extends HttpResponse {
  status: "200";
  body: string;
}

export interface GetAudioTranslationSrtDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetAudioTranslationSrtDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetAudioTranslationSrtDefaultHeaders;
}

/** The request has succeeded. */
export interface GetAudioTranslationVtt200Response extends HttpResponse {
  status: "200";
  body: string;
}

export interface GetAudioTranslationVttDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetAudioTranslationVttDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetAudioTranslationVttDefaultHeaders;
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
export interface GetChatCompletionsWithAzureExtensions200Response
  extends HttpResponse {
  status: "200";
  body: ChatCompletionsOutput;
}

export interface GetChatCompletionsWithAzureExtensionsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetChatCompletionsWithAzureExtensionsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetChatCompletionsWithAzureExtensionsDefaultHeaders;
}

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
export interface GetAzureBatchImageGenerationOperationStatus200Response
  extends HttpResponse {
  status: "200";
  body: BatchImageGenerationOperationResponseOutput;
}

export interface GetAzureBatchImageGenerationOperationStatusDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetAzureBatchImageGenerationOperationStatusDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders &
    GetAzureBatchImageGenerationOperationStatusDefaultHeaders;
}

/** The final response for long-running getAzureBatchImageGenerationOperationStatus operation */
export interface GetAzureBatchImageGenerationOperationStatusLogicalResponse
  extends HttpResponse {
  status: "200";
  body: BatchImageGenerationOperationResponseOutput;
}

export interface BeginAzureBatchImageGeneration202Headers {
  /** The location for monitoring the operation state. */
  "operation-location": string;
}

/** The request has been accepted for processing, but processing has not yet completed. */
export interface BeginAzureBatchImageGeneration202Response
  extends HttpResponse {
  status: "202";
  body: BatchImageGenerationOperationResponseOutput;
  headers: RawHttpHeaders & BeginAzureBatchImageGeneration202Headers;
}

export interface BeginAzureBatchImageGenerationDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface BeginAzureBatchImageGenerationDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & BeginAzureBatchImageGenerationDefaultHeaders;
}

/** The final response for long-running beginAzureBatchImageGeneration operation */
export interface BeginAzureBatchImageGenerationLogicalResponse
  extends HttpResponse {
  status: "200";
  body: BatchImageGenerationOperationResponseOutput;
}

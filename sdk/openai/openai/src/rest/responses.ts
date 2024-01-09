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
  AudioTranscriptionOutput,
  AudioTranslationOutput,
  CompletionsOutput,
  ChatCompletionsOutput,
  ImageGenerationsOutput,
  EmbeddingsOutput,
  BatchImageGenerationOperationResponseOutput,
} from "./outputModels.js";

/** The request has succeeded. */
export interface GetAudioTranscriptionAsPlainText200Response extends HttpResponse {
  status: "200";
  body: string;
}

export interface GetAudioTranscriptionAsPlainTextDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetAudioTranscriptionAsPlainTextDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetAudioTranscriptionAsPlainTextDefaultHeaders;
}

/** The request has succeeded. */
export interface GetAudioTranscriptionAsResponseObject200Response extends HttpResponse {
  status: "200";
  body: AudioTranscriptionOutput;
}

export interface GetAudioTranscriptionAsResponseObjectDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetAudioTranscriptionAsResponseObjectDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetAudioTranscriptionAsResponseObjectDefaultHeaders;
}

/** The request has succeeded. */
export interface GetAudioTranslationAsPlainText200Response extends HttpResponse {
  status: "200";
  body: string;
}

export interface GetAudioTranslationAsPlainTextDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetAudioTranslationAsPlainTextDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetAudioTranslationAsPlainTextDefaultHeaders;
}

/** The request has succeeded. */
export interface GetAudioTranslationAsResponseObject200Response extends HttpResponse {
  status: "200";
  body: AudioTranslationOutput;
}

export interface GetAudioTranslationAsResponseObjectDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetAudioTranslationAsResponseObjectDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetAudioTranslationAsResponseObjectDefaultHeaders;
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
export interface GetChatCompletionsWithAzureExtensions200Response extends HttpResponse {
  status: "200";
  body: ChatCompletionsOutput;
}

export interface GetChatCompletionsWithAzureExtensionsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetChatCompletionsWithAzureExtensionsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetChatCompletionsWithAzureExtensionsDefaultHeaders;
}

/** The request has succeeded. */
export interface GetImageGenerations200Response extends HttpResponse {
  status: "200";
  body: ImageGenerationsOutput;
}

export interface GetImageGenerationsDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

export interface GetImageGenerationsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponse;
  headers: RawHttpHeaders & GetImageGenerationsDefaultHeaders;
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

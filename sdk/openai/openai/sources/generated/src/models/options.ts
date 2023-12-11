// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure-rest/core-client";

export interface ClientOpenAIClientGetAudioTranscriptionAsPlainTextOptions
  extends OperationOptions {}

export interface ClientOpenAIClientGetAudioTranscriptionAsResponseObjectOptions
  extends OperationOptions {
  /** The content type for the operation. Always multipart/form-data for this operation. */
  contentType?: string;
}

export interface ClientOpenAIClientGetAudioTranslationAsPlainTextOptions
  extends OperationOptions {}

export interface ClientOpenAIClientGetAudioTranslationAsResponseObjectOptions
  extends OperationOptions {
  /** The content type for the operation. Always multipart/form-data for this operation. */
  contentType?: string;
}

export interface ClientOpenAIClientGetCompletionsOptions
  extends OperationOptions {}

export interface ClientOpenAIClientGetChatCompletionsOptions
  extends OperationOptions {}

export interface ClientOpenAIClientGetChatCompletionsWithAzureExtensionsOptions
  extends OperationOptions {}

export interface ClientOpenAIClientGetImageGenerationsOptions
  extends OperationOptions {}

export interface ClientOpenAIClientGetEmbeddingsOptions
  extends OperationOptions {}

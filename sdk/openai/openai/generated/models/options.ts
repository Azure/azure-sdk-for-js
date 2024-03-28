// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure-rest/core-client";

export interface GetAudioTranscriptionAsPlainTextOptions extends OperationOptions {
  /** The content type for the operation. Always multipart/form-data for this operation. */
  contentType?: string;
}

export interface GetAudioTranscriptionAsResponseObjectOptions extends OperationOptions {
  /** The content type for the operation. Always multipart/form-data for this operation. */
  contentType?: string;
}

export interface GetAudioTranslationAsPlainTextOptions extends OperationOptions {
  /** The content type for the operation. Always multipart/form-data for this operation. */
  contentType?: string;
}

export interface GetAudioTranslationAsResponseObjectOptions extends OperationOptions {
  /** The content type for the operation. Always multipart/form-data for this operation. */
  contentType?: string;
}

export interface GetCompletionsOptions extends OperationOptions {}

export interface GetChatCompletionsOptions extends OperationOptions {}

export interface GetImageGenerationsOptions extends OperationOptions {}

export interface GenerateSpeechFromTextOptions extends OperationOptions {}

export interface GetEmbeddingsOptions extends OperationOptions {}

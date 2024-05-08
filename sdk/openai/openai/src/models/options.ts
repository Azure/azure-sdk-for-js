// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure-rest/core-client";

export interface GetAudioTranscriptionAsPlainTextOptionalParams
  extends OperationOptions {
  /** The content type for the operation. Always multipart/form-data for this operation. */
  contentType?: string;
}

export interface GetAudioTranscriptionAsResponseObjectOptionalParams
  extends OperationOptions {
  /** The content type for the operation. Always multipart/form-data for this operation. */
  contentType?: string;
}

export interface GetAudioTranslationAsPlainTextOptionalParams
  extends OperationOptions {
  /** The content type for the operation. Always multipart/form-data for this operation. */
  contentType?: string;
}

export interface GetAudioTranslationAsResponseObjectOptionalParams
  extends OperationOptions {
  /** The content type for the operation. Always multipart/form-data for this operation. */
  contentType?: string;
}

export interface GetCompletionsOptionalParams extends OperationOptions {}

export interface GetChatCompletionsOptionalParams extends OperationOptions {}

export interface GetImageGenerationsOptionalParams extends OperationOptions {}

export interface GenerateSpeechFromTextOptionalParams
  extends OperationOptions {}

export interface GetEmbeddingsOptionalParams extends OperationOptions {}

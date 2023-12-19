// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  AudioTranscriptionOptions,
  AudioTranslationOptions,
  CompletionsOptions,
  ChatCompletionsOptions,
  ImageGenerationOptions,
  EmbeddingsOptions,
} from "./models.js";

export interface GetAudioTranscriptionAsPlainTextBodyParam {
  body?: AudioTranscriptionOptions;
}

export type GetAudioTranscriptionAsPlainTextParameters =
  GetAudioTranscriptionAsPlainTextBodyParam & RequestParameters;

export interface GetAudioTranscriptionAsResponseObjectBodyParam {
  body?: AudioTranscriptionOptions;
}

export interface GetAudioTranscriptionAsResponseObjectMediaTypesParam {
  /** The content type for the operation. Always multipart/form-data for this operation. */
  contentType: "multipart/form-data";
}

export type GetAudioTranscriptionAsResponseObjectParameters =
  GetAudioTranscriptionAsResponseObjectMediaTypesParam &
    GetAudioTranscriptionAsResponseObjectBodyParam &
    RequestParameters;

export interface GetAudioTranslationAsPlainTextBodyParam {
  body?: AudioTranslationOptions;
}

export type GetAudioTranslationAsPlainTextParameters =
  GetAudioTranslationAsPlainTextBodyParam & RequestParameters;

export interface GetAudioTranslationAsResponseObjectBodyParam {
  body?: AudioTranslationOptions;
}

export interface GetAudioTranslationAsResponseObjectMediaTypesParam {
  /** The content type for the operation. Always multipart/form-data for this operation. */
  contentType: "multipart/form-data";
}

export type GetAudioTranslationAsResponseObjectParameters =
  GetAudioTranslationAsResponseObjectMediaTypesParam &
    GetAudioTranslationAsResponseObjectBodyParam &
    RequestParameters;

export interface GetCompletionsBodyParam {
  body?: CompletionsOptions;
}

export type GetCompletionsParameters = GetCompletionsBodyParam &
  RequestParameters;

export interface GetChatCompletionsBodyParam {
  body?: ChatCompletionsOptions;
}

export type GetChatCompletionsParameters = GetChatCompletionsBodyParam &
  RequestParameters;

export interface GetChatCompletionsWithAzureExtensionsBodyParam {
  body?: ChatCompletionsOptions;
}

export type GetChatCompletionsWithAzureExtensionsParameters =
  GetChatCompletionsWithAzureExtensionsBodyParam & RequestParameters;

export interface GetImageGenerationsBodyParam {
  body?: ImageGenerationOptions;
}

export type GetImageGenerationsParameters = GetImageGenerationsBodyParam &
  RequestParameters;

export interface GetEmbeddingsBodyParam {
  body?: EmbeddingsOptions;
}

export type GetEmbeddingsParameters = GetEmbeddingsBodyParam &
  RequestParameters;
export type GetAzureBatchImageGenerationOperationStatusParameters =
  RequestParameters;

export interface BeginAzureBatchImageGenerationBodyParam {
  body?: ImageGenerationOptions;
}

export type BeginAzureBatchImageGenerationParameters =
  BeginAzureBatchImageGenerationBodyParam & RequestParameters;

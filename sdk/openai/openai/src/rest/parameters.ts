// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  AudioTranscriptionOptions,
  AudioTranslationOptions,
  CompletionsOptions,
  ChatCompletionsOptions,
  ImageGenerationOptions,
  SpeechGenerationOptions,
  EmbeddingsOptions,
} from "./models.js";

export interface GetAudioTranscriptionAsPlainTextBodyParam {
  body?: AudioTranscriptionOptions;
}

export interface GetAudioTranscriptionAsPlainTextMediaTypesParam {
  /** The content type for the operation. Always multipart/form-data for this operation. */
  contentType: "multipart/form-data";
}

export type GetAudioTranscriptionAsPlainTextParameters =
  GetAudioTranscriptionAsPlainTextMediaTypesParam &
    GetAudioTranscriptionAsPlainTextBodyParam &
    RequestParameters;

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

export interface GetAudioTranslationAsPlainTextMediaTypesParam {
  /** The content type for the operation. Always multipart/form-data for this operation. */
  contentType: "multipart/form-data";
}

export type GetAudioTranslationAsPlainTextParameters =
  GetAudioTranslationAsPlainTextMediaTypesParam &
    GetAudioTranslationAsPlainTextBodyParam &
    RequestParameters;

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

export interface GetImageGenerationsBodyParam {
  body?: ImageGenerationOptions;
}

export type GetImageGenerationsParameters = GetImageGenerationsBodyParam &
  RequestParameters;

export interface GenerateSpeechFromTextBodyParam {
  body?: SpeechGenerationOptions;
}

export type GenerateSpeechFromTextParameters = GenerateSpeechFromTextBodyParam &
  RequestParameters;

export interface GetEmbeddingsBodyParam {
  body?: EmbeddingsOptions;
}

export type GetEmbeddingsParameters = GetEmbeddingsBodyParam &
  RequestParameters;

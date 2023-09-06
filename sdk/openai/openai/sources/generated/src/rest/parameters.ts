// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  CompletionsOptions,
  ChatCompletionsOptions,
  EmbeddingsOptions,
  ImageGenerationOptions,
} from "./models.js";

export interface GetAudioTranscriptionSimpleJsonBodyParam {
  body: GetAudioTranscriptionSimpleJsonFormBody;
}

export interface GetAudioTranscriptionSimpleJsonFormBody {
  file:
    | string
    | Uint8Array
    | ReadableStream<Uint8Array>
    | NodeJS.ReadableStream;
  prompt?: string;
  temperature?: number;
  language?: string;
  responseFormat?: string;
}

export interface GetAudioTranscriptionSimpleJsonMediaTypesParam {
  /** The content type for the operation. Always multipart/form-data for this operation. */
  contentType: "multipart/form-data";
}

export type GetAudioTranscriptionSimpleJsonParameters =
  GetAudioTranscriptionSimpleJsonMediaTypesParam &
    GetAudioTranscriptionSimpleJsonBodyParam &
    RequestParameters;

export interface GetAudioTranscriptionVerboseJsonBodyParam {
  body: GetAudioTranscriptionVerboseJsonFormBody;
}

export interface GetAudioTranscriptionVerboseJsonFormBody {
  file:
    | string
    | Uint8Array
    | ReadableStream<Uint8Array>
    | NodeJS.ReadableStream;
  prompt?: string;
  temperature?: number;
  language?: string;
  responseFormat?: string;
}

export interface GetAudioTranscriptionVerboseJsonMediaTypesParam {
  /** The content type for the operation. Always multipart/form-data for this operation. */
  contentType: "multipart/form-data";
}

export type GetAudioTranscriptionVerboseJsonParameters =
  GetAudioTranscriptionVerboseJsonMediaTypesParam &
    GetAudioTranscriptionVerboseJsonBodyParam &
    RequestParameters;

export interface GetAudioTranscriptionPlainTextBodyParam {
  body: GetAudioTranscriptionPlainTextFormBody;
}

export interface GetAudioTranscriptionPlainTextFormBody {
  file:
    | string
    | Uint8Array
    | ReadableStream<Uint8Array>
    | NodeJS.ReadableStream;
  prompt?: string;
  temperature?: number;
  language?: string;
  responseFormat?: string;
}

export interface GetAudioTranscriptionPlainTextMediaTypesParam {
  /** The content type for the operation. Always multipart/form-data for this operation. */
  contentType: "multipart/form-data";
}

export type GetAudioTranscriptionPlainTextParameters =
  GetAudioTranscriptionPlainTextMediaTypesParam &
    GetAudioTranscriptionPlainTextBodyParam &
    RequestParameters;

export interface GetAudioTranscriptionSrtBodyParam {
  body: GetAudioTranscriptionSrtFormBody;
}

export interface GetAudioTranscriptionSrtFormBody {
  file:
    | string
    | Uint8Array
    | ReadableStream<Uint8Array>
    | NodeJS.ReadableStream;
  prompt?: string;
  temperature?: number;
  language?: string;
  responseFormat?: string;
}

export interface GetAudioTranscriptionSrtMediaTypesParam {
  /** The content type for the operation. Always multipart/form-data for this operation. */
  contentType: "multipart/form-data";
}

export type GetAudioTranscriptionSrtParameters =
  GetAudioTranscriptionSrtMediaTypesParam &
    GetAudioTranscriptionSrtBodyParam &
    RequestParameters;

export interface GetAudioTranscriptionVttBodyParam {
  body: GetAudioTranscriptionVttFormBody;
}

export interface GetAudioTranscriptionVttFormBody {
  file:
    | string
    | Uint8Array
    | ReadableStream<Uint8Array>
    | NodeJS.ReadableStream;
  prompt?: string;
  temperature?: number;
  language?: string;
  responseFormat?: string;
}

export interface GetAudioTranscriptionVttMediaTypesParam {
  /** The content type for the operation. Always multipart/form-data for this operation. */
  contentType: "multipart/form-data";
}

export type GetAudioTranscriptionVttParameters =
  GetAudioTranscriptionVttMediaTypesParam &
    GetAudioTranscriptionVttBodyParam &
    RequestParameters;

export interface GetAudioTranslationSimpleJsonBodyParam {
  body: GetAudioTranslationSimpleJsonFormBody;
}

export interface GetAudioTranslationSimpleJsonFormBody {
  file:
    | string
    | Uint8Array
    | ReadableStream<Uint8Array>
    | NodeJS.ReadableStream;
  prompt?: string;
  temperature?: number;
  responseFormat?: string;
}

export interface GetAudioTranslationSimpleJsonMediaTypesParam {
  /** The content type for the operation. Always multipart/form-data for this operation. */
  contentType: "multipart/form-data";
}

export type GetAudioTranslationSimpleJsonParameters =
  GetAudioTranslationSimpleJsonMediaTypesParam &
    GetAudioTranslationSimpleJsonBodyParam &
    RequestParameters;

export interface GetAudioTranslationVerboseJsonBodyParam {
  body: GetAudioTranslationVerboseJsonFormBody;
}

export interface GetAudioTranslationVerboseJsonFormBody {
  file:
    | string
    | Uint8Array
    | ReadableStream<Uint8Array>
    | NodeJS.ReadableStream;
  prompt?: string;
  temperature?: number;
  responseFormat?: string;
}

export interface GetAudioTranslationVerboseJsonMediaTypesParam {
  /** The content type for the operation. Always multipart/form-data for this operation. */
  contentType: "multipart/form-data";
}

export type GetAudioTranslationVerboseJsonParameters =
  GetAudioTranslationVerboseJsonMediaTypesParam &
    GetAudioTranslationVerboseJsonBodyParam &
    RequestParameters;

export interface GetAudioTranslationPlainTextBodyParam {
  body: GetAudioTranslationPlainTextFormBody;
}

export interface GetAudioTranslationPlainTextFormBody {
  file:
    | string
    | Uint8Array
    | ReadableStream<Uint8Array>
    | NodeJS.ReadableStream;
  prompt?: string;
  temperature?: number;
  responseFormat?: string;
}

export interface GetAudioTranslationPlainTextMediaTypesParam {
  /** The content type for the operation. Always multipart/form-data for this operation. */
  contentType: "multipart/form-data";
}

export type GetAudioTranslationPlainTextParameters =
  GetAudioTranslationPlainTextMediaTypesParam &
    GetAudioTranslationPlainTextBodyParam &
    RequestParameters;

export interface GetAudioTranslationSrtBodyParam {
  body: GetAudioTranslationSrtFormBody;
}

export interface GetAudioTranslationSrtFormBody {
  file:
    | string
    | Uint8Array
    | ReadableStream<Uint8Array>
    | NodeJS.ReadableStream;
  prompt?: string;
  temperature?: number;
  responseFormat?: string;
}

export interface GetAudioTranslationSrtMediaTypesParam {
  /** The content type for the operation. Always multipart/form-data for this operation. */
  contentType: "multipart/form-data";
}

export type GetAudioTranslationSrtParameters =
  GetAudioTranslationSrtMediaTypesParam &
    GetAudioTranslationSrtBodyParam &
    RequestParameters;

export interface GetAudioTranslationVttBodyParam {
  body: GetAudioTranslationVttFormBody;
}

export interface GetAudioTranslationVttFormBody {
  file:
    | string
    | Uint8Array
    | ReadableStream<Uint8Array>
    | NodeJS.ReadableStream;
  prompt?: string;
  temperature?: number;
  responseFormat?: string;
}

export interface GetAudioTranslationVttMediaTypesParam {
  /** The content type for the operation. Always multipart/form-data for this operation. */
  contentType: "multipart/form-data";
}

export type GetAudioTranslationVttParameters =
  GetAudioTranslationVttMediaTypesParam &
    GetAudioTranslationVttBodyParam &
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

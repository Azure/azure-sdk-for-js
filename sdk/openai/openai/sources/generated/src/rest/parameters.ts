// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { RequestParameters } from "@azure-rest/core-client";
import {
  AudioTranscriptionOptionsSimpleJson,
  AudioTranscriptionOptionsVerboseJson,
  AudioTranscriptionOptionsPlainText,
  AudioTranscriptionOptionsSrt,
  AudioTranscriptionOptionsVtt,
  AudioTranslationOptionsSimpleJson,
  AudioTranslationOptionsVerboseJson,
  AudioTranslationOptionsPlainText,
  AudioTranslationOptionsSrt,
  AudioTranslationOptionsVtt,
  CompletionsOptions,
  ChatCompletionsOptions,
  EmbeddingsOptions,
  ImageGenerationOptions,
} from "./models.js";

export interface GetAudioTranscriptionSimpleJsonHeaders {
  /** The content length of the operation. This needs to be provided by the caller. */
  "content-length": number;
}

export interface GetAudioTranscriptionSimpleJsonBodyParam {
  body?: AudioTranscriptionOptionsSimpleJson;
}

export interface GetAudioTranscriptionSimpleJsonHeaderParam {
  headers: RawHttpHeadersInput & GetAudioTranscriptionSimpleJsonHeaders;
}

export interface GetAudioTranscriptionSimpleJsonMediaTypesParam {
  /**
   * The content type for the operation. Always multipart/form-data for this operation.
   * You need to set your content separtor with the boundary value hardcode here: "azure_openai"
   */
  contentType: "multipart/form-data; boundary=azure_openai";
}

export type GetAudioTranscriptionSimpleJsonParameters =
  GetAudioTranscriptionSimpleJsonHeaderParam &
    GetAudioTranscriptionSimpleJsonMediaTypesParam &
    GetAudioTranscriptionSimpleJsonBodyParam &
    RequestParameters;

export interface GetAudioTranscriptionVerboseJsonHeaders {
  /** The content length of the operation. This needs to be provided by the caller. */
  "content-length": number;
}

export interface GetAudioTranscriptionVerboseJsonBodyParam {
  body?: AudioTranscriptionOptionsVerboseJson;
}

export interface GetAudioTranscriptionVerboseJsonHeaderParam {
  headers: RawHttpHeadersInput & GetAudioTranscriptionVerboseJsonHeaders;
}

export interface GetAudioTranscriptionVerboseJsonMediaTypesParam {
  /**
   * The content type for the operation. Always multipart/form-data for this operation.
   * You need to set your content separtor with the boundary value hardcode here: "azure_openai"
   */
  contentType: "multipart/form-data; boundary=azure_openai";
}

export type GetAudioTranscriptionVerboseJsonParameters =
  GetAudioTranscriptionVerboseJsonHeaderParam &
    GetAudioTranscriptionVerboseJsonMediaTypesParam &
    GetAudioTranscriptionVerboseJsonBodyParam &
    RequestParameters;

export interface GetAudioTranscriptionPlainTextHeaders {
  /** The content length of the operation. This needs to be provided by the caller. */
  "content-length": number;
}

export interface GetAudioTranscriptionPlainTextBodyParam {
  body?: AudioTranscriptionOptionsPlainText;
}

export interface GetAudioTranscriptionPlainTextHeaderParam {
  headers: RawHttpHeadersInput & GetAudioTranscriptionPlainTextHeaders;
}

export interface GetAudioTranscriptionPlainTextMediaTypesParam {
  /**
   * The content type for the operation. Always multipart/form-data for this operation.
   * You need to set your content separtor with the boundary value hardcode here: "azure_openai"
   */
  contentType: "multipart/form-data; boundary=azure_openai";
}

export type GetAudioTranscriptionPlainTextParameters =
  GetAudioTranscriptionPlainTextHeaderParam &
    GetAudioTranscriptionPlainTextMediaTypesParam &
    GetAudioTranscriptionPlainTextBodyParam &
    RequestParameters;

export interface GetAudioTranscriptionSrtHeaders {
  /** The content length of the operation. This needs to be provided by the caller. */
  "content-length": number;
}

export interface GetAudioTranscriptionSrtBodyParam {
  body?: AudioTranscriptionOptionsSrt;
}

export interface GetAudioTranscriptionSrtHeaderParam {
  headers: RawHttpHeadersInput & GetAudioTranscriptionSrtHeaders;
}

export interface GetAudioTranscriptionSrtMediaTypesParam {
  /**
   * The content type for the operation. Always multipart/form-data for this operation.
   * You need to set your content separtor with the boundary value hardcode here: "azure_openai"
   */
  contentType: "multipart/form-data; boundary=azure_openai";
}

export type GetAudioTranscriptionSrtParameters =
  GetAudioTranscriptionSrtHeaderParam &
    GetAudioTranscriptionSrtMediaTypesParam &
    GetAudioTranscriptionSrtBodyParam &
    RequestParameters;

export interface GetAudioTranscriptionVttHeaders {
  /** The content length of the operation. This needs to be provided by the caller. */
  "content-length": number;
}

export interface GetAudioTranscriptionVttBodyParam {
  body?: AudioTranscriptionOptionsVtt;
}

export interface GetAudioTranscriptionVttHeaderParam {
  headers: RawHttpHeadersInput & GetAudioTranscriptionVttHeaders;
}

export interface GetAudioTranscriptionVttMediaTypesParam {
  /**
   * The content type for the operation. Always multipart/form-data for this operation.
   * You need to set your content separtor with the boundary value hardcode here: "azure_openai"
   */
  contentType: "multipart/form-data; boundary=azure_openai";
}

export type GetAudioTranscriptionVttParameters =
  GetAudioTranscriptionVttHeaderParam &
    GetAudioTranscriptionVttMediaTypesParam &
    GetAudioTranscriptionVttBodyParam &
    RequestParameters;

export interface GetAudioTranslationSimpleJsonHeaders {
  /** The content length of the operation. This needs to be provided by the caller. */
  "content-length": number;
}

export interface GetAudioTranslationSimpleJsonBodyParam {
  body?: AudioTranslationOptionsSimpleJson;
}

export interface GetAudioTranslationSimpleJsonHeaderParam {
  headers: RawHttpHeadersInput & GetAudioTranslationSimpleJsonHeaders;
}

export interface GetAudioTranslationSimpleJsonMediaTypesParam {
  /**
   * The content type for the operation. Always multipart/form-data for this operation.
   * You need to set your content separtor with the boundary value hardcode here: "azure_openai"
   */
  contentType: "multipart/form-data; boundary=azure_openai";
}

export type GetAudioTranslationSimpleJsonParameters =
  GetAudioTranslationSimpleJsonHeaderParam &
    GetAudioTranslationSimpleJsonMediaTypesParam &
    GetAudioTranslationSimpleJsonBodyParam &
    RequestParameters;

export interface GetAudioTranslationVerboseJsonHeaders {
  /** The content length of the operation. This needs to be provided by the caller. */
  "content-length": number;
}

export interface GetAudioTranslationVerboseJsonBodyParam {
  body?: AudioTranslationOptionsVerboseJson;
}

export interface GetAudioTranslationVerboseJsonHeaderParam {
  headers: RawHttpHeadersInput & GetAudioTranslationVerboseJsonHeaders;
}

export interface GetAudioTranslationVerboseJsonMediaTypesParam {
  /**
   * The content type for the operation. Always multipart/form-data for this operation.
   * You need to set your content separtor with the boundary value hardcode here: "azure_openai"
   */
  contentType: "multipart/form-data; boundary=azure_openai";
}

export type GetAudioTranslationVerboseJsonParameters =
  GetAudioTranslationVerboseJsonHeaderParam &
    GetAudioTranslationVerboseJsonMediaTypesParam &
    GetAudioTranslationVerboseJsonBodyParam &
    RequestParameters;

export interface GetAudioTranslationPlainTextHeaders {
  /** The content length of the operation. This needs to be provided by the caller. */
  "content-length": number;
}

export interface GetAudioTranslationPlainTextBodyParam {
  body?: AudioTranslationOptionsPlainText;
}

export interface GetAudioTranslationPlainTextHeaderParam {
  headers: RawHttpHeadersInput & GetAudioTranslationPlainTextHeaders;
}

export interface GetAudioTranslationPlainTextMediaTypesParam {
  /**
   * The content type for the operation. Always multipart/form-data for this operation.
   * You need to set your content separtor with the boundary value hardcode here: "azure_openai"
   */
  contentType: "multipart/form-data; boundary=azure_openai";
}

export type GetAudioTranslationPlainTextParameters =
  GetAudioTranslationPlainTextHeaderParam &
    GetAudioTranslationPlainTextMediaTypesParam &
    GetAudioTranslationPlainTextBodyParam &
    RequestParameters;

export interface GetAudioTranslationSrtHeaders {
  /** The content length of the operation. This needs to be provided by the caller. */
  "content-length": number;
}

export interface GetAudioTranslationSrtBodyParam {
  body?: AudioTranslationOptionsSrt;
}

export interface GetAudioTranslationSrtHeaderParam {
  headers: RawHttpHeadersInput & GetAudioTranslationSrtHeaders;
}

export interface GetAudioTranslationSrtMediaTypesParam {
  /**
   * The content type for the operation. Always multipart/form-data for this operation.
   * You need to set your content separtor with the boundary value hardcode here: "azure_openai"
   */
  contentType: "multipart/form-data; boundary=azure_openai";
}

export type GetAudioTranslationSrtParameters =
  GetAudioTranslationSrtHeaderParam &
    GetAudioTranslationSrtMediaTypesParam &
    GetAudioTranslationSrtBodyParam &
    RequestParameters;

export interface GetAudioTranslationVttHeaders {
  /** The content length of the operation. This needs to be provided by the caller. */
  "content-length": number;
}

export interface GetAudioTranslationVttBodyParam {
  body?: AudioTranslationOptionsVtt;
}

export interface GetAudioTranslationVttHeaderParam {
  headers: RawHttpHeadersInput & GetAudioTranslationVttHeaders;
}

export interface GetAudioTranslationVttMediaTypesParam {
  /**
   * The content type for the operation. Always multipart/form-data for this operation.
   * You need to set your content separtor with the boundary value hardcode here: "azure_openai"
   */
  contentType: "multipart/form-data; boundary=azure_openai";
}

export type GetAudioTranslationVttParameters =
  GetAudioTranslationVttHeaderParam &
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

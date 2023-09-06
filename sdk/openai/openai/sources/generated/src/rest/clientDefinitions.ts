// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetAudioTranscriptionSimpleJsonParameters,
  GetAudioTranscriptionVerboseJsonParameters,
  GetAudioTranscriptionPlainTextParameters,
  GetAudioTranscriptionSrtParameters,
  GetAudioTranscriptionVttParameters,
  GetAudioTranslationSimpleJsonParameters,
  GetAudioTranslationVerboseJsonParameters,
  GetAudioTranslationPlainTextParameters,
  GetAudioTranslationSrtParameters,
  GetAudioTranslationVttParameters,
  GetCompletionsParameters,
  GetChatCompletionsParameters,
  GetChatCompletionsWithAzureExtensionsParameters,
  GetEmbeddingsParameters,
  GetAzureBatchImageGenerationOperationStatusParameters,
  BeginAzureBatchImageGenerationParameters,
} from "./parameters.js";
import {
  GetAudioTranscriptionSimpleJson200Response,
  GetAudioTranscriptionSimpleJsonDefaultResponse,
  GetAudioTranscriptionVerboseJson200Response,
  GetAudioTranscriptionVerboseJsonDefaultResponse,
  GetAudioTranscriptionPlainText200Response,
  GetAudioTranscriptionPlainTextDefaultResponse,
  GetAudioTranscriptionSrt200Response,
  GetAudioTranscriptionSrtDefaultResponse,
  GetAudioTranscriptionVtt200Response,
  GetAudioTranscriptionVttDefaultResponse,
  GetAudioTranslationSimpleJson200Response,
  GetAudioTranslationSimpleJsonDefaultResponse,
  GetAudioTranslationVerboseJson200Response,
  GetAudioTranslationVerboseJsonDefaultResponse,
  GetAudioTranslationPlainText200Response,
  GetAudioTranslationPlainTextDefaultResponse,
  GetAudioTranslationSrt200Response,
  GetAudioTranslationSrtDefaultResponse,
  GetAudioTranslationVtt200Response,
  GetAudioTranslationVttDefaultResponse,
  GetCompletions200Response,
  GetCompletionsDefaultResponse,
  GetChatCompletions200Response,
  GetChatCompletionsDefaultResponse,
  GetChatCompletionsWithAzureExtensions200Response,
  GetChatCompletionsWithAzureExtensionsDefaultResponse,
  GetEmbeddings200Response,
  GetEmbeddingsDefaultResponse,
  GetAzureBatchImageGenerationOperationStatus200Response,
  GetAzureBatchImageGenerationOperationStatusDefaultResponse,
  BeginAzureBatchImageGeneration202Response,
  BeginAzureBatchImageGenerationDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetAudioTranscriptionSimpleJson {
  /** Transcribes audio into the input language. */
  post(
    options: GetAudioTranscriptionSimpleJsonParameters
  ): StreamableMethod<
    | GetAudioTranscriptionSimpleJson200Response
    | GetAudioTranscriptionSimpleJsonDefaultResponse
  >;
  /** Transcribes audio into the input language. */
  post(
    options: GetAudioTranscriptionVerboseJsonParameters
  ): StreamableMethod<
    | GetAudioTranscriptionVerboseJson200Response
    | GetAudioTranscriptionVerboseJsonDefaultResponse
  >;
  /** Transcribes audio into the input language. */
  post(
    options: GetAudioTranscriptionPlainTextParameters
  ): StreamableMethod<
    | GetAudioTranscriptionPlainText200Response
    | GetAudioTranscriptionPlainTextDefaultResponse
  >;
  /** Transcribes audio into the input language. */
  post(
    options: GetAudioTranscriptionSrtParameters
  ): StreamableMethod<
    | GetAudioTranscriptionSrt200Response
    | GetAudioTranscriptionSrtDefaultResponse
  >;
  /** Transcribes audio into the input language. */
  post(
    options: GetAudioTranscriptionVttParameters
  ): StreamableMethod<
    | GetAudioTranscriptionVtt200Response
    | GetAudioTranscriptionVttDefaultResponse
  >;
}

export interface GetAudioTranslationSimpleJson {
  /** Transcribes and translates input audio into English text. */
  post(
    options: GetAudioTranslationSimpleJsonParameters
  ): StreamableMethod<
    | GetAudioTranslationSimpleJson200Response
    | GetAudioTranslationSimpleJsonDefaultResponse
  >;
  /** Transcribes and translates input audio into English text. */
  post(
    options: GetAudioTranslationVerboseJsonParameters
  ): StreamableMethod<
    | GetAudioTranslationVerboseJson200Response
    | GetAudioTranslationVerboseJsonDefaultResponse
  >;
  /** Transcribes and translates input audio into English text. */
  post(
    options: GetAudioTranslationPlainTextParameters
  ): StreamableMethod<
    | GetAudioTranslationPlainText200Response
    | GetAudioTranslationPlainTextDefaultResponse
  >;
  /** Transcribes and translates input audio into English text. */
  post(
    options: GetAudioTranslationSrtParameters
  ): StreamableMethod<
    GetAudioTranslationSrt200Response | GetAudioTranslationSrtDefaultResponse
  >;
  /** Transcribes and translates input audio into English text. */
  post(
    options: GetAudioTranslationVttParameters
  ): StreamableMethod<
    GetAudioTranslationVtt200Response | GetAudioTranslationVttDefaultResponse
  >;
}

export interface GetCompletions {
  /**
   * Gets completions for the provided input prompts.
   * Completions support a wide variety of tasks and generate text that continues from or "completes"
   * provided prompt data.
   */
  post(
    options?: GetCompletionsParameters
  ): StreamableMethod<
    GetCompletions200Response | GetCompletionsDefaultResponse
  >;
}

export interface GetChatCompletions {
  /**
   * Gets chat completions for the provided chat messages.
   * Completions support a wide variety of tasks and generate text that continues from or "completes"
   * provided prompt data.
   */
  post(
    options?: GetChatCompletionsParameters
  ): StreamableMethod<
    GetChatCompletions200Response | GetChatCompletionsDefaultResponse
  >;
}

export interface GetChatCompletionsWithAzureExtensions {
  /**
   * Gets chat completions for the provided chat messages.
   * This is an Azure-specific version of chat completions that supports integration with configured data sources and
   * other augmentations to the base chat completions capabilities.
   */
  post(
    options?: GetChatCompletionsWithAzureExtensionsParameters
  ): StreamableMethod<
    | GetChatCompletionsWithAzureExtensions200Response
    | GetChatCompletionsWithAzureExtensionsDefaultResponse
  >;
}

export interface GetEmbeddings {
  /** Return the embeddings for a given prompt. */
  post(
    options?: GetEmbeddingsParameters
  ): StreamableMethod<GetEmbeddings200Response | GetEmbeddingsDefaultResponse>;
}

export interface GetAzureBatchImageGenerationOperationStatus {
  /** Returns the status of the images operation */
  get(
    options?: GetAzureBatchImageGenerationOperationStatusParameters
  ): StreamableMethod<
    | GetAzureBatchImageGenerationOperationStatus200Response
    | GetAzureBatchImageGenerationOperationStatusDefaultResponse
  >;
}

export interface BeginAzureBatchImageGeneration {
  /** Starts the generation of a batch of images from a text caption */
  post(
    options?: BeginAzureBatchImageGenerationParameters
  ): StreamableMethod<
    | BeginAzureBatchImageGeneration202Response
    | BeginAzureBatchImageGenerationDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/deployments/\{deploymentId\}/audio/transcriptions' has methods for the following verbs: post */
  (
    path: "/deployments/{deploymentId}/audio/transcriptions",
    deploymentId: string
  ): GetAudioTranscriptionSimpleJson;
  /** Resource for '/deployments/\{deploymentId\}/audio/translations' has methods for the following verbs: post */
  (
    path: "/deployments/{deploymentId}/audio/translations",
    deploymentId: string
  ): GetAudioTranslationSimpleJson;
  /** Resource for '/deployments/\{deploymentId\}/completions' has methods for the following verbs: post */
  (
    path: "/deployments/{deploymentId}/completions",
    deploymentId: string
  ): GetCompletions;
  /** Resource for '/deployments/\{deploymentId\}/chat/completions' has methods for the following verbs: post */
  (
    path: "/deployments/{deploymentId}/chat/completions",
    deploymentId: string
  ): GetChatCompletions;
  /** Resource for '/deployments/\{deploymentId\}/extensions/chat/completions' has methods for the following verbs: post */
  (
    path: "/deployments/{deploymentId}/extensions/chat/completions",
    deploymentId: string
  ): GetChatCompletionsWithAzureExtensions;
  /** Resource for '/deployments/\{deploymentId\}/embeddings' has methods for the following verbs: post */
  (
    path: "/deployments/{deploymentId}/embeddings",
    deploymentId: string
  ): GetEmbeddings;
  /** Resource for '/operations/images/\{operationId\}' has methods for the following verbs: get */
  (
    path: "/operations/images/{operationId}",
    operationId: string
  ): GetAzureBatchImageGenerationOperationStatus;
  /** Resource for '/images/generations:submit' has methods for the following verbs: post */
  (path: "/images/generations:submit"): BeginAzureBatchImageGeneration;
}

export type OpenAIContext = Client & {
  path: Routes;
};

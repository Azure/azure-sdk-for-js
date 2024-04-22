// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetAudioTranscriptionAsPlainTextParameters,
  GetAudioTranscriptionAsResponseObjectParameters,
  GetAudioTranslationAsPlainTextParameters,
  GetAudioTranslationAsResponseObjectParameters,
  GetCompletionsParameters,
  GetChatCompletionsParameters,
  GetImageGenerationsParameters,
  GetEmbeddingsParameters,
} from "./parameters.js";
import {
  GetAudioTranscriptionAsPlainText200Response,
  GetAudioTranscriptionAsPlainTextDefaultResponse,
  GetAudioTranscriptionAsResponseObject200Response,
  GetAudioTranscriptionAsResponseObjectDefaultResponse,
  GetAudioTranslationAsPlainText200Response,
  GetAudioTranslationAsPlainTextDefaultResponse,
  GetAudioTranslationAsResponseObject200Response,
  GetAudioTranslationAsResponseObjectDefaultResponse,
  GetCompletions200Response,
  GetCompletionsDefaultResponse,
  GetChatCompletions200Response,
  GetChatCompletionsDefaultResponse,
  GetImageGenerations200Response,
  GetImageGenerationsDefaultResponse,
  GetEmbeddings200Response,
  GetEmbeddingsDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetAudioTranscriptionAsPlainText {
  /**
   * Gets transcribed text and associated metadata from provided spoken audio data. Audio will be transcribed in the
   * written language corresponding to the language it was spoken in.
   */
  post(
    options: GetAudioTranscriptionAsPlainTextParameters,
  ): StreamableMethod<
    GetAudioTranscriptionAsPlainText200Response | GetAudioTranscriptionAsPlainTextDefaultResponse
  >;
  /**
   * Gets transcribed text and associated metadata from provided spoken audio data. Audio will be transcribed in the
   * written language corresponding to the language it was spoken in.
   */
  post(
    options: GetAudioTranscriptionAsResponseObjectParameters,
  ): StreamableMethod<
    | GetAudioTranscriptionAsResponseObject200Response
    | GetAudioTranscriptionAsResponseObjectDefaultResponse
  >;
}

export interface GetAudioTranslationAsPlainText {
  /** Gets English language transcribed text and associated metadata from provided spoken audio data. */
  post(
    options: GetAudioTranslationAsPlainTextParameters,
  ): StreamableMethod<
    GetAudioTranslationAsPlainText200Response | GetAudioTranslationAsPlainTextDefaultResponse
  >;
  /** Gets English language transcribed text and associated metadata from provided spoken audio data. */
  post(
    options: GetAudioTranslationAsResponseObjectParameters,
  ): StreamableMethod<
    | GetAudioTranslationAsResponseObject200Response
    | GetAudioTranslationAsResponseObjectDefaultResponse
  >;
}

export interface GetCompletions {
  /**
   * Gets completions for the provided input prompts.
   * Completions support a wide variety of tasks and generate text that continues from or "completes"
   * provided prompt data.
   */
  post(
    options?: GetCompletionsParameters,
  ): StreamableMethod<GetCompletions200Response | GetCompletionsDefaultResponse>;
}

export interface GetChatCompletions {
  /**
   * Gets chat completions for the provided chat messages.
   * Completions support a wide variety of tasks and generate text that continues from or "completes"
   * provided prompt data.
   */
  post(
    options?: GetChatCompletionsParameters,
  ): StreamableMethod<GetChatCompletions200Response | GetChatCompletionsDefaultResponse>;
}

export interface GetImageGenerations {
  /** Creates an image given a prompt. */
  post(
    options?: GetImageGenerationsParameters,
  ): StreamableMethod<GetImageGenerations200Response | GetImageGenerationsDefaultResponse>;
}

export interface GetEmbeddings {
  /** Return the embeddings for a given prompt. */
  post(
    options?: GetEmbeddingsParameters,
  ): StreamableMethod<GetEmbeddings200Response | GetEmbeddingsDefaultResponse>;
}

export interface Routes {
  /** Resource for '/deployments/\{deploymentId\}/audio/transcriptions' has methods for the following verbs: post */
  (
    path: "/deployments/{deploymentId}/audio/transcriptions",
    deploymentId: string,
  ): GetAudioTranscriptionAsPlainText;
  /** Resource for '/deployments/\{deploymentId\}/audio/translations' has methods for the following verbs: post */
  (
    path: "/deployments/{deploymentId}/audio/translations",
    deploymentId: string,
  ): GetAudioTranslationAsPlainText;
  /** Resource for '/deployments/\{deploymentId\}/completions' has methods for the following verbs: post */
  (path: "/deployments/{deploymentId}/completions", deploymentId: string): GetCompletions;
  /** Resource for '/deployments/\{deploymentId\}/chat/completions' has methods for the following verbs: post */
  (path: "/deployments/{deploymentId}/chat/completions", deploymentId: string): GetChatCompletions;
  /** Resource for '/deployments/\{deploymentId\}/images/generations' has methods for the following verbs: post */
  (
    path: "/deployments/{deploymentId}/images/generations",
    deploymentId: string,
  ): GetImageGenerations;
  /** Resource for '/deployments/\{deploymentId\}/embeddings' has methods for the following verbs: post */
  (path: "/deployments/{deploymentId}/embeddings", deploymentId: string): GetEmbeddings;
}

export type OpenAIContext = Client & {
  path: Routes;
};

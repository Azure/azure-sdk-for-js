// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OpenAIContext } from "../../../api/OpenAIContext.js";
import {
  AudioTranscriptionOptions,
  AudioTranscription,
  AudioTranslationOptions,
  AudioTranslation,
  CompletionsOptions,
  Completions,
  ChatCompletionsOptions,
  ChatCompletions,
  ImageGenerationOptions,
  ImageGenerations,
  EmbeddingsOptions,
  Embeddings,
} from "../../../models/models.js";
import {
  getAudioTranscriptionAsPlainText,
  getAudioTranscriptionAsResponseObject,
  getAudioTranslationAsPlainText,
  getAudioTranslationAsResponseObject,
  getCompletions,
  getChatCompletions,
  getChatCompletionsWithAzureExtensions,
  getImageGenerations,
  getEmbeddings,
} from "../../../api/client/openAIClient/index.js";
import {
  ClientOpenAIClientGetAudioTranscriptionAsPlainTextOptions,
  ClientOpenAIClientGetAudioTranscriptionAsResponseObjectOptions,
  ClientOpenAIClientGetAudioTranslationAsPlainTextOptions,
  ClientOpenAIClientGetAudioTranslationAsResponseObjectOptions,
  ClientOpenAIClientGetCompletionsOptions,
  ClientOpenAIClientGetChatCompletionsOptions,
  ClientOpenAIClientGetChatCompletionsWithAzureExtensionsOptions,
  ClientOpenAIClientGetImageGenerationsOptions,
  ClientOpenAIClientGetEmbeddingsOptions,
} from "../../../models/options.js";

export interface ClientOpenAIClientOperations {
  getAudioTranscriptionAsPlainText: (
    deploymentId: string,
    body: AudioTranscriptionOptions,
    options?: ClientOpenAIClientGetAudioTranscriptionAsPlainTextOptions
  ) => Promise<string>;
  getAudioTranscriptionAsResponseObject: (
    deploymentId: string,
    body: AudioTranscriptionOptions,
    options?: ClientOpenAIClientGetAudioTranscriptionAsResponseObjectOptions
  ) => Promise<AudioTranscription>;
  getAudioTranslationAsPlainText: (
    deploymentId: string,
    body: AudioTranslationOptions,
    options?: ClientOpenAIClientGetAudioTranslationAsPlainTextOptions
  ) => Promise<string>;
  getAudioTranslationAsResponseObject: (
    deploymentId: string,
    body: AudioTranslationOptions,
    options?: ClientOpenAIClientGetAudioTranslationAsResponseObjectOptions
  ) => Promise<AudioTranslation>;
  getCompletions: (
    deploymentId: string,
    body: CompletionsOptions,
    options?: ClientOpenAIClientGetCompletionsOptions
  ) => Promise<Completions>;
  getChatCompletions: (
    deploymentId: string,
    body: ChatCompletionsOptions,
    options?: ClientOpenAIClientGetChatCompletionsOptions
  ) => Promise<ChatCompletions>;
  getChatCompletionsWithAzureExtensions: (
    deploymentId: string,
    body: ChatCompletionsOptions,
    options?: ClientOpenAIClientGetChatCompletionsWithAzureExtensionsOptions
  ) => Promise<ChatCompletions>;
  getImageGenerations: (
    deploymentId: string,
    body: ImageGenerationOptions,
    options?: ClientOpenAIClientGetImageGenerationsOptions
  ) => Promise<ImageGenerations>;
  getEmbeddings: (
    deploymentId: string,
    body: EmbeddingsOptions,
    options?: ClientOpenAIClientGetEmbeddingsOptions
  ) => Promise<Embeddings>;
}

export function getClientOpenAIClient(context: OpenAIContext) {
  return {
    getAudioTranscriptionAsPlainText: (
      deploymentId: string,
      body: AudioTranscriptionOptions,
      options?: ClientOpenAIClientGetAudioTranscriptionAsPlainTextOptions
    ) => getAudioTranscriptionAsPlainText(context, deploymentId, body, options),
    getAudioTranscriptionAsResponseObject: (
      deploymentId: string,
      body: AudioTranscriptionOptions,
      options?: ClientOpenAIClientGetAudioTranscriptionAsResponseObjectOptions
    ) =>
      getAudioTranscriptionAsResponseObject(
        context,
        deploymentId,
        body,
        options
      ),
    getAudioTranslationAsPlainText: (
      deploymentId: string,
      body: AudioTranslationOptions,
      options?: ClientOpenAIClientGetAudioTranslationAsPlainTextOptions
    ) => getAudioTranslationAsPlainText(context, deploymentId, body, options),
    getAudioTranslationAsResponseObject: (
      deploymentId: string,
      body: AudioTranslationOptions,
      options?: ClientOpenAIClientGetAudioTranslationAsResponseObjectOptions
    ) =>
      getAudioTranslationAsResponseObject(context, deploymentId, body, options),
    getCompletions: (
      deploymentId: string,
      body: CompletionsOptions,
      options?: ClientOpenAIClientGetCompletionsOptions
    ) => getCompletions(context, deploymentId, body, options),
    getChatCompletions: (
      deploymentId: string,
      body: ChatCompletionsOptions,
      options?: ClientOpenAIClientGetChatCompletionsOptions
    ) => getChatCompletions(context, deploymentId, body, options),
    getChatCompletionsWithAzureExtensions: (
      deploymentId: string,
      body: ChatCompletionsOptions,
      options?: ClientOpenAIClientGetChatCompletionsWithAzureExtensionsOptions
    ) =>
      getChatCompletionsWithAzureExtensions(
        context,
        deploymentId,
        body,
        options
      ),
    getImageGenerations: (
      deploymentId: string,
      body: ImageGenerationOptions,
      options?: ClientOpenAIClientGetImageGenerationsOptions
    ) => getImageGenerations(context, deploymentId, body, options),
    getEmbeddings: (
      deploymentId: string,
      body: EmbeddingsOptions,
      options?: ClientOpenAIClientGetEmbeddingsOptions
    ) => getEmbeddings(context, deploymentId, body, options),
  };
}

export function getClientOpenAIClientOperations(
  context: OpenAIContext
): ClientOpenAIClientOperations {
  return {
    ...getClientOpenAIClient(context),
  };
}

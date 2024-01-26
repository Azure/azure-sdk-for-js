// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";
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
} from "./models/models.js";
import {
  GetAudioTranscriptionAsPlainTextOptions,
  GetAudioTranscriptionAsResponseObjectOptions,
  GetAudioTranslationAsPlainTextOptions,
  GetAudioTranslationAsResponseObjectOptions,
  GetCompletionsOptions,
  GetChatCompletionsOptions,
  GetChatCompletionsWithAzureExtensionsOptions,
  GetImageGenerationsOptions,
  GetEmbeddingsOptions,
} from "./models/options.js";
import {
  createOpenAI,
  OpenAIClientOptions,
  OpenAIContext,
  getAudioTranscriptionAsPlainText,
  getAudioTranscriptionAsResponseObject,
  getAudioTranslationAsPlainText,
  getAudioTranslationAsResponseObject,
  getCompletions,
  getChatCompletions,
  getChatCompletionsWithAzureExtensions,
  getImageGenerations,
  getEmbeddings,
} from "./api/index.js";

export { OpenAIClientOptions } from "./api/OpenAIContext.js";

export class OpenAIClient {
  private _client: OpenAIContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options: OpenAIClientOptions = {},
  ) {
    this._client = createOpenAI(endpoint, credential, options);
    this.pipeline = this._client.pipeline;
  }

  /**
   * Gets transcribed text and associated metadata from provided spoken audio data. Audio will be transcribed in the
   * written language corresponding to the language it was spoken in.
   */
  getAudioTranscriptionAsPlainText(
    deploymentId: string,
    body: AudioTranscriptionOptions,
    options: GetAudioTranscriptionAsPlainTextOptions = { requestOptions: {} },
  ): Promise<string> {
    return getAudioTranscriptionAsPlainText(
      this._client,
      deploymentId,
      body,
      options,
    );
  }

  /**
   * Gets transcribed text and associated metadata from provided spoken audio data. Audio will be transcribed in the
   * written language corresponding to the language it was spoken in.
   */
  getAudioTranscriptionAsResponseObject(
    deploymentId: string,
    body: AudioTranscriptionOptions,
    options: GetAudioTranscriptionAsResponseObjectOptions = {
      requestOptions: {},
    },
  ): Promise<AudioTranscription> {
    return getAudioTranscriptionAsResponseObject(
      this._client,
      deploymentId,
      body,
      options,
    );
  }

  /** Gets English language transcribed text and associated metadata from provided spoken audio data. */
  getAudioTranslationAsPlainText(
    deploymentId: string,
    body: AudioTranslationOptions,
    options: GetAudioTranslationAsPlainTextOptions = { requestOptions: {} },
  ): Promise<string> {
    return getAudioTranslationAsPlainText(
      this._client,
      deploymentId,
      body,
      options,
    );
  }

  /** Gets English language transcribed text and associated metadata from provided spoken audio data. */
  getAudioTranslationAsResponseObject(
    deploymentId: string,
    body: AudioTranslationOptions,
    options: GetAudioTranslationAsResponseObjectOptions = {
      requestOptions: {},
    },
  ): Promise<AudioTranslation> {
    return getAudioTranslationAsResponseObject(
      this._client,
      deploymentId,
      body,
      options,
    );
  }

  /**
   * Gets completions for the provided input prompts.
   * Completions support a wide variety of tasks and generate text that continues from or "completes"
   * provided prompt data.
   */
  getCompletions(
    deploymentId: string,
    body: CompletionsOptions,
    options: GetCompletionsOptions = { requestOptions: {} },
  ): Promise<Completions> {
    return getCompletions(this._client, deploymentId, body, options);
  }

  /**
   * Gets chat completions for the provided chat messages.
   * Completions support a wide variety of tasks and generate text that continues from or "completes"
   * provided prompt data.
   */
  getChatCompletions(
    deploymentId: string,
    body: ChatCompletionsOptions,
    options: GetChatCompletionsOptions = { requestOptions: {} },
  ): Promise<ChatCompletions> {
    return getChatCompletions(this._client, deploymentId, body, options);
  }

  /**
   * Gets chat completions for the provided chat messages.
   * This is an Azure-specific version of chat completions that supports integration with configured data sources and
   * other augmentations to the base chat completions capabilities.
   */
  getChatCompletionsWithAzureExtensions(
    deploymentId: string,
    body: ChatCompletionsOptions,
    options: GetChatCompletionsWithAzureExtensionsOptions = {
      requestOptions: {},
    },
  ): Promise<ChatCompletions> {
    return getChatCompletionsWithAzureExtensions(
      this._client,
      deploymentId,
      body,
      options,
    );
  }

  /** Creates an image given a prompt. */
  getImageGenerations(
    deploymentId: string,
    body: ImageGenerationOptions,
    options: GetImageGenerationsOptions = { requestOptions: {} },
  ): Promise<ImageGenerations> {
    return getImageGenerations(this._client, deploymentId, body, options);
  }

  /** Return the embeddings for a given prompt. */
  getEmbeddings(
    deploymentId: string,
    body: EmbeddingsOptions,
    options: GetEmbeddingsOptions = { requestOptions: {} },
  ): Promise<Embeddings> {
    return getEmbeddings(this._client, deploymentId, body, options);
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, KeyCredential } from "@azure/core-auth";
import {
  AudioTranscriptionSimpleJson,
  AudioTranscriptionVerboseJson,
  Completions,
  ChatMessage,
  ChatCompletions,
  Embeddings,
  BatchImageGenerationOperationResponse,
} from "./models/models.js";
import {
  GetAudioTranscriptionSimpleJsonOptions,
  GetAudioTranscriptionVerboseJsonOptions,
  GetAudioTranscriptionPlainTextOptions,
  GetAudioTranscriptionSrtOptions,
  GetAudioTranscriptionVttOptions,
  GetAudioTranslationSimpleJsonOptions,
  GetAudioTranslationVerboseJsonOptions,
  GetAudioTranslationPlainTextOptions,
  GetAudioTranslationSrtOptions,
  GetAudioTranslationVttOptions,
  GetCompletionsOptions,
  GetChatCompletionsOptions,
  GetChatCompletionsWithAzureExtensionsOptions,
  GetEmbeddingsOptions,
  GetAzureBatchImageGenerationOperationStatusOptions,
  BeginAzureBatchImageGenerationOptions,
} from "./models/options.js";
import {
  createOpenAI,
  OpenAIClientOptions,
  OpenAIContext,
  getAudioTranscriptionSimpleJson,
  getAudioTranscriptionVerboseJson,
  getAudioTranscriptionPlainText,
  getAudioTranscriptionSrt,
  getAudioTranscriptionVtt,
  getAudioTranslationSimpleJson,
  getAudioTranslationVerboseJson,
  getAudioTranslationPlainText,
  getAudioTranslationSrt,
  getAudioTranslationVtt,
  getCompletions,
  getChatCompletions,
  getChatCompletionsWithAzureExtensions,
  getEmbeddings,
  getAzureBatchImageGenerationOperationStatus,
  beginAzureBatchImageGeneration,
} from "./api/index.js";

export { OpenAIClientOptions } from "./api/OpenAIContext.js";

export class OpenAIClient {
  private _client: OpenAIContext;

  /** Azure OpenAI APIs for completions and search */
  constructor(
    endpoint: string,
    credential: KeyCredential | TokenCredential,
    options: OpenAIClientOptions = {}
  ) {
    this._client = createOpenAI(endpoint, credential, options);
  }

  /** Transcribes audio into the input language. */
  getAudioTranscriptionSimpleJson(
    file: Uint8Array,
    deploymentId: string,
    options: GetAudioTranscriptionSimpleJsonOptions = { requestOptions: {} }
  ): Promise<AudioTranscriptionSimpleJson> {
    return getAudioTranscriptionSimpleJson(
      this._client,
      file,
      deploymentId,
      options
    );
  }

  /** Transcribes audio into the input language. */
  getAudioTranscriptionVerboseJson(
    file: Uint8Array,
    deploymentId: string,
    options: GetAudioTranscriptionVerboseJsonOptions = { requestOptions: {} }
  ): Promise<AudioTranscriptionVerboseJson> {
    return getAudioTranscriptionVerboseJson(
      this._client,
      file,
      deploymentId,
      options
    );
  }

  /** Transcribes audio into the input language. */
  getAudioTranscriptionPlainText(
    file: Uint8Array,
    deploymentId: string,
    options: GetAudioTranscriptionPlainTextOptions = { requestOptions: {} }
  ): Promise<string> {
    return getAudioTranscriptionPlainText(
      this._client,
      file,
      deploymentId,
      options
    );
  }

  /** Transcribes audio into the input language. */
  getAudioTranscriptionSrt(
    file: Uint8Array,
    deploymentId: string,
    options: GetAudioTranscriptionSrtOptions = { requestOptions: {} }
  ): Promise<string> {
    return getAudioTranscriptionSrt(this._client, file, deploymentId, options);
  }

  /** Transcribes audio into the input language. */
  getAudioTranscriptionVtt(
    file: Uint8Array,
    deploymentId: string,
    options: GetAudioTranscriptionVttOptions = { requestOptions: {} }
  ): Promise<string> {
    return getAudioTranscriptionVtt(this._client, file, deploymentId, options);
  }

  /** Transcribes and translates input audio into English text. */
  getAudioTranslationSimpleJson(
    file: Uint8Array,
    deploymentId: string,
    options: GetAudioTranslationSimpleJsonOptions = { requestOptions: {} }
  ): Promise<AudioTranscriptionSimpleJson> {
    return getAudioTranslationSimpleJson(
      this._client,
      file,
      deploymentId,
      options
    );
  }

  /** Transcribes and translates input audio into English text. */
  getAudioTranslationVerboseJson(
    file: Uint8Array,
    deploymentId: string,
    options: GetAudioTranslationVerboseJsonOptions = { requestOptions: {} }
  ): Promise<AudioTranscriptionVerboseJson> {
    return getAudioTranslationVerboseJson(
      this._client,
      file,
      deploymentId,
      options
    );
  }

  /** Transcribes and translates input audio into English text. */
  getAudioTranslationPlainText(
    file: Uint8Array,
    deploymentId: string,
    options: GetAudioTranslationPlainTextOptions = { requestOptions: {} }
  ): Promise<string> {
    return getAudioTranslationPlainText(
      this._client,
      file,
      deploymentId,
      options
    );
  }

  /** Transcribes and translates input audio into English text. */
  getAudioTranslationSrt(
    file: Uint8Array,
    deploymentId: string,
    options: GetAudioTranslationSrtOptions = { requestOptions: {} }
  ): Promise<string> {
    return getAudioTranslationSrt(this._client, file, deploymentId, options);
  }

  /** Transcribes and translates input audio into English text. */
  getAudioTranslationVtt(
    file: Uint8Array,
    deploymentId: string,
    options: GetAudioTranslationVttOptions = { requestOptions: {} }
  ): Promise<string> {
    return getAudioTranslationVtt(this._client, file, deploymentId, options);
  }

  /**
   * Gets completions for the provided input prompts.
   * Completions support a wide variety of tasks and generate text that continues from or "completes"
   * provided prompt data.
   */
  getCompletions(
    prompt: string[],
    deploymentId: string,
    options: GetCompletionsOptions = { requestOptions: {} }
  ): Promise<Completions> {
    return getCompletions(this._client, prompt, deploymentId, options);
  }

  /**
   * Gets chat completions for the provided chat messages.
   * Completions support a wide variety of tasks and generate text that continues from or "completes"
   * provided prompt data.
   */
  getChatCompletions(
    messages: ChatMessage[],
    deploymentId: string,
    options: GetChatCompletionsOptions = { requestOptions: {} }
  ): Promise<ChatCompletions> {
    return getChatCompletions(this._client, messages, deploymentId, options);
  }

  /**
   * Gets chat completions for the provided chat messages.
   * This is an Azure-specific version of chat completions that supports integration with configured data sources and
   * other augmentations to the base chat completions capabilities.
   */
  getChatCompletionsWithAzureExtensions(
    messages: ChatMessage[],
    deploymentId: string,
    options: GetChatCompletionsWithAzureExtensionsOptions = {
      requestOptions: {},
    }
  ): Promise<ChatCompletions> {
    return getChatCompletionsWithAzureExtensions(
      this._client,
      messages,
      deploymentId,
      options
    );
  }

  /** Return the embeddings for a given prompt. */
  getEmbeddings(
    input: string[],
    deploymentId: string,
    options: GetEmbeddingsOptions = { requestOptions: {} }
  ): Promise<Embeddings> {
    return getEmbeddings(this._client, input, deploymentId, options);
  }

  /** Returns the status of the images operation */
  getAzureBatchImageGenerationOperationStatus(
    operationId: string,
    options: GetAzureBatchImageGenerationOperationStatusOptions = {
      requestOptions: {},
    }
  ): Promise<BatchImageGenerationOperationResponse> {
    return getAzureBatchImageGenerationOperationStatus(
      this._client,
      operationId,
      options
    );
  }

  /** Starts the generation of a batch of images from a text caption */
  beginAzureBatchImageGeneration(
    prompt: string,
    options: BeginAzureBatchImageGenerationOptions = { requestOptions: {} }
  ): Promise<BatchImageGenerationOperationResponse> {
    return beginAzureBatchImageGeneration(this._client, prompt, options);
  }
}

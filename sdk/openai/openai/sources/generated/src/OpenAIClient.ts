// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, KeyCredential } from "@azure/core-auth";
import {
  Embeddings,
  Completions,
  ChatMessage,
  ChatCompletions,
  BatchImageGenerationOperationResponse,
} from "./models/models.js";
import {
  GetEmbeddingsOptions,
  GetCompletionsOptions,
  GetChatCompletionsOptions,
  GetChatCompletionsWithAzureExtensionsOptions,
  GetAzureBatchImageGenerationOperationStatusOptions,
  BeginAzureBatchImageGenerationOptions,
} from "./models/options.js";
import {
  createOpenAI,
  OpenAIClientOptions,
  OpenAIContext,
  getEmbeddings,
  getCompletions,
  getChatCompletions,
  getChatCompletionsWithAzureExtensions,
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

  /** Return the embeddings for a given prompt. */
  getEmbeddings(
    input: string[],
    deploymentId: string,
    options: GetEmbeddingsOptions = { requestOptions: {} }
  ): Promise<Embeddings> {
    return getEmbeddings(this._client, input, deploymentId, options);
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

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetEmbeddingsParameters,
  GetCompletionsParameters,
  GetChatCompletionsParameters,
  GetChatCompletionsWithAzureExtensionsParameters,
  GetAzureBatchImageGenerationOperationStatusParameters,
  BeginAzureBatchImageGenerationParameters,
} from "./parameters.js";
import {
  GetEmbeddings200Response,
  GetEmbeddingsDefaultResponse,
  GetCompletions200Response,
  GetCompletionsDefaultResponse,
  GetChatCompletions200Response,
  GetChatCompletionsDefaultResponse,
  GetChatCompletionsWithAzureExtensions200Response,
  GetChatCompletionsWithAzureExtensionsDefaultResponse,
  GetAzureBatchImageGenerationOperationStatus200Response,
  GetAzureBatchImageGenerationOperationStatusDefaultResponse,
  BeginAzureBatchImageGeneration202Response,
  BeginAzureBatchImageGenerationDefaultResponse,
} from "./responses.js";
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface GetEmbeddings {
  /** Return the embeddings for a given prompt. */
  post(
    options?: GetEmbeddingsParameters
  ): StreamableMethod<GetEmbeddings200Response | GetEmbeddingsDefaultResponse>;
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
  /** Resource for '/deployments/\{deploymentId\}/embeddings' has methods for the following verbs: post */
  (
    path: "/deployments/{deploymentId}/embeddings",
    deploymentId: string
  ): GetEmbeddings;
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

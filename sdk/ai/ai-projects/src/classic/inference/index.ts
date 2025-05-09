// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  GetChatCompletions,
  GetEmbeddings,
  GetImageEmbeddings,
  ModelClientOptions,
} from "@azure-rest/ai-inference";
import type { AzureOpenAI } from "openai";
import {
  _getChatCompletionsClient,
  _getEmbeddingClient,
  _getImageEmbeddingClient,
  _getAzureOpenAIClient,
} from "../../api/inference/operations.js";
import type { AIProjectContext } from "../../api/aiProjectContext.js";
import type { ConnectionsOperations } from "../connections/index.js";
import type { AzureOpenAIClientOptions } from "../../api/inference/options.js";

/** Inference operations interface for AI projects. */
export interface InferenceOperations {
  /** Get chat completions client for making chat completion requests. */
  chatCompletions: (options?: ModelClientOptions) => GetChatCompletions;
  /** Get embeddings client for making embedding requests. */
  embeddings: (options?: ModelClientOptions) => GetEmbeddings;
  /** Get image embeddings client for making image embedding requests. */
  imageEmbeddings: (options?: ModelClientOptions) => GetImageEmbeddings;
  /** Get Azure OpenAI client for making Azure OpenAI requests. */
  azureOpenAI: (options?: AzureOpenAIClientOptions) => Promise<AzureOpenAI>;
}

function _getInference(
  context: AIProjectContext,
  connections: ConnectionsOperations,
): InferenceOperations {
  return {
    chatCompletions: (options?: ModelClientOptions) => _getChatCompletionsClient(context, options),
    embeddings: (options?: ModelClientOptions) => _getEmbeddingClient(context, options),
    imageEmbeddings: (options?: ModelClientOptions) => _getImageEmbeddingClient(context, options),
    azureOpenAI: (options?: AzureOpenAIClientOptions) =>
      _getAzureOpenAIClient(context, connections, options),
  };
}

export function _getInferenceOperations(
  context: AIProjectContext,
  connections: ConnectionsOperations,
): InferenceOperations {
  return {
    ..._getInference(context, connections),
  };
}

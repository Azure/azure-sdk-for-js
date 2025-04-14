// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  GetChatCompletions,
  GetEmbeddings,
  GetImageEmbeddings,
  ModelClientOptions,
} from "@azure-rest/ai-inference";
import {
  _getChatCompletionsClient,
  _getEmbeddingClient,
  _getImageEmbeddingClient,
} from "../../api/inference/operations.js";
import type { AIProjectContext } from "../../api/aiProjectContext.js";

/** Inference operations interface for AI projects. */
export interface InferenceOperations {
  /** Get chat completions client for making chat completion requests. */
  chatCompletions: (options?: ModelClientOptions) => GetChatCompletions;
  /** Get embeddings client for making embedding requests. */
  embeddings: (options?: ModelClientOptions) => GetEmbeddings;
  /** Get image embeddings client for making image embedding requests. */
  imageEmbeddings: (options?: ModelClientOptions) => GetImageEmbeddings;
}

function _getInference(context: AIProjectContext): InferenceOperations {
  return {
    chatCompletions: (options?: ModelClientOptions) => _getChatCompletionsClient(context, options),
    embeddings: (options?: ModelClientOptions) => _getEmbeddingClient(context, options),
    imageEmbeddings: (options?: ModelClientOptions) => _getImageEmbeddingClient(context, options),
  };
}

export function _getInferenceOperations(context: AIProjectContext): InferenceOperations {
  return {
    ..._getInference(context),
  };
}

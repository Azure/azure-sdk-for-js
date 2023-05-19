// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { OpenAIClient } from "./OpenAIClient.js";
export {
  ChatChoice,
  ChatCompletions,
  ChatCompletionsOptions,
  ChatMessage,
  ChatRole,
  Choice,
  Completions,
  CompletionsFinishReason,
  CompletionsLogProbabilityModel,
  CompletionsOptions,
  CompletionsUsage,
  EmbeddingItem,
  Embeddings,
  EmbeddingsOptions,
  EmbeddingsUsage,
} from "../generated/api/models.js";
export {
  GetEmbeddingsOptions,
  GetChatCompletionsOptions,
  GetCompletionsOptions,
} from "../generated/api/operations.js";
export { ClientOptions, RequestOptions } from "../generated/common/interfaces.js";
export { OpenAIKeyCredential } from "./OpenAIKeyCredential.js";

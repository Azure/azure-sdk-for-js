// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  EmbeddingsOptions,
  Embeddings,
  EmbeddingItem,
  EmbeddingsUsage,
  CompletionsOptions,
  Completions,
  Choice,
  CompletionsLogProbabilityModel,
  CompletionsFinishReason,
  CompletionsUsage,
  ChatCompletionsOptions,
  ChatMessage,
  ChatRole,
  ChatCompletions,
  ChatChoice,
} from "./models.js";
export { createOpenAI, OpenAIContext } from "./OpenAIContext.js";
export {
  getEmbeddings,
  getCompletions,
  getChatCompletions,
  GetEmbeddingsOptions,
  GetCompletionsOptions,
  GetChatCompletionsOptions,
} from "./operations.js";

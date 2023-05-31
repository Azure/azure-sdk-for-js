// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * [Azure OpenAI](https://learn.microsoft.com/azure/cognitive-services/openai/overview)
 * provides REST API access to OpenAI's powerful language models including the GPT-3,
 * Codex and Embeddings model series. In addition, the new GPT-4 and ChatGPT (gpt-35-turbo)
 * model series have now reached general availability. These models can be easily adapted
 * to your specific task including but not limited to content generation, summarization,
 * semantic search, and natural language to code translation.
 *
 * @packageDocumentation
 */

export { AzureKeyCredential } from "@azure/core-auth";

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

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
export { OpenAIClient, OpenAIClientOptions } from "./OpenAIClient.js";
export {
  AzureChatExtensionConfiguration,
  AzureChatExtensionType,
  AzureChatExtensionsMessageContext,
  AzureOpenAIOperationState,
  BatchImageGenerationOperationResponse,
  BeginAzureBatchImageGenerationOptions,
  ChatChoice,
  ChatCompletions,
  ChatMessage,
  ChatRole,
  Choice,
  Completions,
  CompletionsFinishReason,
  CompletionsLogProbabilityModel,
  CompletionsUsage,
  ContentFilterResult,
  ContentFilterResults,
  ContentFilterSeverity,
  EmbeddingItem,
  Embeddings,
  EmbeddingsUsage,
  FunctionCall,
  FunctionCallPreset,
  FunctionDefinition,
  FunctionName,
  GetAzureBatchImageGenerationOperationStatusOptions,
  GetCompletionsOptions,
  GetEmbeddingsOptions,
  ImageGenerationResponseFormat,
  ImageGenerations,
  ImageLocation,
  ImagePayload,
  ImageSize,
  PromptFilterResult,
  ImageGenerationResponse,
} from "./models/index.js";
export { OpenAIKeyCredential } from "./OpenAIKeyCredential.js";
export {
  ImageGenerationOptions,
  AzureExtensionsOptions,
  GetChatCompletionsOptions,
} from "./api/operations.js";

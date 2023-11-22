// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** *
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
export { OpenAIKeyCredential } from "./OpenAIKeyCredential.js";
export {
  AzureExtensionsOptions,
  ContentFilterErrorResults,
  ContentFilterResults,
  ContentFilterSuccessResults,
  GetChatCompletionsOptions,
  StreamProducer,
} from "./api/models.js";
export * from "./models/audio.js";
export {
  AzureChatExtensionConfiguration,
  AzureChatExtensionType,
  AzureChatExtensionsMessageContext,
  AzureOpenAIOperationState,
  BatchImageGenerationOperationResponse,
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
  ContentFilterSeverity,
  EmbeddingItem,
  Embeddings,
  EmbeddingsUsage,
  FunctionCall,
  FunctionCallPreset,
  FunctionDefinition,
  FunctionName,
  GetCompletionsOptions,
  GetEmbeddingsOptions,
  ImageGenerationOptions,
  ImageGenerationResponseFormat,
  ImageGenerations,
  ImageLocation,
  ImagePayload,
  ImageSize,
  PromptFilterResult,
} from "./models/index.js";

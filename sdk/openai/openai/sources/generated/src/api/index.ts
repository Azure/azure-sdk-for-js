// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  createOpenAI,
  OpenAIClientOptions,
  OpenAIContext,
} from "./OpenAIContext.js";
export {
  getEmbeddings,
  getCompletions,
  getChatCompletions,
  getChatCompletionsWithAzureExtensions,
  getAzureBatchImageGenerationOperationStatus,
  beginAzureBatchImageGeneration,
} from "./operations.js";

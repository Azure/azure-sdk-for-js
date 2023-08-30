// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { getChatCompletions, listChatCompletions, listCompletions } from "./operations.js";
export {
  getEmbeddings,
  getCompletions,
  beginAzureBatchImageGeneration,
  getAzureBatchImageGenerationOperationStatus,
} from "../../generated/src/api/operations.js";
export {
  createOpenAI,
  OpenAIContext,
  OpenAIClientOptions,
} from "../../generated/src/api/OpenAIContext.js";

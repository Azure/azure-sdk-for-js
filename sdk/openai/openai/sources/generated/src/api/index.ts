// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  createOpenAI,
  OpenAIClientOptions,
  OpenAIContext,
} from "./OpenAIContext.js";
export {
  getAudioTranscriptionSimpleJson,
  getAudioTranscriptionVerboseJson,
  getAudioTranscriptionPlainText,
  getAudioTranscriptionSrt,
  getAudioTranscriptionVtt,
  getAudioTranslationSimpleJson,
  getAudioTranslationVerboseJson,
  getAudioTranslationPlainText,
  getAudioTranslationSrt,
  getAudioTranslationVtt,
  getCompletions,
  getChatCompletions,
  getChatCompletionsWithAzureExtensions,
  getEmbeddings,
  getAzureBatchImageGenerationOperationStatus,
  beginAzureBatchImageGeneration,
} from "./operations.js";

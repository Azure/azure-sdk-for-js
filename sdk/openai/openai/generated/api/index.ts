// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { createOpenAI, OpenAIClientOptions, OpenAIContext } from "./OpenAIContext.js";
export {
  getAudioTranscriptionAsPlainText,
  getAudioTranscriptionAsResponseObject,
  getAudioTranslationAsPlainText,
  getAudioTranslationAsResponseObject,
  getCompletions,
  getChatCompletions,
  getImageGenerations,
  generateSpeechFromText,
  getEmbeddings,
} from "./operations.js";

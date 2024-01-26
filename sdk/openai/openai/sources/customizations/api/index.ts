// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  getChatCompletions,
  streamChatCompletions,
  streamCompletions,
  getAudioTranscription,
  getAudioTranslation,
  getImages,
} from "./client/openAIClient/index.js";
export {
  getEmbeddings,
  getCompletions,
} from "../../generated/src/api/client/openAIClient/index.js";
export {
  createOpenAI,
  OpenAIContext,
  OpenAIClientOptions,
} from "../../generated/src/api/OpenAIContext.js";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { FileContents } from "./static-helpers/multipartHelpers.js";

export { TranscriptionClient } from "./transcriptionClient.js";
export { KnownServiceApiVersions } from "./models/index.js";
export type {
  TranscriptionOptions,
  ProfanityFilterMode,
  TranscriptionDiarizationOptions,
  EnhancedModeOptions,
  PhraseListOptions,
  TranscriptionResult,
  ChannelCombinedPhrases,
  TranscribedPhrase,
  TranscribedWord,
} from "./models/index.js";
export type { TranscriptionClientOptionalParams, TranscribeOptionalParams } from "./api/index.js";
export type { FileContents };

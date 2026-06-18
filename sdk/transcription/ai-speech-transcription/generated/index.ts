// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { FileContents } from "./static-helpers/multipartHelpers.js";
import { NodeReadableStream } from "./static-helpers/platform-types.js";

export { TranscriptionClient } from "./transcriptionClient.js";
export type {
  TranscriptionContent,
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
export { KnownServiceApiVersions } from "./models/index.js";
export type { TranscribeOptionalParams, TranscriptionClientOptionalParams } from "./api/index.js";
export type { FileContents, NodeReadableStream };
export { RestError, isRestError } from "@azure/core-rest-pipeline";

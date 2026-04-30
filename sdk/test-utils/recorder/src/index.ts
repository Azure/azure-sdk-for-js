// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { Recorder } from "./recorder.js";
export { relativeRecordingsPath } from "./utils/relativePathCalculator.js";
export {
  type SanitizerOptions,
  type RecorderStartOptions,
  isLiveMode,
  isPlaybackMode,
  isRecordMode,
  assertEnvironmentVariable,
  setEnvironmentVariables,
  testPollingOptions,
  type FindReplaceSanitizer,
  type RegexSanitizer,
  type StringSanitizer,
  type HeaderSanitizer,
  type ConnectionStringSanitizer,
  type RemoveHeaderSanitizer,
} from "./utils/utils.js";
export { delay } from "./utils/delay.js";
export { env } from "./utils/env.js";
export type { CustomMatcherOptions } from "./matcher.js";
export { type TestInfo, type VitestTestContext, isVitestTestContext } from "./testInfo.js";

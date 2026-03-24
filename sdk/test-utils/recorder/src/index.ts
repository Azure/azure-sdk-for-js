// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { Recorder } from "./recorder.js";
export { relativeRecordingsPath } from "#platform/utils/relativePathCalculator";
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
export { env } from "#platform/utils/env";
export type { CustomMatcherOptions } from "./matcher.js";
export { type TestInfo, type VitestTestContext, isVitestTestContext } from "./testInfo.js";

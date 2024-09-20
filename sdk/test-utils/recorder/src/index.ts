// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export { Recorder } from "./recorder.js";
export { relativeRecordingsPath } from "./utils/relativePathCalculator.js";
export {
  SanitizerOptions,
  RecorderStartOptions,
  isLiveMode,
  isPlaybackMode,
  isRecordMode,
  assertEnvironmentVariable,
  setEnvironmentVariables,
  testPollingOptions,
  FindReplaceSanitizer,
  RegexSanitizer,
  StringSanitizer,
  HeaderSanitizer,
  ConnectionStringSanitizer,
  RemoveHeaderSanitizer,
} from "./utils/utils.js";
export { delay } from "./utils/delay.js";
export { env } from "./utils/env.js";
export { CustomMatcherOptions } from "./matcher.js";
export { TestInfo, VitestTestContext } from "./testInfo.js";

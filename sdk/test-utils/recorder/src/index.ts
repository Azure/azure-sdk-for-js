// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export { Recorder } from "./recorder";
export { relativeRecordingsPath } from "./utils/relativePathCalculator";
export {
  SanitizerOptions,
  RecorderStartOptions,
  isLiveMode,
  isPlaybackMode,
  isRecordMode,
  assertEnvironmentVariable,
  TestContext,
  BodyKeySanitizer,
  ConnectionStringSanitizer,
  ContinuationSanitizer,
  FindReplaceSanitizer,
  HeaderSanitizer,
  RemoveHeaderSanitizer,
  RegexSanitizer,
  StringSanitizer,
} from "./utils/utils";
export { env } from "./utils/env";
export { delay } from "./utils/delay";
export { CustomMatcherOptions } from "./matcher";
export { Transform, ApplyCondition, TransformType, HeaderTransformParams } from "./transform";

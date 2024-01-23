// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
} from "./utils/utils.js";
export { env } from "./utils/env.js";
export { delay } from "./utils/delay.js";
export { CustomMatcherOptions } from "./matcher.js";
export { 
  TestInfo, 
  MochaTest, 
  MochaTestSuite,
  VitestTestContext, 
  VitestTask,
  VitestSuite,
  isMochaTest, 
  isVitestTestContext 
} from "./testInfo.js";

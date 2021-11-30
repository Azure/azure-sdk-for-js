// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

export { record, Recorder, TestContext, TestContextInterface, TestContextTest } from "./recorder";
export {
  env,
  delay,
  isPlaybackMode,
  isRecordMode,
  isLiveMode,
  isSoftRecordMode,
  RecorderEnvironmentSetup
} from "./utils";
export { pluginForIdentitySDK, pluginForClientSecretCredentialTests } from "./utils/msalAuth.node";
export { jsonRecordingFilterFunction } from "./basekarma.conf";
export { generateTestRecordingFilePath } from "./utils/recordingPath";
export { findRecordingsFolderPath } from "./utils/recordings";
export { setEnvironmentVariables } from "./baseRecorder";

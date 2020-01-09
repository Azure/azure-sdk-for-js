// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

export { record, Recorder } from "./recorder";
export { env, delay, isPlaybackMode, isRecordMode } from "./utils";
export {
  setReplaceableVariables,
  setReplacements,
  setEnvironmentOnLoad,
  skipQueryParams
} from "./baseRecorder";
export { jsonRecordingFilterFunction } from "./basekarma.conf";

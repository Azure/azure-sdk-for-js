// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions, TestInfo } from "@azure-tools/test-recorder";
import { Recorder, isLiveMode, isPlaybackMode } from "@azure-tools/test-recorder";
import * as MOCKS from "../../utils/constants.js";
import { EnvVarKeys } from "../../utils/constants.js";

const key = process.env[EnvVarKeys.KEY];
const sourceResourceId = process.env[EnvVarKeys.SOURCE_RESOURCE_ID];
const sourceRegion = process.env[EnvVarKeys.SOURCE_REGION];
const targetEndpoint = process.env[EnvVarKeys.TARGET_ENDPOINT];
const targetResourceId = process.env[EnvVarKeys.TARGET_RESOURCE_ID];
const targetRegion = process.env[EnvVarKeys.TARGET_REGION];
const targetKey = process.env[EnvVarKeys.TARGET_KEY];
const trainingDataSasUrl = process.env[EnvVarKeys.TRAINING_DATA_SAS_URL];
const trainingDataStorageAccount = process.env[EnvVarKeys.TRAINING_DATA_STORAGE_ACCOUNT];
const trainingDataContainer = process.env[EnvVarKeys.TRAINING_DATA_CONTAINER];
const trainingDataPrefix = process.env[EnvVarKeys.TRAINING_DATA_PREFIX];

// CUSTOMIZATION: SDK-IMPROVEMENT: Mode-aware envSetupForPlayback inclusion.
// test-recorder's handleEnvSetup builds sanitizers with `target = process.env[key]`
// and filters only `undefined` (not empty strings). When a cross-resource env var
// is defined-but-empty (as `sample.env` templates them), record mode sends
// `target=""` to test-proxy which rejects with HTTP 400 "Parameter 'target' was
// passed with no value." For each cross-resource var, include the mock only if:
//   - we're in playback mode (tests need process.env[X] populated so `if (!X)`
//     guards pass and the recorded HTTP flow replays), OR
//   - the real env var is non-empty (so record mode produces a valid sanitizer).
// In live mode there is no envSetupForPlayback processing, so this switch is a
// no-op there.
const includeSourceResourceId = isPlaybackMode() || Boolean(sourceResourceId);
const includeSourceRegion = isPlaybackMode() || Boolean(sourceRegion);
const includeTargetEndpoint = isPlaybackMode() || Boolean(targetEndpoint);
const includeTargetResourceId = isPlaybackMode() || Boolean(targetResourceId);
const includeTargetRegion = isPlaybackMode() || Boolean(targetRegion);

export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: {
    CONTENTUNDERSTANDING_ENDPOINT: MOCKS.ENDPOINT,
    ...(key ? { CONTENTUNDERSTANDING_KEY: MOCKS.KEY } : {}),
    ...(includeSourceResourceId ? { CONTENTUNDERSTANDING_SOURCE_RESOURCE_ID: MOCKS.SOURCE_RESOURCE_ID } : {}),
    ...(includeSourceRegion ? { CONTENTUNDERSTANDING_SOURCE_REGION: MOCKS.SOURCE_REGION } : {}),
    ...(includeTargetEndpoint ? { CONTENTUNDERSTANDING_TARGET_ENDPOINT: MOCKS.TARGET_ENDPOINT } : {}),
    ...(includeTargetResourceId ? { CONTENTUNDERSTANDING_TARGET_RESOURCE_ID: MOCKS.TARGET_RESOURCE_ID } : {}),
    ...(includeTargetRegion ? { CONTENTUNDERSTANDING_TARGET_REGION: MOCKS.TARGET_REGION } : {}),
    ...(targetKey ? { CONTENTUNDERSTANDING_TARGET_KEY: MOCKS.TARGET_KEY } : {}),
    ...(trainingDataSasUrl
      ? { CONTENTUNDERSTANDING_TRAINING_DATA_SAS_URL: MOCKS.TRAINING_DATA_SAS_URL }
      : {}),
    ...(trainingDataStorageAccount
      ? {
          CONTENTUNDERSTANDING_TRAINING_DATA_STORAGE_ACCOUNT: MOCKS.TRAINING_DATA_STORAGE_ACCOUNT,
        }
      : {}),
    ...(trainingDataContainer
      ? { CONTENTUNDERSTANDING_TRAINING_DATA_CONTAINER: MOCKS.TRAINING_DATA_CONTAINER }
      : {}),
    ...(trainingDataPrefix
      ? { CONTENTUNDERSTANDING_TRAINING_DATA_PREFIX: MOCKS.TRAINING_DATA_PREFIX }
      : {}),
    // Lock model names during playback so recorded request bodies match assertions.
    // Update these together with MOCKS.TEST_COMPLETION_MODEL defaults when recordings
    // are refreshed against a new API version.
    CU_TEST_COMPLETION_MODEL: "gpt-4.1",
    CU_TEST_COMPLETION_MINI_MODEL: "gpt-4.1-mini",
  },
  removeCentralSanitizers: [
    "AZSDK4001", // envSetupForPlayback handles endpoint sanitization
    "AZSDK2030", // no need to sanitize "operation-location" header since the endpoint is already sanitized
    "AZSDK3430", // $.id
    "AZSDK3496", // $..resourceLocation
    ...(key ? [] : ["AZSDK3493"]), // remove key sanitizer if not using key
  ],
  sanitizerOptions: {
    bodyKeySanitizers: [
      {
        jsonPath: "$.input.url",
      },
      {
        jsonPath: "$.input.urlSource",
      },
      {
        jsonPath: "$.azureBlobSource.containerUrl",
      },
      {
        jsonPath: "$.resultContainerUrl",
      },
      {
        jsonPath: "$..sourceUrl",
      },
      {
        jsonPath: "$..containerUrl",
      },
      {
        jsonPath: "$.targetAzureResourceId",
        value: MOCKS.TARGET_RESOURCE_ID,
      },
      {
        jsonPath: "$.targetRegion",
        value: MOCKS.TARGET_REGION,
      },
      {
        jsonPath: "$.sourceAzureResourceId",
        value: MOCKS.SOURCE_RESOURCE_ID,
      },
      {
        jsonPath: "$.sourceRegion",
        value: MOCKS.SOURCE_REGION,
      },
    ],
  },
};

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(context: TestInfo): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderOptions);
  return recorder;
}

export const testPollingOptions = {
  updateIntervalInMs: isLiveMode() ? undefined : 0,
};

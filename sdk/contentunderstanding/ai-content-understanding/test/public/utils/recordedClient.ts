// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions, TestInfo } from "@azure-tools/test-recorder";
import { Recorder, isLiveMode } from "@azure-tools/test-recorder";
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

export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: {
    CONTENTUNDERSTANDING_ENDPOINT: MOCKS.ENDPOINT,
    ...(key ? { CONTENTUNDERSTANDING_KEY: MOCKS.KEY } : {}),
    CONTENTUNDERSTANDING_SOURCE_RESOURCE_ID: MOCKS.SOURCE_RESOURCE_ID,
    CONTENTUNDERSTANDING_SOURCE_REGION: MOCKS.SOURCE_REGION,
    CONTENTUNDERSTANDING_TARGET_ENDPOINT: MOCKS.TARGET_ENDPOINT,
    CONTENTUNDERSTANDING_TARGET_RESOURCE_ID: MOCKS.TARGET_RESOURCE_ID,
    CONTENTUNDERSTANDING_TARGET_REGION: MOCKS.TARGET_REGION,
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
  intervalInMs: isLiveMode() ? undefined : 0,
};

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions, TestInfo } from "@azure-tools/test-recorder";
import { Recorder } from "@azure-tools/test-recorder";
import { isLiveMode } from "../../utils/injectables.js";
import * as MOCKS from "../../utils/constants.js";
import { EnvVarKeys } from "../../utils/constants.js";

const key = process.env[EnvVarKeys.KEY];

export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: {
    AZURE_CONTENT_UNDERSTANDING_ENDPOINT: MOCKS.ENDPOINT,
    ...(key ? { AZURE_CONTENT_UNDERSTANDING_KEY: MOCKS.KEY } : {}),
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

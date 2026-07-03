// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions } from "@azure-tools/test-recorder";
import { getConnectionString, getEndpoint } from "./utils/injectables.js";
import * as MOCKS from "./utils/constants.js";

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: {},
  sanitizerOptions: {
    uriSanitizers: [
      {
        target: getEndpoint(),
        value: MOCKS.ENDPOINT,
      },
    ],
    connectionStringSanitizers: [
      {
        actualConnString: getConnectionString(),
        fakeConnString: MOCKS.CONNECTION_STRING,
      },
    ],
  },
  removeCentralSanitizers: [
    "AZSDK4001", // URI host — we use our own uriSanitizers
    "AZSDK3430", // $..id
    "AZSDK3433", // $..userId
    "AZSDK3442", // $..createdBy
    "AZSDK3493", // $..name
  ],
};

export default recorderOptions;

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  assertEnvironmentVariable,
  Recorder,
  type RecorderStartOptions,
  type VitestTestContext,
} from "@azure-tools/test-recorder";

const endpoint = "https://endpoint";
const apiKey = "api_key";

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: {
    WPS_CHAT_ENDPOINT: endpoint,
    WPS_CHAT_CONNECTION_STRING: `Endpoint=${endpoint};AccessKey=${apiKey};Version=1.0;`,
  },
  removeCentralSanitizers: [
    "AZSDK4001", // The endpoint is sanitized explicitly below.
    "AZSDK3430", // $..id
    "AZSDK3433", // $..userId
    "AZSDK3442", // $..createdBy
    "AZSDK3490", // $..etag values are required for conditional request playback
    "AZSDK3493", // $..name
  ],
};

/**
 * Creates and starts the recorder for a test context.
 * Client creation is done separately in each test suite.
 */
export async function createRecorder(context: VitestTestContext): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderOptions);
  await recorder.addSanitizers(
    {
      uriSanitizers: [
        {
          target: assertEnvironmentVariable("WPS_CHAT_ENDPOINT"),
          value: endpoint,
        },
      ],
    },
    ["record", "playback"],
  );
  return recorder;
}

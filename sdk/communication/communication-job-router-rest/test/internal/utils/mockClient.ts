// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientOptions } from "@azure-rest/core-client";
import type { RecorderStartOptions, TestInfo } from "@azure-tools/test-recorder";
import { Recorder } from "@azure-tools/test-recorder";
import JobRouter from "../../../src/index.js";
import type { AzureCommunicationRoutingServiceClient } from "../../../src/index.js";
import { generateToken } from "../../public/utils/connection.js";
import { getConnectionString, getEndpoint } from "../../utils/injectables.js";
import * as MOCKS from "../../utils/constants.js";

const fakeToken = generateToken();
export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: {},
  sanitizerOptions: {
    bodyKeySanitizers: [{ jsonPath: "$.accessToken.token", value: fakeToken }],
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
    "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
    "AZSDK3430", // .id in the body is not a secret and is listed below in the beforeEach section
    "AZSDK4001",
  ],
};

export async function createRecorder(context: TestInfo | undefined): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderOptions);
  await recorder.addSanitizers(recorderOptions.sanitizerOptions!, ["record", "playback"]);
  await recorder.setMatcher("HeaderlessMatcher");
  return recorder;
}

export interface RecordedRouterClient {
  routerClient: AzureCommunicationRoutingServiceClient;
  recorder: Recorder;
}

export async function createRecordedRouterClientWithConnectionString(
  context: TestInfo,
): Promise<RecordedRouterClient> {
  const recorder = await createRecorder(context);

  return {
    routerClient: JobRouter(
      getConnectionString(),
      recorder.configureClientOptions({}) as ClientOptions,
    ),
    recorder,
  };
}

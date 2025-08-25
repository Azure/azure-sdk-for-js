// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientOptions } from "@azure-rest/core-client";
import * as dotenv from "dotenv";
import type { RecorderStartOptions, TestInfo } from "@azure-tools/test-recorder";
import { Recorder, env } from "@azure-tools/test-recorder";
import JobRouter from "@azure-rest/communication-job-router";
import type { AzureCommunicationRoutingServiceClient } from "@azure-rest/communication-job-router";
import { isNodeLike } from "@azure/core-util";
import { generateToken } from "../../public/utils/connection.js";

if (isNodeLike) {
  dotenv.config();
}

const envSetupForPlayback: { [k: string]: string } = {
  COMMUNICATION_CONNECTION_STRING: "endpoint=https://endpoint/;accesskey=banana",
};

const fakeToken = generateToken();
export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
  sanitizerOptions: {
    bodyKeySanitizers: [{ jsonPath: "$.accessToken.token", value: fakeToken }],
  },
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
    "AZSDK3430", // .id in the body is not a secret and is listed below in the beforeEach section
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
      env.COMMUNICATION_CONNECTION_STRING as string,
      recorder.configureClientOptions({}) as ClientOptions,
    ),
    recorder,
  };
}

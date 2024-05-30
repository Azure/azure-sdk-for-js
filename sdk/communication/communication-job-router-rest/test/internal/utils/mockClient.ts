// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions } from "@azure-rest/core-client";
import * as dotenv from "dotenv";
import { Recorder, env, RecorderStartOptions } from "@azure-tools/test-recorder";
import JobRouter from "../../../src";
import { AzureCommunicationRoutingServiceClient } from "../../../src";
import { Context, Test } from "mocha";
import { isNode } from "@azure/core-util";
import { generateToken } from "../../public/utils/connection";

if (isNode) {
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
};

export async function createRecorder(context: Test | undefined): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start({ envSetupForPlayback });
  await recorder.addSanitizers(recorderOptions.sanitizerOptions!, ["record", "playback"]);
  await recorder.setMatcher("HeaderlessMatcher");
  return recorder;
}

export interface RecordedRouterClient {
  routerClient: AzureCommunicationRoutingServiceClient;
  recorder: Recorder;
}

export async function createRecordedRouterClientWithConnectionString(
  context: Context,
): Promise<RecordedRouterClient> {
  const recorder = await createRecorder(context.currentTest);

  return {
    routerClient: JobRouter(
      env.COMMUNICATION_CONNECTION_STRING as string,
      recorder.configureClientOptions({}) as ClientOptions,
    ),
    recorder,
  };
}

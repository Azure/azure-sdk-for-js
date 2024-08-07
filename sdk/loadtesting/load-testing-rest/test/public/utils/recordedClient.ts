// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import AzureLoadTesting, { AzureLoadTestingClient } from "../../../src";
import { Context } from "mocha";
import { Recorder, env, RecorderStartOptions } from "@azure-tools/test-recorder";
import "./env";

import { ClientOptions } from "@azure-rest/core-client";
import { createTestCredential } from "@azure-tools/test-credential";

const credential = createTestCredential();

const envSetupForPlayback: Record<string, string> = {
  LOADTESTSERVICE_ENDPOINT: "endpoint",
  SUBSCRIPTION_ID: "azure_subscription_id",
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback,
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
  ],
};

export function createClient(
  recorder: Recorder,
  options: ClientOptions = {},
): AzureLoadTestingClient {
  return AzureLoadTesting(
    env.LOADTESTSERVICE_ENDPOINT || "",
    credential,
    recorder.configureClientOptions(options),
  );
}

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(context: Context): Promise<Recorder> {
  const recorder = new Recorder(context.currentTest);
  await recorder.start(recorderEnvSetup);
  return recorder;
}

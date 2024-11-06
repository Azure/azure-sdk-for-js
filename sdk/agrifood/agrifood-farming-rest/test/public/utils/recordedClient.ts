// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Context } from "mocha";
import type { RecorderStartOptions } from "@azure-tools/test-recorder";
import { Recorder, env } from "@azure-tools/test-recorder";
import "./env";
import type { FarmBeatsClient } from "../../../src";
import FarmBeats from "../../../src";
import { createTestCredential } from "@azure-tools/test-credential";
import type { ClientOptions } from "@azure-rest/core-client";

const envSetupForPlayback: Record<string, string> = {
  FARMBEATS_ENDPOINT: "https://fakeaccount.farmbeats.azure.net",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  SUBSCRIPTION_ID: "azure_subscription_id",
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback,
};

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

export function createClient(options?: ClientOptions): FarmBeatsClient {
  const credential = createTestCredential();

  return FarmBeats(env.FARMBEATS_ENDPOINT as string, credential, { ...options });
}

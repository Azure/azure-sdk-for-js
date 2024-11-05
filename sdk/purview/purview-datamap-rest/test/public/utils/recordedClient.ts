// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Context } from "mocha";
import type { PurviewDataMapClient } from "../../../src";
import PurviewDataMap from "../../../src";
import type { RecorderStartOptions } from "@azure-tools/test-recorder";
import { env, Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import "./env";
import type { ClientOptions } from "@azure-rest/core-client";

const envSetupForPlayback: Record<string, string> = {
  ENDPOINT: "https://fakeAccount.purview.azure.com/",
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

export async function createClient(
  recorder: Recorder,
  options?: ClientOptions,
): Promise<PurviewDataMapClient> {
  const credential = createTestCredential();

  return PurviewDataMap(
    env.ENDPOINT ?? "",
    credential,
    recorder.configureClientOptions({
      options,
    }),
  );
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Recorder,
  RecorderStartOptions,
  VitestTestContext,
  assertEnvironmentVariable,
} from "@azure-tools/test-recorder";
import { DefaultAzureCredential } from "@azure/identity";
import { ClientOptions } from "@azure-rest/core-client";
import createClient, { ModelClient } from "../../../src/index.js";

const envSetupForPlayback: Record<string, string> = {
  AZURE_ENDPOINT: "https://endpoint",
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
export async function createRecorder(context: VitestTestContext): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderEnvSetup);
  return recorder;
}

export async function createModelClient(
  recorder?: Recorder,
  options?: ClientOptions,
): Promise<ModelClient> {
  const endpoint = assertEnvironmentVariable("AZURE_ENDPOINT");
  const credential = new DefaultAzureCredential();
  return createClient(endpoint, credential, recorder?.configureClientOptions(options ?? {}));
}

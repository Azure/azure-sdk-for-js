// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions, VitestTestContext } from "@azure-tools/test-recorder";
import { Recorder } from "@azure-tools/test-recorder";

const replaceableVariables: Record<string, string> = {
  ENDPOINT: "https://fake-speech-resource.cognitiveservices.azure.com/",
  API_KEY: "fake_api_key",
  AZURE_CLIENT_ID: "fake_client_id",
  AZURE_CLIENT_SECRET: "fake_client_secret",
  AZURE_TENANT_ID: "fake_tenant_id",
  SUBSCRIPTION_ID: "azure_subscription_id",
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
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

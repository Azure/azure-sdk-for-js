// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import AzureLoadTesting, { AzureLoadTestingClient } from "../../../src";
import { Context } from "mocha";
import { Recorder, RecorderStartOptions } from "@azure-tools/test-recorder";
import "./env";

import { ClientOptions } from "@azure-rest/core-client";
import { ClientSecretCredential } from "@azure/identity";

const envSetupForPlayback: Record<string, string> = {
  ENDPOINT: "https://endpoint",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  SUBSCRIPTION_ID: "azure_subscription_id",
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback,
};

export function createClient(
  recorder: Recorder,
  options: ClientOptions = {}
): AzureLoadTestingClient {
  const credential = new ClientSecretCredential(
    "72f988bf-86f1-41af-91ab-2d7cd011db47",
    "747dd2f6-45bb-43db-9286-1a701def44a1",
    "3Nw7Q~8Q_qSx_3o-c~4uw2J78rsiZ3dWjinzY"
  );

  return AzureLoadTesting(
    "2cb8a478-4e54-4216-9aba-5cd0e68c7551.eus.cnt-prod.loadtesting.azure.com",
    credential,
    recorder.configureClientOptions(options)
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

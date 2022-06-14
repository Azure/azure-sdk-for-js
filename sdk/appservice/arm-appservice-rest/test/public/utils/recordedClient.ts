// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { Recorder, RecorderStartOptions } from "@azure-tools/test-recorder";
import { ClientOptions } from "@azure-rest/core-client";
import { createTestCredential } from "@azure-tools/test-credential";
import WebSiteClient, { WebSiteManagementClient } from "../../../src/index";

const envSetupForPlayback: { [k: string]: string } = {
  ENDPOINT: "https://endpoint",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  SUBSCRIPTION_ID: "azure_subscription_id",
  RESOURCE_GROUP: "resource-group",
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
  options?: ClientOptions
): Promise<WebSiteManagementClient> {
  const credential = createTestCredential();
  return WebSiteClient(credential, recorder.configureClientOptions({ ...options }));
}

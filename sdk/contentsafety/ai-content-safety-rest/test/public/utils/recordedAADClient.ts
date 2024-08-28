// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Context } from "mocha";
import {
  Recorder,
  RecorderStartOptions,
  assertEnvironmentVariable,
} from "@azure-tools/test-recorder";
import "./env";
import ContentSafety, { ContentSafetyClient } from "../../../src";
import { createTestCredential } from "@azure-tools/test-credential";
// import { AzureKeyCredential } from "@azure/core-auth";
// import { ClientOptions } from "@azure-rest/core-client";

const envSetupForPlayback: Record<string, string> = {
  CONTENT_SAFETY_ENDPOINT: "https://endpoint/",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  AZURE_SUBSCRIPTION_ID: "azure_subscription_id",
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback,
};

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createAADRecorder(context: Context): Promise<Recorder> {
  const recorder = new Recorder(context.currentTest);
  await recorder.start(recorderEnvSetup);
  return recorder;
}

export function createAADClient(recorder: Recorder): ContentSafetyClient {
  const endpoint = assertEnvironmentVariable("CONTENT_SAFETY_ENDPOINT");
  const credential = createTestCredential();
  const client = ContentSafety(endpoint, credential, recorder.configureClientOptions({}));
  return client;
}

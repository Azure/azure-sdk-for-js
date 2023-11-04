// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { Recorder, RecorderStartOptions, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import "./env";
import importedCreateClient, { ImageAnalysisClient } from "../../../src/index";
import { AzureKeyCredential } from "@azure/core-auth";

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

export async function createClient(recorder: Recorder): Promise<ImageAnalysisClient> {
  const endpoint = assertEnvironmentVariable("VISION_ENDPOINT");
  const key = assertEnvironmentVariable("VISION_KEY");
  const credential = new AzureKeyCredential(key);
  return importedCreateClient(endpoint, credential, recorder.configureClientOptions({}));
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { Recorder, RecorderStartOptions} from "@azure-tools/test-recorder";
import "./env";
import {AzureKeyCredential} from "@azure/core-auth";
import ClinicalMatching, {ClinicalMatchingClient} from "../../../src";
import { createTestCredential } from "@azure-tools/test-credential";

const envSetupForPlayback: Record<string, string> = {
  HEALTH_INSIGHTS_ENDPOINT: "***",
  HEALTH_INSIGHTS_KEY: "***",
  AZURE_CLIENT_ID: "azure_client_id",
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

export async function createClient(recorder: Recorder): Promise<ClinicalMatchingClient> {
/*  const endpoint = assertEnvironmentVariable("HEALTH_INSIGHTS_ENDPOINT");
  const key = assertEnvironmentVariable("HEALTH_INSIGHTS_KEY");*/
/*  const credential = new AzureKeyCredential(key);
  return ClinicalMatching(endpoint, credential, recorder.configureClientOptions({}));*/
  const credential = new AzureKeyCredential("");
  const credential = createTestCredential();
  return ClinicalMatching("https://eastus.api.cognitive.microsoft.com", credential, recorder.configureClientOptions({}));
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions, TestInfo } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable, Recorder } from "@azure-tools/test-recorder";
import { AzureKeyCredential } from "@azure/core-auth";
import type { ClinicalMatchingRestClient } from "../../../src/index.js";
import ClinicalMatching from "../../../src/index.js";
import "./env.js";

const envSetupForPlayback: Record<string, string> = {
  HEALTH_INSIGHTS_ENDPOINT: "https://sanitized/",
  HEALTH_INSIGHTS_KEY: "fake_key",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  SUBSCRIPTION_ID: "azure_subscription_id",
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback,
  removeCentralSanitizers: [
    "AZSDK3447", // .key is not a secret
    "AZSDK4001", // URI need not be over sanitized since we have the fake endpoint set already
    "AZSDK2030", // operation-location header is not a secret since the URI is fake, being done by the fake endpoint
  ],
};

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(context: TestInfo): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderEnvSetup);
  return recorder;
}

export async function createClient(recorder: Recorder): Promise<ClinicalMatchingRestClient> {
  const endpoint = assertEnvironmentVariable("HEALTH_INSIGHTS_ENDPOINT");
  const key = assertEnvironmentVariable("HEALTH_INSIGHTS_KEY");
  const credential = new AzureKeyCredential(key);
  return ClinicalMatching(endpoint, credential, recorder.configureClientOptions({}));
}

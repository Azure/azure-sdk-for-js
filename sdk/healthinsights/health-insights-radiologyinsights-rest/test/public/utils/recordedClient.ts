// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTestCredential } from "@azure-tools/test-credential";
import {
  assertEnvironmentVariable,
  Recorder,
  RecorderStartOptions,
} from "@azure-tools/test-recorder";
import { DefaultAzureCredential, logger } from "@azure/identity";
import { Context } from "mocha";
import AHIClient, { AzureHealthInsightsClient } from "../../../src";
import "./env";

const envSetupForPlayback: Record<string, string> = {
  HEALTH_INSIGHTS_ENDPOINT: "https://sanitized/",
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
export async function createRecorder(context: Context): Promise<Recorder> {
  const recorder = new Recorder(context.currentTest);
  await recorder.start(recorderEnvSetup);
  return recorder;
}

export async function createTestClient(recorder: Recorder): Promise<AzureHealthInsightsClient> {
  const endpoint = assertEnvironmentVariable("HEALTH_INSIGHTS_ENDPOINT");
  const credential = createTestCredential();
  return AHIClient(endpoint, credential, recorder.configureClientOptions({}));
}

export async function createManagedClient(recorder: Recorder): Promise<AzureHealthInsightsClient> {
  const endpoint = assertEnvironmentVariable("HEALTH_INSIGHTS_ENDPOINT");
  const credential = new DefaultAzureCredential({
    managedIdentityClientId: process.env.MANAGED_IDENTITY_CLIENT_ID,
  });
  const tokenResponse = await credential.getToken("https://cognitiveservices.azure.com/.default");
  logger.info(null, `Got token for Cognitive Services ${tokenResponse?.token}`);
  return AHIClient(
    endpoint,
    credential,
    recorder.configureClientOptions({
      bearerTokenAuthenticationPolicy: {
        token: tokenResponse?.token,
      },
    }),
  );
}

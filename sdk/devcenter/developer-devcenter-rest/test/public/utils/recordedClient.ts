// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { isPlaybackMode, Recorder, RecorderStartOptions } from "@azure-tools/test-recorder";
import "./env";
import { AzureDevCenterClient } from "../../../src";
import { ClientOptions } from "@azure-rest/core-client";
import { DefaultAzureCredential } from "@azure/identity";
import createClient from "../../../src/azureDevCenter";
import { createTestCredential } from "@azure-tools/test-credential";
const envSetupForPlayback: Record<string, string> = {
  ENDPOINT: "https://endpoint",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  DEVCENTER_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  DEFAULT_DEVCENTER_NAME: "sdk-test-devcenter",
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

export function createRecordedClient(
  recorder: Recorder,
  tenantId: string,
  devCenter: string,
  options: ClientOptions = {},
  devCenterDnsSuffix: string = "devcenter.azure.com"
): AzureDevCenterClient {
  // We need to use a user-persona, so the clientSecretCredential that createTestCredential uses in live/record modes is not sufficient
  const credential = isPlaybackMode() ? createTestCredential() : new DefaultAzureCredential();
  return createClient(
    tenantId,
    devCenter,
    credential,
    devCenterDnsSuffix,
    recorder.configureClientOptions(options)
  );
}

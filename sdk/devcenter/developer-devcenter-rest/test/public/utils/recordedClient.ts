// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { isPlaybackMode, Recorder, RecorderStartOptions } from "@azure-tools/test-recorder";
import "./env";
import { AzureDeveloperDevCenterClient } from "../../../src";
import { ClientOptions } from "@azure-rest/core-client";
import { DefaultAzureCredential } from "@azure/identity";
import createClient from "../../../src/index";
import { createTestCredential } from "@azure-tools/test-credential";

const envSetupForPlayback: Record<string, string> = {
  ENDPOINT:
    "https://8ab2df1c-ed88-4946-a8a9-e1bbb3e4d1fd-sdk-dc-4qb444onnk2tc.centraluseuap.devcenter.azure.com",
  DEFAULT_PROJECT_NAME: "sdk-project-x2z4o4ohvwcbi",
  DEFAULT_POOL_NAME: "sdk-pool-6ieikn5v2nfnu",
  DEFAULT_DEVBOX_NAME: "mydevbox",
  DEFAULT_USER_NAME: "me",
  DEFAULT_CATALOG_NAME: "sdk-default-catalog",
  DEFAULT_ENVIRONMENT_TYPE_NAME: "sdk-environment-type-6p7h3fou6ey3c",
  DEFAULT_ENVIRONMENT_DEFINITION_NAME: "Sandbox",
  DEFAULT_ENVIRONMENT_NAME: "envname",
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

export function createRecordedClient(
  recorder: Recorder,
  endpoint: string,
  options: ClientOptions = {}
): AzureDeveloperDevCenterClient {
  // We need to use a user-persona, so the clientSecretCredential that createTestCredential uses in live/record modes is not sufficient
  const credential = isPlaybackMode() ? createTestCredential() : new DefaultAzureCredential();
  return createClient(endpoint, credential, recorder.configureClientOptions(options));
}

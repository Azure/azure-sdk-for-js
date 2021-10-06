// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";

import { AccessToken, AzureKeyCredential } from "@azure/core-auth";
import {
  env,
  record,
  Recorder,
  RecorderEnvironmentSetup,
  isPlaybackMode
} from "@azure-tools/test-recorder";

import { RemoteRenderingClient } from "../../src";
import "./env";

// When the recorder observes the values of these environment variables
// in any recorded HTTP request or response, it will replace them with
// the values they are mapped to below, which are not real account details.
const replaceableVariables: Record<string, string> = {
  REMOTERENDERING_ARR_ACCOUNT_DOMAIN: "eastus2.mixedreality.azure.com",
  REMOTERENDERING_ARR_ACCOUNT_ID: "00000000-1111-2222-3333-444455556666",
  REMOTERENDERING_ARR_ACCOUNT_KEY: "arr_account_key",
  REMOTERENDERING_ARR_BLOB_CONTAINER_NAME: "test",
  REMOTERENDERING_ARR_SAS_TOKEN: "arr_sas_token",
  REMOTERENDERING_ARR_SERVICE_ENDPOINT: "https://remoterendering.eastus2.mixedreality.azure.com",
  REMOTERENDERING_ARR_STORAGE_ACCOUNT_NAME: "sdktest"
};

export const environmentSetup: RecorderEnvironmentSetup = {
  replaceableVariables,
  queryParametersToSkip: [],
  customizationsOnRecordings: [
    // Replace the recorded AccessToken value with a fake one.
    (recording: string): string =>
      recording.replace(/"AccessToken":"[^"]*"/g, `"AccessToken":"<access_token>"`)
  ]
};

export function getEnv(name: string): string {
  // If a value exists on the real environment, use it,
  // otherwise, try to use the default values from
  // replaceableVariables
  return env[name] ?? replaceableVariables[name];
}

export function createClient(): RemoteRenderingClient {
  const serviceEndpoint = getEnv("REMOTERENDERING_ARR_SERVICE_ENDPOINT");
  const accountDomain = getEnv("REMOTERENDERING_ARR_ACCOUNT_DOMAIN");
  const accountId = getEnv("REMOTERENDERING_ARR_ACCOUNT_ID");
  const accountKey = getEnv("REMOTERENDERING_ARR_ACCOUNT_KEY");

  if (isPlaybackMode()) {
    // When playing back, we do not want to interact with the STS service, so we use
    // the AccessToken auth path.
    const maxTimestampMs = 8640000000000000;
    const credential: AccessToken = { token: "<access_token>", expiresOnTimestamp: maxTimestampMs };
    return new RemoteRenderingClient(serviceEndpoint, accountId, credential);
  } else {
    const credential: AzureKeyCredential = new AzureKeyCredential(accountKey);
    return new RemoteRenderingClient(serviceEndpoint, accountId, accountDomain, credential);
  }
}

/**
 * Creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export function createRecorder(context: Context): Recorder {
  return record(context, environmentSetup);
}

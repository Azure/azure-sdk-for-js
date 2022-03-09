// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";

import {
  env,
  Recorder,
  record,
  RecorderEnvironmentSetup,
  isPlaybackMode,
} from "@azure-tools/test-recorder";

import { AzureKeyCredential } from "../../src";
import { ClientSecretCredential } from "@azure/identity";
import { KeyCredential, TokenCredential } from "@azure/core-auth";

export interface RecordedClient<T> {
  client: T;
  recorder: Recorder;
}

const replaceableVariables: { [k: string]: string } = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "12345678-1234-1234-1234-123456789012",
  FORM_RECOGNIZER_API_KEY: "api_key",
  FORM_RECOGNIZER_ENDPOINT: "https://endpoint/",
  FORM_RECOGNIZER_TRAINING_CONTAINER_SAS_URL: "https://storageaccount/trainingdata?sastoken",
  FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL: "https://storageaccount/testingdata?sastoken",
  FORM_RECOGNIZER_SELECTION_MARK_STORAGE_CONTAINER_SAS_URL:
    "https://storageaccount/selectionmark-v3?sastoken",
  FORM_RECOGNIZER_TARGET_RESOURCE_REGION: "westus2",
  // fake resource id
  FORM_RECOGNIZER_TARGET_RESOURCE_ID:
    "/subscriptions/e1367d46-77d4-4f57-8cfe-348edbdc84a3/resourceGroups/jstests/providers/Microsoft.CognitiveServices/accounts/jstests-fr",
};

export const testEnv = new Proxy(replaceableVariables, {
  get: (target, key: string) => {
    return env[key] || target[key];
  },
});

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

export const environmentSetup: RecorderEnvironmentSetup = {
  replaceableVariables,
  customizationsOnRecordings: [
    (recording: string): string =>
      recording
        .replace(/"access_token"\s?:\s?"[^"]*"/g, `"access_token":"access_token"`)
        .replace(/"accessToken"\s?:\s?"[^"]*"/g, `"accessToken":"accessToken"`)
        .replace(
          /"targetResourceId"\s?:\s?"[^"]*"/g,
          `"targetResourceId":"${replaceableVariables["FORM_RECOGNIZER_TARGET_RESOURCE_ID"]}"`
        ),
    // If we put ENDPOINT in replaceableVariables above, it will not capture
    // the endpoint string used with nock, which will be expanded to
    // https://<endpoint>:443/ and therefore will not match, so we have to do
    // this instead.
    (recording: string): string => {
      const match = testEnv.FORM_RECOGNIZER_ENDPOINT.replace(/^https:\/\//, "").replace(/\/$/, "");
      return recording.replace(match, "endpoint");
    },
    // replace the SAS token
    (recording: string): string => {
      return recording
        .replace(/\?sv[^"]*"/, `?sastoken"`)
        .replace(/\?sv[^\\"]*\\"/, `?sastoken\\"`)
        .replace(/\?sp[^"]*"/, `?sastoken"`)
        .replace(/\?sp[^\\"]*\\"/, `?sastoken\\"`);
    },
  ],
  queryParametersToSkip: [],
};

export function createRecorder(context: Context): Recorder {
  return record(context, environmentSetup);
}

/**
 * Returns an appropriate credential depending on the value of `useAad`.
 */
export function makeCredential(useAad: boolean): TokenCredential | AzureKeyCredential {
  return useAad
    ? new ClientSecretCredential(env.AZURE_TENANT_ID, env.AZURE_CLIENT_ID, env.AZURE_CLIENT_SECRET)
    : new AzureKeyCredential(env.FORM_RECOGNIZER_API_KEY);
}

export function createRecordedClient<T>(
  context: Context,
  ctor: { new (endpoint: string, credential: TokenCredential | KeyCredential): T },
  apiKey?: AzureKeyCredential
): RecordedClient<T> {
  const recorder = record(context, environmentSetup);
  return {
    client: new ctor(
      testEnv.FORM_RECOGNIZER_ENDPOINT,
      apiKey ||
        new ClientSecretCredential(
          testEnv.AZURE_TENANT_ID,
          testEnv.AZURE_CLIENT_ID,
          testEnv.AZURE_CLIENT_SECRET
        )
    ),
    recorder,
  };
}

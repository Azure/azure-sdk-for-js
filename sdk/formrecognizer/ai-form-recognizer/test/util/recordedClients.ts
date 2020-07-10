// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import * as dotenv from "dotenv";
import * as path from "path";

import { env, Recorder, record, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";
import { isNode } from "@azure/core-http";

import { AzureKeyCredential, FormTrainingClient, FormRecognizerClient } from "../../src/index";
import { ClientSecretCredential } from "@azure/identity";

if (isNode) {
  dotenv.config({ path: path.join(__dirname, "..", ".env") });
}

export interface RecordedTrainingClient {
  client: FormTrainingClient;
  recorder: Recorder;
}

export interface RecordedRecognizerClient {
  client: FormRecognizerClient;
  recorder: Recorder;
}

const replaceableVariables: { [k: string]: string } = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "azure_tenant_id",
  FORM_RECOGNIZER_API_KEY: "api_key",
  FORM_RECOGNIZER_ENDPOINT: "https://endpoint/",
  FORM_RECOGNIZER_TRAINING_CONTAINER_SAS_URL: "https://storageaccount/trainingdata?sastoken",
  FORM_RECOGNIZER_TESTING_CONTAINER_SAS_URL: "https://storageaccount/testingdata?sastoken",
  FORM_RECOGNIZER_TARGET_RESOURCE_REGION: "westus2",
  // fake resource id
  FORM_RECOGNIZER_TARGET_RESOURCE_ID:
    "/subscriptions/e1367d46-77d4-4f57-8cfe-348edbdc84a3/resourceGroups/jstests/providers/Microsoft.CognitiveServices/accounts/jstests-fr"
};

export const testEnv = new Proxy(replaceableVariables, {
  get: (target, key: string) => {
    return env[key] || target[key];
  }
});

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
        .replace(/\?sv[^\\"]*\\"/, `?sastoken\\"`);
    }
  ],
  queryParametersToSkip: []
};

export function createRecordedTrainingClient(
  context: Context,
  apiKey?: AzureKeyCredential
): RecordedTrainingClient {
  const recorder = record(context, environmentSetup);
  return {
    client: new FormTrainingClient(
      testEnv.FORM_RECOGNIZER_ENDPOINT,
      apiKey ||
        new ClientSecretCredential(
          testEnv.AZURE_TENANT_ID,
          testEnv.AZURE_CLIENT_ID,
          testEnv.AZURE_CLIENT_SECRET
        )
    ),
    recorder
  };
}

export function createRecordedRecognizerClient(
  context: Context,
  apiKey?: AzureKeyCredential
): RecordedRecognizerClient {
  const recorder = record(context, environmentSetup);
  return {
    client: new FormRecognizerClient(
      testEnv.FORM_RECOGNIZER_ENDPOINT,
      apiKey ||
        new ClientSecretCredential(
          testEnv.AZURE_TENANT_ID,
          testEnv.AZURE_CLIENT_ID,
          testEnv.AZURE_CLIENT_SECRET
        )
    ),
    recorder
  };
}

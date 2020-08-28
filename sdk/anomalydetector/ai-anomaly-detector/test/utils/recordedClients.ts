// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";

import * as dotenv from "dotenv";
import { env, Recorder, record, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";

import { ClientSecretCredential } from "@azure/identity";
import { AnomalyDetectorClient } from "../../src/AnomalyDetectorClient";
import { AzureKeyCredential } from "@azure/core-auth";

dotenv.config();

export interface RecordedRecognizerClient {
  client: AnomalyDetectorClient;
  recorder: Recorder;
}

const replaceableVariables: { [k: string]: string } = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "azure_tenant_id",
  ANOMALY_DETECTOR_API_KEY: "api_key",
  ANOMALY_DETECTOR_ENDPOINT: "https://endpoint/"
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
          `"targetResourceId":"${replaceableVariables["ANOMALY_DETECTOR_TARGET_RESOURCE_ID"]}"`
        ),
    // If we put ENDPOINT in replaceableVariables above, it will not capture
    // the endpoint string used with nock, which will be expanded to
    // https://<endpoint>:443/ and therefore will not match, so we have to do
    // this instead.
    (recording: string): string => {
      const match = testEnv.ANOMALY_DETECTOR_ENDPOINT.replace(/^https:\/\//, "").replace(/\/$/, "");
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

export function createRecordedAnomalyDetectorClient(
  context: Context,
  apiKey?: AzureKeyCredential
): RecordedRecognizerClient {
  const recorder = record(context, environmentSetup);
  return {
    client: new AnomalyDetectorClient(
      testEnv.ANOMALY_DETECTOR_ENDPOINT,
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

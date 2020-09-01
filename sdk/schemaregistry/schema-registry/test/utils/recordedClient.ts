// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import * as dotenv from "dotenv";

import { env, Recorder, record, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";
import { ClientSecretCredential } from "@azure/identity";
import { isNode } from "@azure/core-http";

import { SchemaRegistryClient } from "../../src/index";

if (isNode) {
  dotenv.config();
}

export interface RecordedClient {
  client: SchemaRegistryClient;
  recorder: Recorder;
}

const replaceableVariables: { [k: string]: string } = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "azure_tenant_id",
  SCHEMA_REGISTRY_ENDPOINT: "https://endpoint/"
};

const testEnv = new Proxy(replaceableVariables, {
  get: (target, key: string) => {
    return env[key] || target[key];
  }
});

const environmentSetup: RecorderEnvironmentSetup = {
  replaceableVariables,
  customizationsOnRecordings: [
    (recording: string): string =>
      recording.replace(/"access_token"\s?:\s?"[^"]*"/g, `"access_token":"access_token"`),
    // If we put ENDPOINT in replaceableVariables above, it will not capture
    // the endpoint string used with nock, which will be expanded to
    // https://<endpoint>:443/ and therefore will not match, so we have to do
    // this instead.
    (recording: string): string => {
      const replaced = recording.replace("endpoint:443", "endpoint");
      return replaced;
    }
  ],
  queryParametersToSkip: []
};

export function createRecordedClient(context: Context): RecordedClient {
  const recorder = record(context, environmentSetup);
  const credential = new ClientSecretCredential(
    testEnv.AZURE_TENANT_ID,
    testEnv.AZURE_CLIENT_ID,
    testEnv.AZURE_CLIENT_SECRET
  );
  const client = new SchemaRegistryClient(testEnv.SCHEMA_REGISTRY_ENDPOINT, credential);
  return { client, recorder };
}

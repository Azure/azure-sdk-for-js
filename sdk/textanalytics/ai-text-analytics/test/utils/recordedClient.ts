// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";

import { env, Recorder, record, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";
import { TokenCredential, ClientSecretCredential } from "@azure/identity";

import { AzureKeyCredential, TextAnalyticsClient } from "../../src/";

const replaceableVariables: { [k: string]: string } = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "azure_tenant_id",
  TEXT_ANALYTICS_API_KEY: "api_key",
  // Second API key
  TEXT_ANALYTICS_API_KEY_ALT: "api_key_alt",
  ENDPOINT: "https://endpoint/"
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

export type AuthMethod = "APIKey" | "AAD";

export function createClient(authMethod: AuthMethod): TextAnalyticsClient {
  let credential: AzureKeyCredential | TokenCredential;
  switch (authMethod) {
    case "APIKey": {
      credential = new AzureKeyCredential(testEnv.TEXT_ANALYTICS_API_KEY);
      break;
    }
    case "AAD": {
      credential = new ClientSecretCredential(
        testEnv.AZURE_TENANT_ID,
        testEnv.AZURE_CLIENT_ID,
        testEnv.AZURE_CLIENT_SECRET
      );
      break;
    }
    default: {
      throw Error(`Unsupported authentication method: ${authMethod}`);
    }
  }
  return new TextAnalyticsClient(testEnv.ENDPOINT, credential);
}

export function createRecorder(context: Context): Recorder {
  return record(context, environmentSetup);
}

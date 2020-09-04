// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import * as dotenv from "dotenv";

import { env, Recorder, record, RecorderEnvironmentSetup } from "@azure/test-utils-recorder";
import { TokenCredential, ClientSecretCredential } from "@azure/identity";
import { isNode } from "@azure/core-http";

import { AzureKeyCredential, TextAnalyticsClient } from "../../src/index";

if (isNode) {
  dotenv.config();
}

export interface RecordedClient {
  client: TextAnalyticsClient;
  recorder: Recorder;
}

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

export function createCredentialFromAPIKey() : AzureKeyCredential {
  return new AzureKeyCredential(testEnv.TEXT_ANALYTICS_API_KEY);
}

/**
 * If the environment variable TEST_AUTH_MODE is not set, it defaults to AAD.
 */
export function createCredentialFromEnvVar() : AzureKeyCredential | TokenCredential {
  let credential: AzureKeyCredential | TokenCredential;
  const authMode = testEnv.TEST_AUTH_MODE;
  switch (authMode) {
    case undefined:
    case "ADD":
      credential = new ClientSecretCredential(
        testEnv.AZURE_TENANT_ID,
        testEnv.AZURE_CLIENT_ID,
        testEnv.AZURE_CLIENT_SECRET
      );
      break;
    case "APIKey":
      credential = createCredentialFromAPIKey();
      break;
    default:
      throw new Error(`unsupported mode of authentication: ${authMode}`);
  }
  return credential;
}

export function createRecordedClient(
  context: Context,
  credential: AzureKeyCredential | TokenCredential
): RecordedClient {
  const recorder = record(context, environmentSetup);
  return {
    client: new TextAnalyticsClient(testEnv.ENDPOINT, credential),
    recorder
  };
}

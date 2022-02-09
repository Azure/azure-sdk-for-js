// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";

import {
  env,
  Recorder,
  record,
  RecorderEnvironmentSetup,
  isLiveMode,
} from "@azure-tools/test-recorder";
import { TokenCredential, ClientSecretCredential } from "@azure/identity";
import { isNode, createXhrHttpClient } from "@azure/test-utils";

import { AzureKeyCredential, TextAnalyticsClient, TextAnalyticsClientOptions } from "../../../src/";
import "./env";

const replaceableVariables: { [k: string]: string } = {
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
  TEXT_ANALYTICS_API_KEY: "api_key",
  // Second API key
  TEXT_ANALYTICS_API_KEY_ALT: "api_key_alt",
  ENDPOINT: "https://endpoint",
  TEXT_ANALYTICS_RECOGNIZE_CUSTOM_ENTITIES_PROJECT_NAME: "project_name",
  TEXT_ANALYTICS_RECOGNIZE_CUSTOM_ENTITIES_DEPLOYMENT_NAME: "deployment_name",
  TEXT_ANALYTICS_SINGLE_CATEGORY_CLASSIFY_PROJECT_NAME: "project_name",
  TEXT_ANALYTICS_SINGLE_CATEGORY_CLASSIFY_DEPLOYMENT_NAME: "deployment_name",
  TEXT_ANALYTICS_MULTI_CATEGORY_CLASSIFY_PROJECT_NAME: "project_name",
  TEXT_ANALYTICS_MULTI_CATEGORY_CLASSIFY_DEPLOYMENT_NAME: "deployment_name",
};

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
    },
  ],
  queryParametersToSkip: [],
};

export type AuthMethod = "APIKey" | "AAD" | "DummyAPIKey";

export function createClient(
  authMethod: AuthMethod,
  options?: TextAnalyticsClientOptions
): TextAnalyticsClient {
  const httpClient = isNode || isLiveMode() ? undefined : createXhrHttpClient();
  let credential: AzureKeyCredential | TokenCredential;
  switch (authMethod) {
    case "APIKey": {
      credential = new AzureKeyCredential(env.TEXT_ANALYTICS_API_KEY);
      break;
    }
    case "AAD": {
      credential = new ClientSecretCredential(
        env.AZURE_TENANT_ID,
        env.AZURE_CLIENT_ID,
        env.AZURE_CLIENT_SECRET,
        { httpClient }
      );
      break;
    }
    case "DummyAPIKey": {
      credential = new AzureKeyCredential("whatever");
      break;
    }
    default: {
      throw Error(`Unsupported authentication method: ${authMethod}`);
    }
  }
  return new TextAnalyticsClient(
    env.ENDPOINT || "https://dummy.cognitiveservices.azure.com/",
    credential,
    { httpClient, ...options }
  );
}

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export function createRecorder(context: Context): Recorder {
  return record(context, environmentSetup);
}

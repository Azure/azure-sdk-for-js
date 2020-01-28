// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import * as dotenv from "dotenv";
import * as path from "path";

import {
  setReplaceableVariables,
  env,
  Recorder,
  record,
  setReplacements
} from "@azure/test-utils-recorder";
import { TokenCredential, ClientSecretCredential } from "@azure/identity";
import { isNode } from "@azure/core-http";

import { CognitiveServicesCredential, TextAnalyticsClient } from "../../src/index";

if (isNode) {
  dotenv.config({ path: path.join(__dirname, "..", "..", "..", ".env") });
}

export interface RecordedClient {
  client: TextAnalyticsClient;
  recorder: Recorder;
}

export function createRecordedClient(
  context: Context,
  apiKey?: CognitiveServicesCredential
): RecordedClient {
  setReplaceableVariables({
    AZURE_CLIENT_ID: "azure_client_id",
    AZURE_CLIENT_SECRET: "azure_client_secret",
    AZURE_TENANT_ID: "azure_tenant_id",
    SUBSCRIPTION_KEY: "subscription_key",
    ENDPOINT: "endpoint"
  });

  setReplacements([
    (recording: string): string =>
      recording.replace(/"access_token"\s?:\s?"[^"]*"/g, `"access_token":"access_token"`)
  ]);

  let credential: CognitiveServicesCredential | TokenCredential;
  if (apiKey !== undefined) {
    credential = apiKey;
  } else {
    credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_CLIENT_SECRET
    );
  }

  const recorder = record(context);

  return {
    client: new TextAnalyticsClient(env.ENDPOINT, credential),
    recorder
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as dotenv from "dotenv";

import { env, RecorderEnvironmentSetup } from "@azure-tools/test-recorder";
import { isNode } from "@azure/core-http";

import {
  AzureKeyCredential,
  SearchClient,
  SearchIndexerClient,
  SearchIndexClient
} from "../../../src";

if (isNode) {
  dotenv.config();
}

export interface Clients<IndexModel> {
  searchClient: SearchClient<IndexModel>;
  indexClient: SearchIndexClient;
  indexerClient: SearchIndexerClient;
}

const replaceableVariables: { [k: string]: string } = {
  SEARCH_API_ADMIN_KEY: "admin_key",
  SEARCH_API_ADMIN_KEY_ALT: "admin_key_alt",
  ENDPOINT: "https://endpoint"
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
      const match = testEnv.ENDPOINT.replace(/^https:\/\//, "").replace(/\/$/, "");
      return recording.replace(match, "endpoint");
    }
  ],
  queryParametersToSkip: []
};

export function createClients<IndexModel>(indexName: string): Clients<IndexModel> {
  const credential = new AzureKeyCredential(testEnv.SEARCH_API_ADMIN_KEY);
  const searchClient = new SearchClient<IndexModel>(testEnv.ENDPOINT, indexName, credential);
  const indexClient = new SearchIndexClient(testEnv.ENDPOINT, credential);
  const indexerClient = new SearchIndexerClient(testEnv.ENDPOINT, credential);

  return {
    searchClient,
    indexClient,
    indexerClient
  };
}

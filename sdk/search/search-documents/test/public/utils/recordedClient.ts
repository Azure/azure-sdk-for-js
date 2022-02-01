// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as dotenv from "dotenv";

import { env, RecorderEnvironmentSetup } from "@azure-tools/test-recorder";

import {
  AzureKeyCredential,
  SearchClient,
  SearchIndexerClient,
  SearchIndexClient,
} from "../../../src";

const isNode =
  typeof process !== "undefined" &&
  !!process.version &&
  !!process.versions &&
  !!process.versions.node;

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
  ENDPOINT: "https://endpoint",
};

export const testEnv = new Proxy(replaceableVariables, {
  get: (target, key: string) => {
    return env[key] || target[key];
  },
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
    },
  ],
  queryParametersToSkip: [],
};

export function createClients<IndexModel>(
  indexName: string,
  serviceVersion: string
): Clients<IndexModel> {
  const endPoint: string = process.env.ENDPOINT ?? "https://endpoint";
  const credential = new AzureKeyCredential(testEnv.SEARCH_API_ADMIN_KEY);
  const searchClient = new SearchClient<IndexModel>(endPoint, indexName, credential, {
    serviceVersion,
  });
  const indexClient = new SearchIndexClient(endPoint, credential, {
    serviceVersion,
  });
  const indexerClient = new SearchIndexerClient(endPoint, credential, {
    serviceVersion,
  });

  return {
    searchClient,
    indexClient,
    indexerClient,
  };
}

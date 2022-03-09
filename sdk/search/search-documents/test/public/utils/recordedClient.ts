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
  let endPoint: string = "https://endpoint";

  switch (testEnv.AZURE_AUTHORITY_HOST) {
    case "https://login.microsoftonline.us":
      endPoint = process.env.USENDPOINT ?? "https://endpoint";
      break;
    case "https://login.chinacloudapi.cn":
      endPoint = process.env.CHINAENDPOINT ?? "https://endpoint";
      break;
    default:
      endPoint = process.env.ENDPOINT ?? "https://endpoint";
      break;
  }

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

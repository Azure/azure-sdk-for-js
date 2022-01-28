// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as dotenv from "dotenv";

import { env, RecorderStartOptions } from "@azure-tools/test-recorder";

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

const envSetupForPlayback: { [k: string]: string } = {
  SEARCH_API_ADMIN_KEY: "admin_key",
  SEARCH_API_ADMIN_KEY_ALT: "admin_key_alt",
  ENDPOINT: "https://endpoint",
};

export const testEnv = new Proxy(envSetupForPlayback, {
  get: (target, key: string) => {
    return env[key] || target[key];
  },
});

export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback
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

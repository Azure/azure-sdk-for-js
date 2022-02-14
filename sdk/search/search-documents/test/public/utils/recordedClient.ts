// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as dotenv from "dotenv";

import { env, Recorder, RecorderStartOptions } from "@azure-tools/test-recorder";

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
  indexName: string;
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

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
};

export async function createClients<IndexModel>(
  serviceVersion: string,
  recorder: Recorder,
  indexName: string
): Promise<Clients<IndexModel>> {
  await recorder.start(recorderOptions);

  indexName = recorder.variable("TEST_INDEX_NAME", indexName);
  const endPoint: string = process.env.ENDPOINT ?? "https://endpoint";
  const credential = new AzureKeyCredential(testEnv.SEARCH_API_ADMIN_KEY);
  const searchClient = new SearchClient<IndexModel>(
    endPoint,
    indexName,
    credential,
    recorder.configureClientOptions({
      serviceVersion,
    })
  );
  const indexClient = new SearchIndexClient(
    endPoint,
    credential,
    recorder.configureClientOptions({
      serviceVersion,
    })
  );
  const indexerClient = new SearchIndexerClient(
    endPoint,
    credential,
    recorder.configureClientOptions({
      serviceVersion,
    })
  );

  return {
    searchClient,
    indexClient,
    indexerClient,
    indexName,
  };
}

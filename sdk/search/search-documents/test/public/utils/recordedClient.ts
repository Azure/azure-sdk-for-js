// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, RecorderStartOptions, env } from "@azure-tools/test-recorder";

import {
  AzureKeyCredential,
  SearchClient,
  SearchIndexClient,
  SearchIndexerClient,
} from "../../../src";
import { OpenAIClient } from "@azure/openai";

export interface Clients<IndexModel extends object> {
  searchClient: SearchClient<IndexModel>;
  indexClient: SearchIndexClient;
  indexerClient: SearchIndexerClient;
  indexName: string;
  openAIClient: OpenAIClient;
}

const envSetupForPlayback: { [k: string]: string } = {
  SEARCH_API_ADMIN_KEY: "admin_key",
  SEARCH_API_ADMIN_KEY_ALT: "admin_key_alt",
  ENDPOINT: "https://endpoint",
  OPENAI_DEPLOYMENT_NAME: "deployment-name",
  AZURE_OPENAI_ENDPOINT: "https://openai.endpoint",
  OPENAI_KEY: "openai-key",
};

export const testEnv = new Proxy(envSetupForPlayback, {
  get: (target, key: string) => {
    return env[key] || target[key];
  },
});

const generalSanitizers = [];

if (env.ENDPOINT) {
  generalSanitizers.push({
    regex: false,
    value: "subdomain",
    target: env.ENDPOINT.match(/:\/\/(.*).search.windows.net/)![1],
  });
}

if (env.AZURE_OPENAI_ENDPOINT) {
  generalSanitizers.push({
    regex: false,
    value: "subdomain",
    target: env.AZURE_OPENAI_ENDPOINT.match(/:\/\/(.*).openai.azure.com/)![1],
  });
}

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
  sanitizerOptions: {
    generalSanitizers,
  },
};

export async function createClients<IndexModel extends object>(
  serviceVersion: string,
  recorder: Recorder,
  indexName: string
): Promise<Clients<IndexModel>> {
  await recorder.start(recorderOptions);

  indexName = recorder.variable("TEST_INDEX_NAME", indexName);
  const endPoint: string = env.ENDPOINT ?? "https://endpoint";
  const credential = new AzureKeyCredential(testEnv.SEARCH_API_ADMIN_KEY);
  const openAIEndpoint = env.AZURE_OPENAI_ENDPOINT ?? "https://openai.endpoint";
  const openAIKey = new AzureKeyCredential(env.OPENAI_KEY ?? "openai-key");
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
  const openAIClient = new OpenAIClient(
    openAIEndpoint,
    openAIKey,
    recorder.configureClientOptions({})
  );

  return {
    searchClient,
    indexClient,
    indexerClient,
    indexName,
    openAIClient,
  };
}

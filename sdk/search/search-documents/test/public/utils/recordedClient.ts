// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  assertEnvironmentVariable,
  env,
  Recorder,
  RecorderStartOptions,
} from "@azure-tools/test-recorder";
import { FindReplaceSanitizer } from "@azure-tools/test-recorder/types/src/utils/utils";
import { isDefined } from "@azure/core-util";
import { OpenAIClient } from "@azure/openai";
import {
  AzureKeyCredential,
  SearchClient,
  SearchIndexClient,
  SearchIndexerClient,
} from "../../../src";

export interface Clients<IndexModel extends object> {
  searchClient: SearchClient<IndexModel>;
  indexClient: SearchIndexClient;
  indexerClient: SearchIndexerClient;
  indexName: string;
  openAIClient: OpenAIClient;
}

interface Env {
  SEARCH_API_ADMIN_KEY: string;
  SEARCH_API_ADMIN_KEY_ALT: string;
  ENDPOINT: string;
  AZURE_OPENAI_DEPLOYMENT_NAME: string;
  AZURE_OPENAI_ENDPOINT: string;
  AZURE_OPENAI_KEY: string;
}

// modifies URIs in the environment to end in a trailing slash
const uriEnvVars = ["ENDPOINT", "AZURE_OPENAI_ENDPOINT"] as const;

function fixEnvironment(): RecorderStartOptions {
  const envSetupForPlayback = {
    SEARCH_API_ADMIN_KEY: "admin_key",
    SEARCH_API_ADMIN_KEY_ALT: "admin_key_alt",
    ENDPOINT: "https://subdomain.search.windows.net/",
    AZURE_OPENAI_DEPLOYMENT_NAME: "deployment-name",
    AZURE_OPENAI_ENDPOINT: "https://subdomain.openai.azure.com/",
    AZURE_OPENAI_KEY: "openai-key",
  };

  appendTrailingSlashesToEnvironment(envSetupForPlayback);
  const generalSanitizers = getSubdomainSanitizers();

  return {
    envSetupForPlayback,
    sanitizerOptions: {
      generalSanitizers,
    },
  };
}

function appendTrailingSlashesToEnvironment(envSetupForPlayback: Env): void {
  for (const envBag of [env, envSetupForPlayback]) {
    for (const name of uriEnvVars) {
      const value = envBag[name];
      if (value) {
        envBag[name] = value.endsWith("/") ? value : `${value}/`;
      }
    }
  }
}

function getSubdomainSanitizers(): FindReplaceSanitizer[] {
  const uriDomainMap: Pick<Env, (typeof uriEnvVars)[number]> = {
    ENDPOINT: "search.windows.net",
    AZURE_OPENAI_ENDPOINT: "openai.azure.com",
  };

  const subdomains = Object.entries(uriDomainMap)
    .map(([name, domain]) => {
      const uri = env[name];
      const subdomain = uri?.match(String.raw`\/\/(.*?)\.` + domain)?.[1];

      return subdomain;
    })
    .filter(isDefined);

  const generalSanitizers = subdomains.map((target) => {
    return {
      target,
      value: "subdomain",
    };
  });

  return generalSanitizers;
}

export async function createClients<IndexModel extends object>(
  serviceVersion: string,
  recorder: Recorder,
  indexName: string,
): Promise<Clients<IndexModel>> {
  const recorderOptions = fixEnvironment();
  await recorder.start(recorderOptions);

  indexName = recorder.variable("TEST_INDEX_NAME", indexName);
  const endPoint: string = assertEnvironmentVariable("ENDPOINT");
  const credential = new AzureKeyCredential(assertEnvironmentVariable("SEARCH_API_ADMIN_KEY"));
  const openAIEndpoint = assertEnvironmentVariable("AZURE_OPENAI_ENDPOINT");
  const openAIKey = new AzureKeyCredential(assertEnvironmentVariable("AZURE_OPENAI_KEY"));
  const searchClient = new SearchClient<IndexModel>(
    endPoint,
    indexName,
    credential,
    recorder.configureClientOptions({
      serviceVersion,
    }),
  );
  const indexClient = new SearchIndexClient(
    endPoint,
    credential,
    recorder.configureClientOptions({
      serviceVersion,
    }),
  );
  const indexerClient = new SearchIndexerClient(
    endPoint,
    credential,
    recorder.configureClientOptions({
      serviceVersion,
    }),
  );
  const openAIClient = new OpenAIClient(
    openAIEndpoint,
    openAIKey,
    recorder.configureClientOptions({}),
  );

  return {
    searchClient,
    indexClient,
    indexerClient,
    indexName,
    openAIClient,
  };
}

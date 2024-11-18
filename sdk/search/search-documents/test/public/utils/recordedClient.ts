// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createTestCredential } from "@azure-tools/test-credential";
import type { Recorder, RecorderStartOptions, SanitizerOptions } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable, env } from "@azure-tools/test-recorder";
import { isDefined } from "@azure/core-util";
import { OpenAIClient } from "@azure/openai";
import { SearchClient, SearchIndexClient, SearchIndexerClient } from "../../../src";

export interface Clients<IndexModel extends object> {
  searchClient: SearchClient<IndexModel>;
  indexClient: SearchIndexClient;
  indexerClient: SearchIndexerClient;
  indexName: string;
  openAIClient: OpenAIClient;
}

interface Env {
  ENDPOINT: string;
  AZURE_OPENAI_ENDPOINT: string;
}

// modifies URIs in the environment to end in a trailing slash
const uriEnvVars = ["ENDPOINT", "AZURE_OPENAI_ENDPOINT"] as const;

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

function createRecorderStartOptions(): RecorderStartOptions {
  const envSetupForPlayback = {
    ENDPOINT: "https://subdomain.search.windows.net/",
    AZURE_OPENAI_ENDPOINT: "https://subdomain.openai.azure.com/",
  };

  appendTrailingSlashesToEnvironment(envSetupForPlayback);
  const generalSanitizers = getSubdomainSanitizers();
  const bodyKeySanitizer = {
    jsonPath: "$..deploymentId",
    value: "deployment-name",
  };
  return {
    envSetupForPlayback,
    sanitizerOptions: {
      generalSanitizers,
      bodyKeySanitizers: [bodyKeySanitizer],
    },
  };
}

function getSubdomainSanitizers(): SanitizerOptions["generalSanitizers"] {
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
  const recorderOptions = createRecorderStartOptions();
  await recorder.start(recorderOptions);

  indexName = recorder.variable("TEST_INDEX_NAME", indexName);

  const credential = createTestCredential();

  const endPoint: string = assertEnvironmentVariable("ENDPOINT");
  const openAIEndpoint = assertEnvironmentVariable("AZURE_OPENAI_ENDPOINT");

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
    credential,
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

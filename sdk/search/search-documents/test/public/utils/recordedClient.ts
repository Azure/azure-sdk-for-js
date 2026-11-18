// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createTestCredential } from "@azure-tools/test-credential";
import type { Recorder, RecorderStartOptions, SanitizerOptions } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable, env } from "@azure-tools/test-recorder";
import { isDefined } from "@azure/core-util";
import { SearchClient, SearchIndexClient, SearchIndexerClient } from "../../../src/index.js";

export interface Clients<IndexModel extends object> {
  searchClient: SearchClient<IndexModel>;
  indexClient: SearchIndexClient;
  indexerClient: SearchIndexerClient;
  indexName: string;
}

interface Env {
  ENDPOINT: string;
}

// modifies URIs in the environment to end in a trailing slash
const uriEnvVars = ["ENDPOINT"] as const;

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
    AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME: "deployment-name",
    AZURE_OPENAI_CHAT_DEPLOYMENT_NAME: "deployment-name",
    AZURE_OPENAI_CHAT_MODEL_NAME: "gpt-4o",
  };

  appendTrailingSlashesToEnvironment(envSetupForPlayback);
  const generalSanitizers = getSubdomainSanitizers();
  const bodyKeySanitizer = {
    jsonPath: "$..deploymentId",
    value: "deployment-name",
  };
  return {
    envSetupForPlayback,
    removeCentralSanitizers: ["AZSDK2021", "AZSDK3493", "AZSDK2030"],
    sanitizerOptions: {
      generalSanitizers,
      bodyKeySanitizers: [bodyKeySanitizer],
    },
  };
}

export function createSampleRecorderStartOptions(chatModel = "gpt-5-mini"): RecorderStartOptions {
  const options = createRecorderStartOptions();
  const storage =
    "ResourceId=/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/sample/providers/Microsoft.Storage/storageAccounts/samplestorage/;";
  return {
    ...options,
    removeCentralSanitizers: [...(options.removeCentralSanitizers ?? []), "AZSDK3430"],
    envSetupForPlayback: {
      ...options.envSetupForPlayback,
      AZURE_SEARCH_API_KEY: "sanitized-search-key",
      AZURE_OPENAI_API_KEY: "sanitized-provider-key",
      AZURE_OPENAI_CHAT_MODEL_NAME: "gpt-5-mini",
      AZURE_OPENAI_EMBEDDING_MODEL_NAME: "text-embedding-3-small",
      AZURE_OPENAI_GPT6_DEPLOYMENT_NAME: "deployment-name",
      AZURE_OPENAI_GPT6_MODEL_NAME: "gpt-6-sol",
      AZURE_BLOB_CONNECTION_STRING: storage,
      AZURE_BLOB_CONTAINER_NAME: "sample-graph-fixture",
      AZURE_BLOB_FOLDER_PATH: "graph-fixture",
      AZURE_GRAPH_CACHE_CONNECTION_STRING: storage,
      GRAPH_RETRIEVAL_QUERY: "Using the knowledge graph, which organizations operate the hotels?",
      OPENAI_COMPATIBLE_CHAT_URI:
        "https://subdomain.openai.azure.com/openai/deployments/deployment-name/chat/completions?api-version=2025-04-01-preview",
      OPENAI_COMPATIBLE_CHAT_MODEL_NAME: "gpt-5-mini",
      OPENAI_COMPATIBLE_EMBEDDINGS_URI:
        "https://subdomain.openai.azure.com/openai/deployments/deployment-name/embeddings?api-version=2024-02-01",
      OPENAI_COMPATIBLE_EMBEDDING_MODEL_NAME: "text-embedding-3-small",
      OPENAI_COMPATIBLE_EMBEDDING_DIMENSIONS: "1536",
      OPENAI_COMPATIBLE_API_KEY: "sanitized-provider-key",
      OPENAI_COMPATIBLE_AUTH_HEADER: "api-key",
      SEARCH_SKILL_CHAT_URI:
        "https://subdomain.openai.azure.com/openai/deployments/deployment-name/chat/completions?api-version=2025-04-01-preview",
      SEARCH_SKILL_CHAT_API_KEY: "sanitized-provider-key",
    },
    sanitizerOptions: {
      ...options.sanitizerOptions,
      generalSanitizers: [
        ...(options.sanitizerOptions?.generalSanitizers ?? []),
        ...[env.AZURE_BLOB_CONNECTION_STRING, env.AZURE_GRAPH_CACHE_CONNECTION_STRING].flatMap(
          (connection) => {
            const account = connection?.match(/\/storageAccounts\/([^/;]+)/i)?.[1];
            return account ? [{ target: account, value: "samplestorage" }] : [];
          },
        ),
      ],
      bodySanitizers: [
        ...(options.sanitizerOptions?.bodySanitizers ?? []),
        {
          regex: true,
          target: "aHR0cHM6Ly9[A-Za-z0-9_+/=-]{30,}",
          value: "sanitized-blob-location",
        },
      ],
      bodyKeySanitizers: [
        ...(options.sanitizerOptions?.bodyKeySanitizers ?? []),
        { jsonPath: "$.models[*].azureOpenAIParameters.modelName", value: chatModel },
        { jsonPath: "$..chatCompletionModel.azureOpenAIParameters.modelName", value: "gpt-5-mini" },
        {
          jsonPath: "$..embeddingModel.azureOpenAIParameters.modelName",
          value: "text-embedding-3-small",
        },
        {
          jsonPath: "$..embeddingModel.openAICompatibleParameters.modelName",
          value: "text-embedding-3-small",
        },
        {
          jsonPath: "$..chatCompletionModel.openAICompatibleParameters.modelName",
          value: "gpt-5-mini",
        },
        {
          jsonPath: "$.vectorSearch.vectorizers[*].azureOpenAIParameters.modelName",
          value: "text-embedding-3-small",
        },
        { jsonPath: "$.models[*].openAICompatibleParameters.modelName", value: "gpt-5-mini" },
        {
          jsonPath: "$.vectorSearch.vectorizers[*].openAICompatibleParameters.modelName",
          value: "text-embedding-3-small",
        },
        { jsonPath: "$..sourceData.uid", value: "sanitized-chunk" },
        { jsonPath: "$..citationUrl", value: "https://subdomain.search.windows.net/citation" },
      ],
    },
  };
}

function getSubdomainSanitizers(): SanitizerOptions["generalSanitizers"] {
  const uriDomainMap = {
    ENDPOINT: String.raw`(?:search\.windows\.net|search-ppe\.windows-int\.net)`,
    AZURE_OPENAI_ENDPOINT: String.raw`openai\.azure\.com`,
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

  return [
    ...generalSanitizers,
    {
      target: "search-ppe.windows-int.net",
      value: "search.windows.net",
    },
  ];
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

  return {
    searchClient,
    indexClient,
    indexerClient,
    indexName,
  };
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Recorder,
  RecorderStartOptions,
  assertEnvironmentVariable,
} from "@azure-tools/test-recorder";
import { Test } from "mocha";
import OpenAI from "openai";
import { ClientOptions } from "openai";
import {
  EnvironmentVariableNames,
  EnvironmentVariableNamesForEmbedding,
  EnvironmentVariableNamesForCompletions,
  EnvironmentVariableNamesForDalle,
  EnvironmentVariableNamesForWhisper,
} from "./envVars.js";

type DeploymentType = "dalle" | "whisper" | "completions" | "embedding";

const envSetupForPlayback: { [k: string]: string } = {
  [EnvironmentVariableNames.OPENAI_KEY]: "openai_api_key",
  [EnvironmentVariableNames.AZURE_API_KEY_DALLE]: "azure_api_key",
  [EnvironmentVariableNames.AZURE_API_KEY_WHISPER]: "azure_api_key",
  [EnvironmentVariableNames.AZURE_API_KEY_COMPLETIONS]: "azure_api_key",
  [EnvironmentVariableNames.ENDPOINT_DALLE]: "https://endpoint/",
  [EnvironmentVariableNames.ENDPOINT_WHISPER]: "https://endpoint/",
  [EnvironmentVariableNames.ENDPOINT_COMPLETIONS]: "https://endpoint/",
  [EnvironmentVariableNames.RESOURCE_GROUP]: "resource_group",
  [EnvironmentVariableNames.ACCOUNT_NAME_DALLE]: "account_name",
  [EnvironmentVariableNames.ACCOUNT_NAME_WHISPER]: "account_name",
  [EnvironmentVariableNames.ACCOUNT_NAME_COMPLETIONS]: "account_name",
  [EnvironmentVariableNames.SUBSCRIPTION_ID]: "subscription_id",
  [EnvironmentVariableNames.AZURE_SEARCH_ENDPOINT]: "azure_search_endpoint",
  [EnvironmentVariableNames.AZURE_SEARCH_KEY]: "azure_search_key",
  [EnvironmentVariableNames.AZURE_SEARCH_INDEX]: "azure_search_index",
};

const recorderStartOptions: RecorderStartOptions = {
  envSetupForPlayback,
  sanitizerOptions: {
    generalSanitizers: [
      {
        regex: true,
        target: `\\.png?[^"]+`,
        value: ".png?sanitized",
      },
    ],
  },
};

const environmentVariableNamesForResourceType = {
  dalle: EnvironmentVariableNamesForDalle,
  whisper: EnvironmentVariableNamesForWhisper,
  completions: EnvironmentVariableNamesForCompletions,
  embedding: EnvironmentVariableNamesForEmbedding,
};

// TODO: move apiVersion to the matrix, potentially test latest preview & stable versions
const apiVersion = "2024-02-15-preview";

// TODO update client to Azure client
export function createClient(resourceType: DeploymentType, clientOptions?: ClientOptions): OpenAI {
  const { endpoint, azureApiKey, deployment } = getEndpointAndAPIKeyFromResourceType(resourceType);
  return new OpenAI({
    apiKey: clientOptions?.apiKey ?? azureApiKey,
    baseURL: `${endpoint}/openai/deployments/${deployment}`,
    defaultQuery: { "api-version": apiVersion },
    defaultHeaders: { "api-key": azureApiKey },
    dangerouslyAllowBrowser: true,
    ...clientOptions,
  });
}

function getEndpointAndAPIKeyFromResourceType(resourceType: DeploymentType): {
  endpoint: string;
  azureApiKey: string;
  deployment: string;
} {
  switch (resourceType) {
    case "dalle":
      return {
        endpoint: assertEnvironmentVariable(
          environmentVariableNamesForResourceType[resourceType].ENDPOINT_DALLE,
        ),
        azureApiKey: assertEnvironmentVariable(
          environmentVariableNamesForResourceType[resourceType].AZURE_API_KEY_DALLE,
        ),
        // TODO: remove deployment once the client is not tied to a specific one
        deployment: environmentVariableNamesForResourceType[resourceType].DEPLOYMENT_NAME_DALLE,
      };
    case "whisper":
      return {
        endpoint: assertEnvironmentVariable(
          environmentVariableNamesForResourceType[resourceType].ENDPOINT_WHISPER,
        ),
        azureApiKey: assertEnvironmentVariable(
          environmentVariableNamesForResourceType[resourceType].AZURE_API_KEY_WHISPER,
        ),
        deployment: environmentVariableNamesForResourceType[resourceType].DEPLOYMENT_NAME_WHISPER,
      };
    case "completions":
      return {
        endpoint: assertEnvironmentVariable(
          environmentVariableNamesForResourceType[resourceType].ENDPOINT_COMPLETIONS,
        ),
        azureApiKey: assertEnvironmentVariable(
          environmentVariableNamesForResourceType[resourceType].AZURE_API_KEY_COMPLETIONS,
        ),
        deployment:
          environmentVariableNamesForResourceType[resourceType].DEPLOYMENT_NAME_COMPLETIONS,
      };
    case "embedding":
      return {
        endpoint: assertEnvironmentVariable(
          environmentVariableNamesForResourceType[resourceType].ENDPOINT_EMBEDDINGS,
        ),
        azureApiKey: assertEnvironmentVariable(
          environmentVariableNamesForResourceType[resourceType].AZURE_API_KEY_EMBEDDINGS,
        ),
        deployment:
          environmentVariableNamesForResourceType[resourceType].DEPLOYMENT_NAME_EMBEDDINGS,
      };
  }
}

/**
 * starts the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function startRecorder(currentTest?: Test): Promise<Recorder> {
  const recorder = new Recorder(currentTest);
  await recorder.start(recorderStartOptions);
  await recorder.setMatcher("CustomDefaultMatcher", { excludedHeaders: ["Accept-Language"] });
  return recorder;
}

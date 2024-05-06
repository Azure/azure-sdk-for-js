// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Recorder,
  RecorderStartOptions,
  assertEnvironmentVariable,
} from "@azure-tools/test-recorder";
import { Test } from "mocha";
import { AzureClientOptions, AzureOpenAI } from "openai";
import { getBearerTokenProvider, DefaultAzureCredential } from "@azure/identity";
import {
  EnvironmentVariableNames,
  EnvironmentVariableNamesForEmbedding,
  EnvironmentVariableNamesForCompletions,
  EnvironmentVariableNamesForDalle,
  EnvironmentVariableNamesForWhisper,
} from "./envVars.js";

export type AuthMethod = "AzureAPIKey" | "OpenAIKey" | "AAD" | "DummyAPIKey";
type DeploymentType = "dalle" | "whisper" | "completions" | "embedding";

const scope = "https://cognitiveservices.azure.com/.default";

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
export function createClient(
  authMethod: AuthMethod,
  resourceType: DeploymentType,
  clientOptions?: AzureClientOptions,
): AzureOpenAI {
  const { endpoint, azureApiKey } = getEndpointAndAPIKeyFromResourceType(resourceType);

  switch (authMethod) {
    case "AzureAPIKey": {
      return new AzureOpenAI({
        apiKey: clientOptions?.apiKey ?? azureApiKey,
        apiVersion,
        endpoint,
        dangerouslyAllowBrowser: true,
        ...clientOptions,
      });
    }
    case "OpenAIKey": {
      throw Error("client not enabled");
      // TODO: enable OpenAI client
      // return new OpenAI({
      //   apiKey: clientOptions?.apiKey ?? azureApiKey,
      //   ...clientOptions,}
      // );
    }
    case "AAD": {
      const credential = new DefaultAzureCredential();
      return new AzureOpenAI({
        azureADTokenProvider: getBearerTokenProvider(credential, scope),
        apiVersion,
        endpoint,
        dangerouslyAllowBrowser: true,
        ...clientOptions,
      });
    }
    case "DummyAPIKey": {
      return new AzureOpenAI({
        apiKey: clientOptions?.apiKey ?? azureApiKey,
        apiVersion,
        endpoint,
        dangerouslyAllowBrowser: true,
        ...clientOptions,
      });
    }
    default: {
      throw Error(`Unsupported authentication method: ${authMethod}`);
    }
  }
}

function getEndpointAndAPIKeyFromResourceType(resourceType: DeploymentType): {
  endpoint: string;
  azureApiKey: string;
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
      };
    case "whisper":
      return {
        endpoint: assertEnvironmentVariable(
          environmentVariableNamesForResourceType[resourceType].ENDPOINT_WHISPER,
        ),
        azureApiKey: assertEnvironmentVariable(
          environmentVariableNamesForResourceType[resourceType].AZURE_API_KEY_WHISPER,
        ),
      };
    case "completions":
      return {
        endpoint: assertEnvironmentVariable(
          environmentVariableNamesForResourceType[resourceType].ENDPOINT_COMPLETIONS,
        ),
        azureApiKey: assertEnvironmentVariable(
          environmentVariableNamesForResourceType[resourceType].AZURE_API_KEY_COMPLETIONS,
        ),
      };
    case "embedding":
      return {
        endpoint: assertEnvironmentVariable(
          environmentVariableNamesForResourceType[resourceType].ENDPOINT_EMBEDDINGS,
        ),
        azureApiKey: assertEnvironmentVariable(
          environmentVariableNamesForResourceType[resourceType].AZURE_API_KEY_EMBEDDINGS,
        ),
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

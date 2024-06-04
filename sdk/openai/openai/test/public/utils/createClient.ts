// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Recorder,
  RecorderStartOptions,
  assertEnvironmentVariable,
} from "@azure-tools/test-recorder";
import { Test } from "mocha";
import OpenAI, { AzureClientOptions, AzureOpenAI } from "openai";
import { getBearerTokenProvider, DefaultAzureCredential } from "@azure/identity";
import {
  EnvironmentVariableNames,
  EnvironmentVariableNamesForCompletions,
  EnvironmentVariableNamesForDalle,
  EnvironmentVariableNamesForWhisper,
} from "./envVars.js";
import { AuthMethod, DeploymentType } from "./utils.js";

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
};

// TODO: move apiVersion to the matrix, potentially test latest preview & stable versions
const apiVersion = "2024-02-15-preview";

export function createClient(
  authMethod: AuthMethod,
  resourceType: DeploymentType,
  clientOptions?: AzureClientOptions,
): AzureOpenAI | OpenAI {
  const { endpoint } = getEndpointFromResourceType(resourceType);
  switch (authMethod) {
    case "AAD": {
      const credential = new DefaultAzureCredential();
      return new AzureOpenAI({
        azureADTokenProvider: getBearerTokenProvider(credential, scope),
        apiVersion,
        endpoint,
        ...clientOptions,
      });
    }
    case "DummyAPIKey": {
      return new AzureOpenAI({
        apiKey: clientOptions?.apiKey,
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

function getEndpointFromResourceType(resourceType: DeploymentType): {
  endpoint: string;
} {
  switch (resourceType) {
    case "dalle":
      return {
        endpoint: assertEnvironmentVariable(
          environmentVariableNamesForResourceType[resourceType].ENDPOINT_DALLE,
        ),
      };
    case "whisper":
      return {
        endpoint: assertEnvironmentVariable(
          environmentVariableNamesForResourceType[resourceType].ENDPOINT_WHISPER,
        ),
      };
    case "completions":
      return {
        endpoint: assertEnvironmentVariable(
          environmentVariableNamesForResourceType[resourceType].ENDPOINT_COMPLETIONS,
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

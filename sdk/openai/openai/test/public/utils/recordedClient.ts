// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OpenAIClient, OpenAIKeyCredential } from "../../../src/index.js";
import {
  Recorder,
  RecorderStartOptions,
  assertEnvironmentVariable,
} from "@azure-tools/test-recorder";
import { Test } from "mocha";
import { createTestCredential } from "@azure-tools/test-credential";
import { ClientOptions } from "@azure-rest/core-client";
import { AzureKeyCredential } from "@azure/core-auth";
import {
  EnvironmentVariableNames,
  EnvironmentVariableNamesForDalle,
  EnvironmentVariableNamesForWhisper,
  EnvironmentVariableNamesForCompletions,
} from "./envVars.js";
import { AuthMethod, DeploymentType } from "../types.js";

const envSetupForPlayback: { [k: string]: string } = {
  [EnvironmentVariableNames.OPENAI_API_KEY]: "openai_api_key",
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
  [EnvironmentVariableNames.ENDPOINT_SEARCH]: "azure_search_endpoint",
  [EnvironmentVariableNames.AZURE_API_KEY_SEARCH]: "azure_search_key",
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

function getEndpointAndAPIKeyFromResourceType(resourceType: DeploymentType): {
  endpoint: string;
  apiKey: string;
} {
  switch (resourceType) {
    case "dalle":
      return {
        endpoint: assertEnvironmentVariable(
          environmentVariableNamesForResourceType[resourceType].ENDPOINT_DALLE
        ),
        apiKey: assertEnvironmentVariable(
          environmentVariableNamesForResourceType[resourceType].AZURE_API_KEY_DALLE
        ),
      };
    case "whisper":
      return {
        endpoint: assertEnvironmentVariable(
          environmentVariableNamesForResourceType[resourceType].ENDPOINT_WHISPER
        ),
        apiKey: assertEnvironmentVariable(
          environmentVariableNamesForResourceType[resourceType].AZURE_API_KEY_WHISPER
        ),
      };
    case "completions":
      return {
        endpoint: assertEnvironmentVariable(
          environmentVariableNamesForResourceType[resourceType].ENDPOINT_COMPLETIONS
        ),
        apiKey: assertEnvironmentVariable(
          environmentVariableNamesForResourceType[resourceType].AZURE_API_KEY_COMPLETIONS
        ),
      };
  }
}

export function createClient(
  authMethod: AuthMethod,
  resourceType: DeploymentType,
  options: {
    recorder?: Recorder;
    clientOptions?: ClientOptions;
  }
): OpenAIClient {
  const { recorder, clientOptions = {} } = options;
  const updatedOptions = recorder ? recorder.configureClientOptions(clientOptions) : clientOptions;
  const { endpoint, apiKey } = getEndpointAndAPIKeyFromResourceType(resourceType);

  switch (authMethod) {
    case "AzureAPIKey": {
      return new OpenAIClient(endpoint, new AzureKeyCredential(apiKey), updatedOptions);
    }
    case "OpenAIKey": {
      return new OpenAIClient(
        new OpenAIKeyCredential(assertEnvironmentVariable(EnvironmentVariableNames.OPENAI_API_KEY)),
        updatedOptions
      );
    }
    case "AAD": {
      return new OpenAIClient(endpoint, createTestCredential(), updatedOptions);
    }
    case "DummyAPIKey": {
      return new OpenAIClient(endpoint, new AzureKeyCredential("whatever"), updatedOptions);
    }
    default: {
      throw Error(`Unsupported authentication method: ${authMethod}`);
    }
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

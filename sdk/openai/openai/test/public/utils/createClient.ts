// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Recorder,
  RecorderStartOptions,
  TestInfo,
  assertEnvironmentVariable,
} from "@azure-tools/test-recorder";
import OpenAI, { AzureClientOptions, AzureOpenAI } from "openai";
import { getBearerTokenProvider } from "@azure/identity";
import {
  EnvironmentVariableNames,
  EnvironmentVariableNamesForCompletions,
  EnvironmentVariableNamesForDalle,
  EnvironmentVariableNamesForWhisper,
} from "./envVars.js";
import { APIVersion, DeploymentType } from "./utils.js";
import { createTestCredential } from "@azure-tools/test-credential";

const scope = "https://cognitiveservices.azure.com/.default";

const envSetupForPlayback: { [k: string]: string } = {
  [EnvironmentVariableNames.ENDPOINT_DALLE]: "https://endpoint/",
  [EnvironmentVariableNames.ENDPOINT_WHISPER]: "https://endpoint/",
  [EnvironmentVariableNames.ENDPOINT_COMPLETIONS]: "https://endpoint/",
  [EnvironmentVariableNames.RESOURCE_GROUP]: "resource_group",
  [EnvironmentVariableNames.ACCOUNT_NAME_DALLE]: "account_name",
  [EnvironmentVariableNames.ACCOUNT_NAME_WHISPER]: "account_name",
  [EnvironmentVariableNames.ACCOUNT_NAME_COMPLETIONS]: "account_name",
  [EnvironmentVariableNames.SUBSCRIPTION_ID]: "subscription_id",
  [EnvironmentVariableNames.AZURE_SEARCH_ENDPOINT]: "azure_search_endpoint",
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

export function createClient(
  apiVersion: APIVersion,
  resourceType: DeploymentType,
  clientOptions?: AzureClientOptions,
): AzureOpenAI | OpenAI {
  const { endpoint } = getEndpointFromResourceType(resourceType);
  switch (apiVersion) {
    case APIVersion.Preview:
    case APIVersion.Stable: {
      const credential = createTestCredential();
      return new AzureOpenAI({
        azureADTokenProvider: getBearerTokenProvider(credential, scope),
        apiVersion,
        endpoint,
        ...clientOptions,
      });
    }
    case APIVersion.OpenAI: {
      return new OpenAI();
    }
    default: {
      throw Error(`Unsupported authentication method: ${apiVersion}`);
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
export async function startRecorder(currentTest?: TestInfo): Promise<Recorder> {
  const recorder = new Recorder(currentTest);
  await recorder.start(recorderStartOptions);
  await recorder.setMatcher("CustomDefaultMatcher", { excludedHeaders: ["Accept-Language"] });
  return recorder;
}

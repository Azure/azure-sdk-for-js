// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Recorder,
  RecorderStartOptions,
  TestInfo,
  assertEnvironmentVariable,
} from "@azure-tools/test-recorder";
import OpenAI, { AzureClientOptions, AzureOpenAI } from "openai";
import { AzurePipelinesCredential, getBearerTokenProvider, TokenCredential } from "@azure/identity";
import {
  EnvironmentVariableNames,
  EnvironmentVariableNamesForCompletions,
  EnvironmentVariableNamesForVision,
  EnvironmentVariableNamesForAudio,
} from "./envVars.js";
import { APIVersion, DeploymentType } from "./utils.js";
import { createTestCredential } from "@azure-tools/test-credential";

const scope = "https://cognitiveservices.azure.com/.default";

const envSetupForPlayback: { [k: string]: string } = {
  [EnvironmentVariableNames.ENDPOINT_VISION]: "https://endpoint/",
  [EnvironmentVariableNames.ENDPOINT_AUDIO]: "https://endpoint/",
  [EnvironmentVariableNames.ENDPOINT_COMPLETIONS]: "https://endpoint/",
  [EnvironmentVariableNames.RESOURCE_GROUP]: "resource_group",
  [EnvironmentVariableNames.ACCOUNT_NAME_VISION]: "account_name",
  [EnvironmentVariableNames.ACCOUNT_NAME_AUDIO]: "account_name",
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
  vision: EnvironmentVariableNamesForVision,
  audio: EnvironmentVariableNamesForAudio,
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
      const systemAccessToken = process.env.SYSTEM_ACCESSTOKEN;
      let credential: TokenCredential;
      // If we have a system access token, we are in Azure Pipelines
      if (systemAccessToken) {
        const serviceConnectionID = process.env.AZURESUBSCRIPTION_SERVICE_CONNECTION_ID;
        const clientID = process.env.AZURESUBSCRIPTION_CLIENT_ID;
        const tenantID = process.env.AZURESUBSCRIPTION_TENANT_ID;
        if (serviceConnectionID && clientID && tenantID) {
          credential = new AzurePipelinesCredential(
            tenantID,
            clientID,
            serviceConnectionID,
            systemAccessToken
          );
        } else {
          throw new Error(`Running in Azure Pipelines environment. Missing environment variables: 
            serviceConnectionID: ${serviceConnectionID}, tenantID: ${tenantID}, clientID: ${clientID}`);
        }
      } else {
        credential = createTestCredential();
      }
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
      throw Error(`Unsupported service API version: ${apiVersion}`);
    }
  }
}

function getEndpointFromResourceType(resourceType: DeploymentType): {
  endpoint: string;
} {
  switch (resourceType) {
    case "vision":
      return {
        endpoint: assertEnvironmentVariable(
          environmentVariableNamesForResourceType[resourceType].ENDPOINT_VISION,
        ),
      };
    case "audio":
      return {
        endpoint: assertEnvironmentVariable(
          environmentVariableNamesForResourceType[resourceType].ENDPOINT_AUDIO,
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

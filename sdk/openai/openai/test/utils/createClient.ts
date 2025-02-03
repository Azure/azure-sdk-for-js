// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import OpenAI, { type AzureClientOptions, AzureOpenAI } from "openai";
import { getBearerTokenProvider } from "@azure/identity";
import { APIVersion, type DeploymentType } from "./utils.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { getEndpointAudio, getEndpointCompletions, getEndpointVision } from "./injectables.js";

const scope = "https://cognitiveservices.azure.com/.default";
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
        endpoint: getEndpointVision(),
      };
    case "audio":
      return {
        endpoint: getEndpointAudio(),
      };
    case "completions":
      return {
        endpoint: getEndpointCompletions(),
      };
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import OpenAI from "openai";
import { ClientOptions } from "openai";
import { EnvironmentVariableNamesForEmbedding, EnvironmentVariableNamesForCompletions, EnvironmentVariableNamesForDalle, EnvironmentVariableNamesForWhisper } from "./envVars";

type DeploymentType = "dalle" | "whisper" | "completions" | "embedding";
const environmentVariableNamesForResourceType = {
  dalle: EnvironmentVariableNamesForDalle,
  whisper: EnvironmentVariableNamesForWhisper,
  completions: EnvironmentVariableNamesForCompletions,
  embedding: EnvironmentVariableNamesForEmbedding,
};
const apiVersion = "2024-02-15-preview"
export function createClient(resourceType: DeploymentType, clientOptions?: ClientOptions): OpenAI {
  const { endpoint, azureApiKey, deployment } = getEndpointAndAPIKeyFromResourceType(resourceType)
  return new OpenAI({
    apiKey: clientOptions?.apiKey ?? azureApiKey,
    baseURL: `${endpoint}/openai/deployments/${deployment}`,
    defaultQuery: { 'api-version': apiVersion },
    defaultHeaders: { 'api-key': azureApiKey },
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
        deployment: environmentVariableNamesForResourceType[resourceType].DEPLOYMENT_NAME_COMPLETIONS,
      };
    case "embedding":
      return {
        endpoint: assertEnvironmentVariable(
          environmentVariableNamesForResourceType[resourceType].ENDPOINT_EMBEDDINGS,
        ),
        azureApiKey: assertEnvironmentVariable(
          environmentVariableNamesForResourceType[resourceType].AZURE_API_KEY_EMBEDDINGS,
        ),
        deployment: environmentVariableNamesForResourceType[resourceType].DEPLOYMENT_NAME_EMBEDDINGS,
      };
  }
}

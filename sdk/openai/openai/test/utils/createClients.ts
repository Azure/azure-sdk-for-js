// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureOpenAI } from "openai";
import { getBearerTokenProvider } from "@azure/identity";
import { APIVersion, filterDeployments } from "./utils.js";
import { createLiveCredential } from "@azure-tools/test-credential";
import { getResourcesInfo } from "./injectables.js";
import type {
  ClientsAndDeploymentsInfo,
  CreateClientOptions,
  FilterDeploymentOptions,
  ModelCapabilities,
} from "./types.js";

const scope = "https://cognitiveservices.azure.com/.default";

export function createClientsAndDeployments(
  apiVersion: APIVersion,
  capabilities: ModelCapabilities,
  options: CreateClientOptions = {},
): ClientsAndDeploymentsInfo {
  const { clientOptions, sku, deploymentsToSkip, modelsToSkip } = options;
  const { resourcesInfo } = getResourcesInfo();
  const credential = createLiveCredential();
  const azureADTokenProvider = getBearerTokenProvider(credential, scope);
  switch (apiVersion) {
    case APIVersion["2024_10_01_preview"]:
    case APIVersion.Preview:
    case APIVersion.Stable: {
      const { resourcesInfo: filtered, count } = filterDeployments(resourcesInfo, {
        capabilities,
        sku,
        deploymentsToSkip,
        modelsToSkip,
      });
      const clientsAndDeployments = filtered.map(({ deployments, endpoint }) => ({
        client: new AzureOpenAI({
          azureADTokenProvider,
          apiVersion,
          endpoint,
          ...clientOptions,
        }),
        deployments,
      }));
      return { clientsAndDeployments, count };
    }
    default: {
      throw Error(`Unsupported service API version: ${apiVersion}`);
    }
  }
}

export function filterClientsAndDeployments(
  clientsInfo: ClientsAndDeploymentsInfo,
  capabilities: ModelCapabilities,
  options: FilterDeploymentOptions = {},
): ClientsAndDeploymentsInfo {
  const { sku, deploymentsToSkip, modelsToSkip } = options;
  const { resourcesInfo: clientsAndDeployments, count } = filterDeployments(
    clientsInfo.clientsAndDeployments,
    {
      capabilities,
      sku,
      deploymentsToSkip,
      modelsToSkip,
    },
  );

  return { clientsAndDeployments, count };
}

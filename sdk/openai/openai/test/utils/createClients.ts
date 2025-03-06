// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import OpenAI, { AzureOpenAI } from "openai";
import { getBearerTokenProvider } from "@azure/identity";
import { APIVersion, filterDeployments } from "./utils.js";
import { createLiveCredential } from "@azure-tools/test-credential";
import { getResourcesInfo } from "./injectables.js";
import type { ClientsAndDeploymentsInfo, CreateClientOptions, ModelCapabilities } from "./types.js";

const scope = "https://cognitiveservices.azure.com/.default";

export function createClientsAndDeployments(
  apiVersion: APIVersion,
  capabilities: ModelCapabilities,
  options: CreateClientOptions = {},
): ClientsAndDeploymentsInfo {
  const { clientOptions, sku, deploymentsToSkip, modelsToSkip } = options;
  const { resourcesInfo } = getResourcesInfo();
  switch (apiVersion) {
    case APIVersion["2024_10_01_preview"]:
    case APIVersion.Preview:
    case APIVersion.Stable: {
      const credential = createLiveCredential();
      const azureADTokenProvider = getBearerTokenProvider(credential, scope);
      let count = 0;
      const clientsAndDeployments = filterDeployments(resourcesInfo, {
        capabilities,
        sku,
        deploymentsToSkip,
        modelsToSkip,
      }).map(({ deployments, endpoint }) => {
        count += deployments.length;
        return {
          client: new AzureOpenAI({
            azureADTokenProvider,
            apiVersion,
            endpoint,
            ...clientOptions,
          }),
          deployments,
        };
      });
      return { clientsAndDeployments, count };
    }
    case APIVersion.OpenAI: {
      return { clientsAndDeployments: [{ client: new OpenAI(), deployments: [] }], count: 0 };
    }
    default: {
      throw Error(`Unsupported service API version: ${apiVersion}`);
    }
  }
}

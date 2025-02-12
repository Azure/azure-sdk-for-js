// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import OpenAI, { AzureOpenAI } from "openai";
import { getBearerTokenProvider } from "@azure/identity";
import { APIVersion, filterDeployments } from "./utils.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { getResourcesInfo } from "./injectables.js";
import type { ClientsAndDeploymentsInfo, CreateClientOptions, ModelCapabilities } from "./types.js";

const scope = "https://cognitiveservices.azure.com/.default";

export function createClientsAndDeployments(
  apiVersion: APIVersion,
  capabilities: ModelCapabilities,
  options: CreateClientOptions = {},
): ClientsAndDeploymentsInfo {
  const { clientOptions, sku, deploymentsToSkip, modelsToSkip, createClientWithDeployment } =
    options;
  const { resourcesInfo } = getResourcesInfo();
  switch (apiVersion) {
    case APIVersion.Realtime:
    case APIVersion.Preview:
    case APIVersion.Stable: {
      const credential = createTestCredential();
      const azureADTokenProvider = getBearerTokenProvider(credential, scope);
      let count = 0;
      const clientsAndDeployments = filterDeployments(resourcesInfo, {
        capabilities,
        sku,
        deploymentsToSkip,
        modelsToSkip,
      }).map(({ deployments, endpoint }) => {
        count += deployments.length;
        // Create a list of client that is bind to a deployment if createClientWithDeployment is true
        const clientsWithDeployment: OpenAI[] = [];
        if (createClientWithDeployment) {
          for (const deployment of deployments) {
            clientsWithDeployment.push(
              new AzureOpenAI({
                azureADTokenProvider,
                apiVersion,
                endpoint,
                deployment: deployment.deploymentName,
                ...clientOptions,
              }),
            );
          }
        }
        return {
          client: new AzureOpenAI({
            azureADTokenProvider,
            apiVersion,
            endpoint,
            ...clientOptions,
          }),
          deployments,
          clientsWithDeployment,
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

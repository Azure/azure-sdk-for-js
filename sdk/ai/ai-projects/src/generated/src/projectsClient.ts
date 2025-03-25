// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "./logger.js";
import { TokenCredential } from "@azure/core-auth";
import { ProjectsClient } from "./clientDefinitions.js";

/** The optional parameters for the client */
export interface ProjectsClientOptions extends ClientOptions {
  /** The api version option of the client */
  apiVersion?: string;
}

/**
 * Initialize a new instance of `ProjectsClient`
 * @param endpointParam - The Azure AI Foundry project endpoint, in the form `https://<azure-region>.api.azureml.ms` or `https://<private-link-guid>.<azure-region>.api.azureml.ms`, where <azure-region> is the Azure region where the project is deployed (e.g. westus) and <private-link-guid> is the GUID of the Enterprise private link.
 * @param subscriptionId - The Azure subscription ID.
 * @param resourceGroupName - The name of the Azure Resource Group.
 * @param projectName - The Azure AI Foundry project name.
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpointParam: string,
  subscriptionId: string,
  resourceGroupName: string,
  projectName: string,
  credentials: TokenCredential,
  { apiVersion = "2024-07-01-preview", ...options }: ProjectsClientOptions = {},
): ProjectsClient {
  const endpointUrl =
    options.endpoint ??
    options.baseUrl ??
    `${endpointParam}/agents/v1.0/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/${projectName}`;
  const userAgentInfo = `azsdk-js-ai-projects-rest/1.0.0-beta.1`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix,
    },
    loggingOptions: {
      logger: options.loggingOptions?.logger ?? logger.info,
    },
    credentials: {
      scopes: options.credentials?.scopes ?? [
        "https://management.azure.com/.default",
      ],
    },
  };
  const client = getClient(endpointUrl, credentials, options) as ProjectsClient;

  client.pipeline.removePolicy({ name: "ApiVersionPolicy" });
  client.pipeline.addPolicy({
    name: "ClientApiVersionPolicy",
    sendRequest: (req, next) => {
      // Use the apiVersion defined in request url directly
      // Append one if there is no apiVersion and we have one at client options
      const url = new URL(req.url);
      if (!url.searchParams.get("api-version") && apiVersion) {
        req.url = `${req.url}${
          Array.from(url.searchParams.keys()).length > 0 ? "&" : "?"
        }api-version=${apiVersion}`;
      }

      return next(req);
    },
  });

  return client;
}

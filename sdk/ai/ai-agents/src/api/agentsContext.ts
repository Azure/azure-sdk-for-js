// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import { KnownVersions } from "../models/models.js";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { KeyCredential, isKeyCredential, TokenCredential } from "@azure/core-auth";

export interface AgentsContext extends Client {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion: string;
}

/** Optional parameters for the client. */
export interface AgentsClientOptionalParams extends ClientOptions {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
}

export function createAgents(
  endpointParam: string,
  credential: KeyCredential | TokenCredential,
  options: AgentsClientOptionalParams = {},
): AgentsContext {
  const parts = endpointParam.split(";");
  let endpointUrl = endpointParam;
  if (parts.length === 4) {
    const endpoint = "https://" + parts[0];
    const subscriptionId = parts[1];
    const resourceGroupName = parts[2];
    const projectName = parts[3];
    endpointUrl =
      options.endpoint ??
      options.baseUrl ??
      `${endpoint}/agents/v1.0/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.MachineLearningServices/workspaces/${projectName}`;
  }
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-ai-agents/1.0.0-beta.1`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} azsdk-js-api ${userAgentInfo}`
    : `azsdk-js-api ${userAgentInfo}`;
  const { apiVersion: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: { logger: options.loggingOptions?.logger ?? logger.info },
    credentials: {
      scopes: options.credentials?.scopes ?? ["https://management.azure.com/.default"],
    },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);

  if (isKeyCredential(credential)) {
    clientContext.pipeline.addPolicy({
      name: "customKeyCredentialPolicy",
      sendRequest(request, next) {
        request.headers.set("Authorization", "Bearer " + credential.key);
        return next(request);
      },
    });
  }
  clientContext.pipeline.removePolicy({ name: "ApiVersionPolicy" });
  const apiVersion = options.apiVersion ?? "2025-05-15-preview";
  clientContext.pipeline.addPolicy({
    name: "ClientApiVersionPolicy",
    sendRequest: (req, next) => {
      // Use the apiVersion defined in request url directly
      // Append one if there is no apiVersion and we have one at client options
      const url = new URL(req.url);
      if (!url.searchParams.get("api-version")) {
        req.url = `${req.url}${
          Array.from(url.searchParams.keys()).length > 0 ? "&" : "?"
        }api-version=${apiVersion}`;
      }

      return next(req);
    },
  });
  return { ...clientContext, apiVersion } as AgentsContext;
}

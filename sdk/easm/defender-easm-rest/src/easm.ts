// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "./logger";
import { TokenCredential } from "@azure/core-auth";
import { EasmClient } from "./clientDefinitions";

/**
 * Initialize a new instance of `EasmClient`
 * @param endpoint - The endpoint hosting the requested resource. For example, https://{region}.easm.defender.microsoft.com
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the Resource Group.
 * @param workspaceName - The name of the Workspace.
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpoint: string,
  subscriptionId: string,
  resourceGroupName: string,
  workspaceName: string,
  credentials: TokenCredential,
  options: ClientOptions = {},
): EasmClient {
  const baseUrl =
    options.baseUrl ??
    `${endpoint}/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/workspaces/${workspaceName}`;
  options.apiVersion = options.apiVersion ?? "2023-03-01-preview";
  options = {
    ...options,
    credentials: {
      scopes: options.credentials?.scopes ?? ["https://easm.defender.microsoft.com/.default"],
    },
  };

  const userAgentInfo = `azsdk-js-defender-easm-rest/1.0.0-beta.2`;
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
  };

  const client = getClient(baseUrl, credentials, options) as EasmClient;

  return client;
}

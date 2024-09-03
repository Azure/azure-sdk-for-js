// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { PurviewWorkflowClient } from "./clientDefinitions";

/**
 * Initialize a new instance of `PurviewWorkflowClient`
 * @param endpoint type: string, The account endpoint of your Purview account. Example: https://{accountName}.purview.azure.com/
 * @param credentials type: TokenCredential, uniquely identify client credential
 * @param options type: ClientOptions, the parameter for all optional parameters
 */
export default function createClient(
  endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {},
): PurviewWorkflowClient {
  const baseUrl = options.baseUrl ?? `${endpoint}/workflow`;
  options.apiVersion = options.apiVersion ?? "2022-05-01-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://purview.azure.net/.default"],
    },
  };

  const userAgentInfo = `azsdk-js-purview-workflow-rest/1.0.0-beta.2`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix,
    },
  };

  const client = getClient(baseUrl, credentials, options) as PurviewWorkflowClient;

  return client;
}

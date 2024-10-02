// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { NetworkManagementClient } from "./clientDefinitions";

/**
 * Initialize a new instance of the class NetworkManagementClient class.
 * @param credentials type: TokenCredential
 */
export default function createClient(
  credentials: TokenCredential,
  options: ClientOptions = {},
): NetworkManagementClient {
  const baseUrl = options.baseUrl ?? `https://management.azure.com`;
  options = {
    ...options,
    credentials: {
      scopes: ["https://management.azure.com/.default"],
    },
  };

  const userAgentInfo = `azsdk-js-arm-network-rest/1.0.0-beta.1`;
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

  const client = getClient(baseUrl, credentials, options) as NetworkManagementClient;

  return client;
}

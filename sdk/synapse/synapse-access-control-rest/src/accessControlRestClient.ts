// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { AccessControlRestClient } from "./clientDefinitions";

export default function createClient(
  endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): AccessControlRestClient {
  const baseUrl = options.baseUrl ?? `${endpoint}`;
  options.apiVersion = options.apiVersion ?? "2020-12-01";
  options = {
    ...options,
    credentials: {
      scopes: ["https://dev.azuresynapse.net/.default"]
    }
  };

  const userAgentInfo = `azsdk-js-synapse-access-control-rest/1.0.0-beta.1`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix
    }
  };

  const client = getClient(
    baseUrl,
    credentials,
    options
  ) as AccessControlRestClient;

  return client;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { AzureLoadTestingClient } from "./clientDefinitions";

export default function createClient(
  Endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): AzureLoadTestingClient {
  const baseUrl = options.baseUrl ?? `https://${Endpoint}`;
  options.apiVersion = options.apiVersion ?? "2022-11-01";
  options = {
    ...options,
    credentials: {
      scopes: ["https://cnt-prod.loadtesting.azure.com/.default"],
    },
  };

  const userAgentInfo = `azsdk-js-load-testing-rest/1.0.0`;
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

  const client = getClient(baseUrl, credentials, options) as AzureLoadTestingClient;

  return client;
}

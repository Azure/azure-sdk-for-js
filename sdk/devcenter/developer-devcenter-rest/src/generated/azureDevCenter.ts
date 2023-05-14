// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { AzureDevCenterClient } from "./clientDefinitions";

/**
 * Initialize a new instance of the class AzureDevCenterClient class.
 * @param endpoint type: string The DevCenter-specific URI to operate on.
 * @param credentials type: TokenCredential
 */
export default function createClient(
  endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): AzureDevCenterClient {
  const baseUrl = options.baseUrl ?? `${endpoint}`;
  options.apiVersion = options.apiVersion ?? "2023-04-01";
  options = {
    ...options,
    credentials: {
      scopes: ["https://devcenter.azure.com/.default"]
    }
  };

  const userAgentInfo = `azsdk-js-developer-devcenter-rest/1.0.0`;
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
  ) as AzureDevCenterClient;

  return client;
}

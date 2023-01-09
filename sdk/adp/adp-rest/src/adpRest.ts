// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { AdpRestClient } from "./clientDefinitions";

/**
 * Initialize a new instance of the class AdpRestClient class.
 * @param endpoint type: string
 * @param credentials type: TokenCredential
 */
export default function createClient(
  endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): AdpRestClient {
  const baseUrl = options.baseUrl ?? `${endpoint}`;
  options.apiVersion = options.apiVersion ?? "2023-00-00-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://adp.azure.com/.default"],
    },
  };

  const userAgentInfo = `azsdk-js-adp-rest/1.0.0-beta.1`;
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

  const client = getClient(baseUrl, credentials, options) as AdpRestClient;

  return client;
}

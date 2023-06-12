// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "./logger";
import { TokenCredential } from "@azure/core-auth";
import { AzureLoadTestingClient } from "./clientDefinitions";

/**
 * Initialize a new instance of `AzureLoadTestingClient`
 * @param endpoint - A sequence of textual characters.
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): AzureLoadTestingClient {
  const baseUrl = options.baseUrl ?? `https://${endpoint}`;
  options.apiVersion = options.apiVersion ?? "2022-11-01";
  options = {
    ...options,
    credentials: {
      scopes: options.credentials?.scopes ?? [
        "https://cnt-prod.loadtesting.azure.com/.default",
      ],
    },
  };

  const userAgentInfo = `azsdk-js-load-testing-rest/1.0.1`;
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

  const client = getClient(
    baseUrl,
    credentials,
    options
  ) as AzureLoadTestingClient;

  return client;
}

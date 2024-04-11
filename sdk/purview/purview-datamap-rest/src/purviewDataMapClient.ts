// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "./logger";
import { TokenCredential } from "@azure/core-auth";
import { PurviewDataMapClient } from "./clientDefinitions";

/**
 * Initialize a new instance of `PurviewDataMapClient`
 * @param endpoint - A sequence of textual characters.
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {},
): PurviewDataMapClient {
  const baseUrl = options.baseUrl ?? `${endpoint}/datamap/api`;
  options.apiVersion = options.apiVersion ?? "2023-09-01";
  const userAgentInfo = `azsdk-js-purview-datamap-rest/1.0.0-beta.2`;
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
      scopes: options.credentials?.scopes ?? ["https://purview.azure.net/.default"],
    },
  };

  const client = getClient(baseUrl, credentials, options) as PurviewDataMapClient;

  return client;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "../logger";
import { KeyCredential } from "@azure/core-auth";
import { MapsSearchClient } from "./clientDefinitions";

/**
 * Initialize a new instance of `MapsSearchClient`
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  credentials: KeyCredential,
  options: ClientOptions = {}
): MapsSearchClient {
  const baseUrl = options.baseUrl ?? `https://atlas.microsoft.com`;
  options.apiVersion = options.apiVersion ?? "2023-06-01";
  const userAgentInfo = `azsdk-js-maps-search-rest/2.0.0-beta.1`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix
    },
    loggingOptions: {
      logger: options.loggingOptions?.logger ?? logger.info
    },
    credentials: {
      apiKeyHeaderName:
        options.credentials?.apiKeyHeaderName ?? "subscription-key"
    }
  };

  const client = getClient(baseUrl, credentials, options) as MapsSearchClient;

  return client;
}

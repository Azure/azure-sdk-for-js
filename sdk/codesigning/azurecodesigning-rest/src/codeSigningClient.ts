// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "./logger";
import { TokenCredential } from "@azure/core-auth";
import { CodeSigningClient } from "./clientDefinitions";

/**
 * Initialize a new instance of `CodeSigningClient`
 * @param region - The Azure region wherein requests for signing will be sent.
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  region: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): CodeSigningClient {
  const baseUrl = options.baseUrl ?? `https://${region}.codesigning.azure.net/`;
  options.apiVersion = options.apiVersion ?? "2023-06-15-preview";
  options = {
    ...options,
    credentials: {
      scopes: options.credentials?.scopes ?? [
        "https://codesigning.azure.net/.default",
      ],
    },
  };

  const userAgentInfo = `azsdk-js-azure-codesigning-rest/1.0.0-beta.1`;
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

  const client = getClient(baseUrl, credentials, options) as CodeSigningClient;

  return client;
}

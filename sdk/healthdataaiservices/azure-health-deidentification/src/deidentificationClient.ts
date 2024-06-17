// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "./logger.js";
import { TokenCredential } from "@azure/core-auth";
import { DeidentificationClient } from "./clientDefinitions.js";

/**
 * Initialize a new instance of `DeidentificationClient`
 * @param endpointParam - Url of your Deid Service.
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpointParam: string,
  credentials: TokenCredential,
  options: ClientOptions = {},
): DeidentificationClient {
  const endpointUrl = options.endpoint ?? options.baseUrl ?? `https://${endpointParam}`;
  options.apiVersion = options.apiVersion ?? "2024-01-16-preview";
  const userAgentInfo = `azsdk-js-azure-health-deidentification-rest/1.0.0-beta.1`;
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
      scopes: options.credentials?.scopes ?? ["https://deid.azure.com/.default"],
    },
  };

  const client = getClient(endpointUrl, credentials, options) as DeidentificationClient;

  return client;
}

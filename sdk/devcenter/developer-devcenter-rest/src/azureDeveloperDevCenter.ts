// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "./logger.js";
import { TokenCredential } from "@azure/core-auth";
import { AzureDeveloperDevCenterClient } from "./clientDefinitions.js";

/**
 * Initialize a new instance of `AzureDeveloperDevCenterClient`
 * @param endpointParam - The DevCenter-specific URI to operate on.
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpointParam: string,
  credentials: TokenCredential,
  options: ClientOptions = {},
): AzureDeveloperDevCenterClient {
  const endpointUrl = options.endpoint ?? options.baseUrl ?? `${endpointParam}`;
  options.apiVersion = options.apiVersion ?? "2023-04-01";
  const userAgentInfo = `azsdk-js-developer-devcenter-rest/1.0.0`;
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
      scopes: options.credentials?.scopes ?? ["https://devcenter.azure.com/.default"],
    },
  };

  const client = getClient(endpointUrl, credentials, options) as AzureDeveloperDevCenterClient;

  return client;
}

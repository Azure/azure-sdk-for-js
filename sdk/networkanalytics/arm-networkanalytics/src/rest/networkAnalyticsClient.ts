// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "../logger.js";
import { TokenCredential } from "@azure/core-auth";
import { NetworkAnalyticsContext } from "./clientDefinitions.js";

/**
 * Initialize a new instance of `NetworkAnalyticsContext`
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  credentials: TokenCredential,
  options: ClientOptions = {},
): NetworkAnalyticsContext {
  const baseUrl = options.baseUrl ?? `https://management.azure.com`;
  options.apiVersion = options.apiVersion ?? "2023-11-15";
  const userAgentInfo = `azsdk-js-arm-networkanalytics-rest/1.0.0-beta.1`;
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
      scopes: options.credentials?.scopes ?? ["user_impersonation"],
    },
  };

  const client = getClient(
    baseUrl,
    credentials,
    options,
  ) as NetworkAnalyticsContext;

  return client;
}

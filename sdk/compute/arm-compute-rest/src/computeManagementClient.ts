// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientOptions } from "@azure-rest/core-client";
import { getClient } from "@azure-rest/core-client";
import { logger } from "./logger.js";
import type { TokenCredential } from "@azure/core-auth";
import type { ComputeManagementClient } from "./clientDefinitions.js";

/** The optional parameters for the client */
export interface ComputeManagementClientOptions extends ClientOptions {}

/**
 * Initialize a new instance of `ComputeManagementClient`
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  credentials: TokenCredential,
  options: ComputeManagementClientOptions = {},
): ComputeManagementClient {
  const endpointUrl = options.endpoint ?? options.baseUrl ?? `https://management.azure.com`;
  const userAgentInfo = `azsdk-js-arm-compute-rest/1.0.0-beta.3`;
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
      scopes: options.credentials?.scopes ?? ["https://management.azure.com/.default"],
    },
  };
  const client = getClient(endpointUrl, credentials, options) as ComputeManagementClient;

  client.pipeline.removePolicy({ name: "ApiVersionPolicy" });
  if (options.apiVersion) {
    logger.warning(
      "This client does not support client api-version, please change it at the operation level",
    );
  }

  return client;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "./logger";
import { TokenCredential } from "@azure/core-auth";
import { SchemaRegistryClient } from "./clientDefinitions";

/**
 * Initialize a new instance of `SchemaRegistryClient`
 * @param fullyQualifiedNamespace - The Schema Registry service endpoint, for example 'my-namespace.servicebus.windows.net'.
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  fullyQualifiedNamespace: string,
  credentials: TokenCredential,
  options: ClientOptions = {},
): SchemaRegistryClient {
  const baseUrl = options.baseUrl ?? `https://${fullyQualifiedNamespace}`;
  options.apiVersion = options.apiVersion ?? "2023-07-01";
  const userAgentInfo = `azsdk-js-schema-registry-rest/1.0.0-beta.1`;
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
      scopes: options.credentials?.scopes ?? [
        "https://eventhubs.azure.net/.default",
      ],
    },
  };

  const client = getClient(
    baseUrl,
    credentials,
    options,
  ) as SchemaRegistryClient;

  return client;
}

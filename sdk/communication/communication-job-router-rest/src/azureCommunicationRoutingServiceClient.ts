// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { logger } from "./logger";
import { AzureCommunicationRoutingServiceClient } from "./clientDefinitions";
import { createCommunicationAuthPolicy, parseClientArguments } from "@azure/communication-common";
/**
 * Initialize a new instance of `AzureCommunicationRoutingServiceClient`
 * @param connectionStringOrUrl - The connectionString or url of the Communication Services resource.
 * @param credentialOrOptions The key or token credential.
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  connectionStringOrUrl: string,
  credentialOrOptions?: KeyCredential | TokenCredential,
  options: ClientOptions = {}
): AzureCommunicationRoutingServiceClient {
  const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
  const baseUrl = options.baseUrl ?? `${url}`;
  options.apiVersion = options.apiVersion ?? "2023-11-01";

  const userAgentInfo = `azsdk-js-communication-job-router-rest/1.0.0-beta.1`;
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

  const client = getClient(baseUrl, options) as AzureCommunicationRoutingServiceClient;

  const authPolicy = createCommunicationAuthPolicy(credential);
  client.pipeline.addPolicy(authPolicy);

  return client;
}

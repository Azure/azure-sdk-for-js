// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { ClientOptions, getClient } from "@azure-rest/core-client";
import { parseClientArguments } from "@azure/communication-common";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { AzureCommunicationRoutingServiceClient } from "./clientDefinitions";
import { logger } from "./logger";

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
  const client = getClient(baseUrl, credential, options) as AzureCommunicationRoutingServiceClient;
  return client;
}

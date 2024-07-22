// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";
import { AzureHealthInsightsClient } from "./clientDefinitions";
import { logger } from "./logger";

/**
 * Initialize a new instance of `AzureHealthInsightsClient`
 * @param endpointParam - Supported Cognitive Services endpoints (protocol and hostname, for example: https://westus2.cognitiveservices.azure.com).
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpointParam: string,
  credentials: TokenCredential,
  options: ClientOptions = {},
): AzureHealthInsightsClient {
  const endpointUrl = options.endpoint ?? options.baseUrl ?? `${endpointParam}/health-insights`;
  options.apiVersion = options.apiVersion ?? "2024-04-01";
  const userAgentInfo = `azsdk-js-health-insights-radiologyinsights-rest/1.0.0`;
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
      scopes: options.credentials?.scopes ?? ["https://cognitiveservices.azure.com/.default"],
      apiKeyHeaderName: options.credentials?.apiKeyHeaderName ?? "Ocp-Apim-Subscription-Key",
    },
  };

  const client = getClient(endpointUrl, credentials, options) as AzureHealthInsightsClient;

  return client;
}

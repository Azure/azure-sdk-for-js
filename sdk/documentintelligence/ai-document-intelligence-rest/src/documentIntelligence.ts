// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "./logger";
import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { DocumentIntelligenceClient } from "./clientDefinitions";

/**
 * Initialize a new instance of `DocumentIntelligenceClient`
 * @param endpoint - The Document Intelligence service endpoint.
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpoint: string,
  credentials: TokenCredential | KeyCredential,
  options: ClientOptions = {},
): DocumentIntelligenceClient {
  const baseUrl = options.baseUrl ?? `${endpoint}/documentintelligence`;
  options.apiVersion = options.apiVersion ?? "2024-02-29-preview";
  const userAgentInfo = `azsdk-js-ai-document-intelligence-rest/1.0.0-beta.3`;
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

  const client = getClient(baseUrl, credentials, options) as DocumentIntelligenceClient;

  return client;
}

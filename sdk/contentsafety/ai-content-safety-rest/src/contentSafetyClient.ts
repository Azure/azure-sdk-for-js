// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "./logger";
import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { ContentSafetyClient } from "./clientDefinitions";

/**
 * Initialize a new instance of `ContentSafetyClient`
 * @param endpoint - Supported Cognitive Services endpoints (protocol and hostname, for example:
 * https://<resource-name>.cognitiveservices.azure.com).
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpoint: string,
  credentials: TokenCredential | KeyCredential,
  options: ClientOptions = {}
): ContentSafetyClient {
  const baseUrl = options.baseUrl ?? `${endpoint}/contentsafety`;
  options.apiVersion = options.apiVersion ?? "2023-10-01";
  options = {
    ...options,
    credentials: {
      scopes: options.credentials?.scopes ?? [
        "https://cognitiveservices.azure.com/.default",
      ],
      apiKeyHeaderName:
        options.credentials?.apiKeyHeaderName ?? "Ocp-Apim-Subscription-Key",
    },
  };

  const userAgentInfo = `azsdk-js-ai-content-safety-rest/1.0.0`;
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

  const client = getClient(
    baseUrl,
    credentials,
    options
  ) as ContentSafetyClient;

  return client;
}

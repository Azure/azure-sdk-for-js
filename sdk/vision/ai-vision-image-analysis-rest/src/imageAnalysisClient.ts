// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "./logger";
import { KeyCredential } from "@azure/core-auth";
import { ImageAnalysisClient } from "./clientDefinitions";

/**
 * Initialize a new instance of `ImageAnalysisClient`
 * @param endpoint - Azure AI Computer Vision endpoint (protocol and hostname, for example:
 * https://<resource-name>.cognitiveservices.azure.com).
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpoint: string,
  credentials: KeyCredential,
  options: ClientOptions = {},
): ImageAnalysisClient {
  const baseUrl = options.baseUrl ?? `${endpoint}/computervision`;
  options.apiVersion = options.apiVersion ?? "2023-10-01";
  const userAgentInfo = `azsdk-js-ai-vision-image-analysis-rest/1.0.0-beta.3`;
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
      apiKeyHeaderName: options.credentials?.apiKeyHeaderName ?? "Ocp-Apim-Subscription-Key",
    },
  };

  const client = getClient(baseUrl, credentials, options) as ImageAnalysisClient;

  return client;
}

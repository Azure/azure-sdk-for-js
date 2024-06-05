// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "./logger.js";
import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { DocumentTranslationClient } from "./clientDefinitions.js";

/**
 * Initialize a new instance of `DocumentTranslationClient`
 * @param endpointParam - Supported document Translation endpoint, protocol and hostname, for example: https://{TranslatorResourceName}.cognitiveservices.azure.com/translator.
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpointParam: string,
  credentials: TokenCredential | KeyCredential,
  options: ClientOptions = {},
): DocumentTranslationClient {
  const endpointUrl =
    options.endpoint ?? options.baseUrl ?? `${endpointParam}/translator`;
  options.apiVersion = options.apiVersion ?? "2024-05-01";
  const userAgentInfo = `azsdk-js-ai-translation-document-rest/1.0.0-beta.1`;
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
        "https://cognitiveservices.azure.com/.default",
      ],
      apiKeyHeaderName:
        options.credentials?.apiKeyHeaderName ?? "Ocp-Apim-Subscription-Key",
    },
  };

  const client = getClient(
    endpointUrl,
    credentials,
    options,
  ) as DocumentTranslationClient;

  return client;
}

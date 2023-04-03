// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { AzureOpenAIServiceAPIClient } from "./clientDefinitions";

/**
 * Initialize a new instance of `AzureOpenAIServiceAPIClient`
 * @param credentials type: TokenCredential|KeyCredential, uniquely identify client credential
 * @param options type: ClientOptions, the parameter for all optional parameters
 */
export default function createClient(
  credentials: TokenCredential | KeyCredential,
  options: ClientOptions = {}
): AzureOpenAIServiceAPIClient {
  const baseUrl = options.baseUrl ?? `https://{endpoint}/openai`;
  options.apiVersion = options.apiVersion ?? "2023-03-15-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["api.read"],
      apiKeyHeaderName: "api-key"
    }
  };

  const userAgentInfo = `azsdk-js-api-client-factory-rest/1.0.0-beta.1`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix
    }
  };

  const client = getClient(
    baseUrl,
    credentials,
    options
  ) as AzureOpenAIServiceAPIClient;

  return client;
}

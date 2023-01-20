// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { OpenAIInferenceClient } from "./clientDefinitions";

/**
 * Initialize a new instance of the class OpenAIInferenceClient class.
 * @param endpoint type: string
 * @param credentials type: TokenCredential | KeyCredential
 */
export default function createClient(
  endpoint: string,
  credentials: TokenCredential | KeyCredential,
  options: ClientOptions = {}
): OpenAIInferenceClient {
  const baseUrl = options.baseUrl ?? `${endpoint}/openai`;

  options = {
    ...options,
    credentials: {
      scopes: ["https://cognitiveservices.azure.com/.default"],
      apiKeyHeaderName: "api-key",
    },
  };

  const userAgentInfo = `azsdk-js-openai-inference-rest/1.0.0-beta.1`;
  const userAgentPrefix =
    options.userAgentOptions && options.userAgentOptions.userAgentPrefix
      ? `${options.userAgentOptions.userAgentPrefix} ${userAgentInfo}`
      : `${userAgentInfo}`;
  options = {
    ...options,
    userAgentOptions: {
      userAgentPrefix,
    },
  };

  const client = getClient(
    baseUrl,
    credentials,
    options
  ) as OpenAIInferenceClient;

  return client;
}

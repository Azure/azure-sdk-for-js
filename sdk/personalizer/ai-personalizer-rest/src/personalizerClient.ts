// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientOptions, getClient } from "@azure-rest/core-client";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { PersonalizerClient } from "./clientDefinitions";

export default function createPersonalizerClient(
  Endpoint: string,
  credentials: TokenCredential | KeyCredential,
  options: ClientOptions = {},
): PersonalizerClient {
  const baseUrl = options.baseUrl ?? `${Endpoint}/personalizer/v1.1-preview.3`;

  options = {
    ...options,
    credentials: {
      scopes: ["https://cognitiveservices.azure.com/.default"],
      apiKeyHeaderName: "Ocp-Apim-Subscription-Key",
    },
  };

  const userAgentInfo = `azsdk-js-ai-personalizer-rest/1.0.0-beta.1`;
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

  const client = getClient(baseUrl, credentials, options) as PersonalizerClient;

  return client;
}

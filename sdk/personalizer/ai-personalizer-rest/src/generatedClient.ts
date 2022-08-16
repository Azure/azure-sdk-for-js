// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { GeneratedClient } from "./clientDefinitions";
import { KeyCredential } from '@azure/core-auth';

export default function createClient(
  Endpoint: string,
  credentials: KeyCredential,
  options: ClientOptions = {}
): GeneratedClient {
  const baseUrl = options.baseUrl ?? `${Endpoint}/personalizer/v1.1-preview.3`;

  options = {
    ...options,
    credentials: {
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

  const client = getClient(baseUrl, credentials, options) as GeneratedClient;

  return client;
}

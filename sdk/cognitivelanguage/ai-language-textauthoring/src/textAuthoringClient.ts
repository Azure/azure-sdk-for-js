// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { TextAuthoringClient } from "./clientDefinitions";

/**
 * Initialize a new instance of the class TextAuthoringClient class.
 * @param Endpoint type: string Supported Cognitive Services endpoint (e.g., https://<resource-name>.api.cognitiveservices.azure.com).
 * @param credentials type: TokenCredential | KeyCredential
 */
export default function createAuthoringClient(
  Endpoint: string,
  credentials: TokenCredential | KeyCredential,
  options: ClientOptions = {},
): TextAuthoringClient {
  const baseUrl = options.baseUrl ?? `${Endpoint}/language`;
  options.apiVersion = options.apiVersion ?? "2022-10-01-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://cognitiveservices.azure.com/.default"],
      apiKeyHeaderName: "Ocp-Apim-Subscription-Key",
    },
  };

  const userAgentInfo = `azsdk-js-ai-language-textauthoring-rest/1.0.0-beta.1`;
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

  const client = getClient(baseUrl, credentials, options) as TextAuthoringClient;

  return client;
}

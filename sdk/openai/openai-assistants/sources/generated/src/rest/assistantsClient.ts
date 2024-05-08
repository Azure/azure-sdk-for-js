// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getClient, ClientOptions } from "@azure-rest/core-client";
import { logger } from "../logger.js";
import { TokenCredential, KeyCredential } from "@azure/core-auth";
import { AssistantsContext } from "./clientDefinitions.js";

/**
 * Initialize a new instance of `AssistantsContext`
 * @param endpointParam - An OpenAI endpoint supporting assistants functionality.
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpointParam: string,
  credentials: TokenCredential | KeyCredential,
  options: ClientOptions = {},
): AssistantsContext {
  const endpointUrl = options.endpoint ?? options.baseUrl ?? `${endpointParam}`;

  const userAgentInfo = `azsdk-js-openai-assistants-rest/1.0.0-beta.1`;
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
      apiKeyHeaderName: options.credentials?.apiKeyHeaderName ?? "api-key",
    },
  };

  const client = getClient(
    endpointUrl,
    credentials,
    options,
  ) as AssistantsContext;

  client.pipeline.removePolicy({ name: "ApiVersionPolicy" });

  return client;
}

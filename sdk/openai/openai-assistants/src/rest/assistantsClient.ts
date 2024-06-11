// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { ClientOptions, getClient } from "@azure-rest/core-client";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { logger } from "../logger.js";
import { AssistantsContext } from "./clientDefinitions.js";

/**
 * Initialize a new instance of `AssistantsContext`
 * @param endpoint - An OpenAI endpoint supporting assistants functionality.
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpoint: string,
  credentials: TokenCredential | KeyCredential,
  options: ClientOptions = {},
): AssistantsContext {
  const baseUrl = options.baseUrl ?? `${endpoint}/openai`;
  options.apiVersion = options.apiVersion ?? "2024-02-15-preview";
  const userAgentInfo = `azsdk-js-openai-assistants-rest/1.0.0-beta.6`;
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
      apiKeyHeaderName: options.credentials?.apiKeyHeaderName ?? "api-key",
    },
  };
  return getClient(baseUrl, credentials, options) as AssistantsContext;
}

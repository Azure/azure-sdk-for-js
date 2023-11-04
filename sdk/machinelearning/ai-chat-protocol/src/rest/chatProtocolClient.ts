// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * THIS IS AN AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * Any changes you make here may be lost.
 *
 * If you need to make changes, please do so in the original source file, \{project-root\}/sources/custom
 */

import { getClient } from "@azure-rest/core-client";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { ChatProtocolClientOptions } from "../ChatProtocolClient.js";
import { logger } from "../logger.js";
import { ChatProtocolContext } from "./clientDefinitions.js";

/**
 * Initialize a new instance of `ChatProtocolContext`
 * @param endpoint - A sequence of textual characters.
 * @param credentials - uniquely identify client credential
 * @param options - the parameter for all optional parameters
 */
export default function createClient(
  endpoint: string,
  credentials: TokenCredential | KeyCredential,
  options: ChatProtocolClientOptions = {}
): ChatProtocolContext {
  const baseUrl = options.baseUrl ?? `${endpoint}`;
  options.apiVersion = options.apiVersion ?? "2023-10-01-preview";
  const userAgentInfo = `azsdk-js-ai-chat-protocol-rest/1.0.0-beta.1`;
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
      scopes: options.authorizationScopes ?? options.credentials?.scopes ?? [`${baseUrl}/.default`],
      apiKeyHeaderName: options.apiKeyHeader ?? options.credentials?.apiKeyHeaderName ?? "api-key",
    },
  };
  const client = {
    ...getClient(baseUrl, credentials, options),
    chatRoute: options?.chatRoute ?? "/chat",
  } as ChatProtocolContext;
  return client;
}

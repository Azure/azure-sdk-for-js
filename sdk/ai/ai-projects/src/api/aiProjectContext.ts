// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import { KnownApiVersions } from "../models/models.js";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

export interface AIProjectContext extends Client {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownApiVersions} that the service accepts. */
  apiVersion: KnownApiVersions;
}

/** Optional parameters for the client. */
export interface AIProjectClientOptionalParams extends ClientOptions {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownApiVersions} that the service accepts. */
  apiVersion?: KnownApiVersions;
}

export function createAIProject(
  endpoint: string,
  credential: TokenCredential,
  options: AIProjectClientOptionalParams = {},
): AIProjectContext {
  const endpointUrl = options.endpoint ?? String(endpoint);
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-ai-projects/2.0.0-beta.5`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} ${userAgentInfo}`
    : `${userAgentInfo}`;
  const { apiVersion: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: { logger: options.loggingOptions?.logger ?? logger.info },
    credentials: {
      scopes: options.credentials?.scopes ?? ["https://ai.azure.com/.default"],
    },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);
  const apiVersion = options.apiVersion ?? KnownApiVersions.v1;
  return { ...clientContext, apiVersion } as AIProjectContext;
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../../logger.js";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

export interface WorkspaceContext extends Client {}

/** Optional parameters for the client. */
export interface WorkspaceClientOptionalParams extends ClientOptions {}

export function createWorkspace(
  endpointParam: string,
  credential: TokenCredential,
  options: WorkspaceClientOptionalParams = {},
): WorkspaceContext {
  const endpointUrl = options.endpoint ?? String(endpointParam);
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-ai-discovery/1.0.1`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} ${userAgentInfo}`
    : `${userAgentInfo}`;
  const { apiVersion: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: { logger: options.loggingOptions?.logger ?? logger.info },
    credentials: {
      scopes: options.credentials?.scopes ?? ["https://discovery.azure.com/.default"],
    },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);

  if (options.apiVersion) {
    logger.warning(
      "This client does not support client api-version, please change it at the operation level",
    );
  }
  return clientContext;
}

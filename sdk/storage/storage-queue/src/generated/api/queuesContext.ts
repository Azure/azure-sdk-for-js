// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

export interface QueuesContext extends Client {
  /** Specifies the version of the operation to use for this request. */
  version?: string;
}

/** Optional parameters for the client. */
export interface QueuesClientOptionalParams extends ClientOptions {
  /** Specifies the version of the operation to use for this request. */
  version?: string;
}

export function createQueues(
  endpointParam: string,
  credential: TokenCredential,
  options: QueuesClientOptionalParams = {},
): QueuesContext {
  const endpointUrl = options.endpoint ?? String(endpointParam);
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-storage-queue/1.0.0-beta.1`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} azsdk-js-api ${userAgentInfo}`
    : `azsdk-js-api ${userAgentInfo}`;
  const { version: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: { logger: options.loggingOptions?.logger ?? logger.info },
    credentials: { scopes: options.credentials?.scopes ?? ["https://storage.azure.com/.default"] },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);
  const version = options.version;
  return { ...clientContext, version } as QueuesContext;
}

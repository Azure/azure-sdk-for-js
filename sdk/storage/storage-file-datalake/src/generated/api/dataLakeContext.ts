// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

export interface DataLakeContext extends Client {
  /** Specifies the version of the operation to use for this request. */
  version?: string;
}

/** Optional parameters for the client. */
export interface DataLakeClientOptionalParams extends ClientOptions {
  /** Specifies the version of the operation to use for this request. */
  version?: string;
}

export function createDataLake(
  endpointParam: string,
  credential: TokenCredential,
  options: DataLakeClientOptionalParams = {},
): DataLakeContext {
  const endpointUrl = options.endpoint ?? String(endpointParam);
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-storage-file-datalake/1.0.0-beta.1`;
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
  return { ...clientContext, version } as DataLakeContext;
}

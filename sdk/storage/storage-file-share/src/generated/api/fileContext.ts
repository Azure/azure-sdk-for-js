// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import pkgJson from "@azure/storage-file-share/package.json" with { type: "json" };
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

/** Azure File Storage provides scalable file shares in the cloud using SMB and NFS protocols. */
export interface FileContext extends Client {
  /** Specifies the version of the operation to use for this request. */
  version?: string;
}

/** Optional parameters for the client. */
export interface FileClientOptionalParams extends ClientOptions {
  /** Specifies the version of the operation to use for this request. */
  version?: string;
}

/** Azure File Storage provides scalable file shares in the cloud using SMB and NFS protocols. */
export function createFile(
  endpointParam: string,
  credential: TokenCredential,
  options: FileClientOptionalParams = {},
): FileContext {
  const endpointUrl = options.endpoint ?? String(endpointParam);
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-storage-file-share/${pkgJson.version}`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} ${userAgentInfo}`
    : `${userAgentInfo}`;
  const { version: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: { logger: options.loggingOptions?.logger ?? logger.info },
    credentials: { scopes: options.credentials?.scopes ?? ["https://storage.azure.com/.default"] },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);
  const version = options.version;
  return { ...clientContext, version } as FileContext;
}

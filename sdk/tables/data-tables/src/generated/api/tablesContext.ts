// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import pkgJson from "@azure/data-tables/package.json" with { type: "json" };
import { KnownVersions } from "../models/models.js";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

export interface TablesContext extends Client {
  /** The API version. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
}

/** Optional parameters for the client. */
export interface TablesClientOptionalParams extends ClientOptions {
  /** The API version. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
  /** @deprecated Use `credentials.scopes` instead. */
  credentialScopes?: string | string[];
}

export function createTables(
  endpointParam: string,
  credential: TokenCredential,
  options: TablesClientOptionalParams = {},
): TablesContext {
  const endpointUrl = options.endpoint ?? String(endpointParam);
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-data-tables/${pkgJson.version}`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} ${userAgentInfo}`
    : `${userAgentInfo}`;
  const { apiVersion: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: {
      ...options.loggingOptions,
      logger: options.loggingOptions?.logger ?? logger.info,
    },
    credentials: {
      scopes: options.credentials?.scopes ??
        (typeof options.credentialScopes === "string"
          ? [options.credentialScopes]
          : options.credentialScopes) ?? ["https://storage.azure.com/.default"],
    },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);
  const apiVersion = options.apiVersion;
  return { ...clientContext, apiVersion } as TablesContext;
}

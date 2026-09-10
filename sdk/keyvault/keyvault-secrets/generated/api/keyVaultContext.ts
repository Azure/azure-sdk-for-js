// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { logger } from "../logger.js";
import pkgJson from "@azure/keyvault-secrets/package.json" with { type: "json" };
import { KnownVersions } from "../models/models.js";
import { Client, ClientOptions, getClient } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

/** The key vault client performs cryptographic key operations and vault operations against the Key Vault service. */
export interface KeyVaultContext extends Client {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
}

/** Optional parameters for the client. */
export interface KeyVaultClientOptionalParams extends ClientOptions {
  /** The API version to use for this operation. */
  /** Known values of {@link KnownVersions} that the service accepts. */
  apiVersion?: string;
}

/** The key vault client performs cryptographic key operations and vault operations against the Key Vault service. */
export function createKeyVault(
  endpointParam: string,
  credential: TokenCredential,
  options: KeyVaultClientOptionalParams = {},
): KeyVaultContext {
  const endpointUrl = options.endpoint ?? String(endpointParam);
  const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
  const userAgentInfo = `azsdk-js-keyvault-secrets/${pkgJson.version}`;
  const userAgentPrefix = prefixFromOptions
    ? `${prefixFromOptions} ${userAgentInfo}`
    : `${userAgentInfo}`;
  const { apiVersion: _, ...updatedOptions } = {
    ...options,
    userAgentOptions: { userAgentPrefix },
    loggingOptions: { logger: options.loggingOptions?.logger ?? logger.info },
    credentials: { scopes: options.credentials?.scopes ?? ["https://vault.azure.net/.default"] },
  };
  const clientContext = getClient(endpointUrl, credential, updatedOptions);
  const apiVersion = options.apiVersion;
  return { ...clientContext, apiVersion } as KeyVaultContext;
}

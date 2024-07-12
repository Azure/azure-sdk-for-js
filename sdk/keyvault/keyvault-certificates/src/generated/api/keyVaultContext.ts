// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { ClientOptions } from "@azure-rest/core-client";
import { KeyVaultContext } from "../rest/index.js";
import getClient from "../rest/index.js";

/** Optional parameters for the client. */
export interface KeyVaultClientOptions extends ClientOptions {
  /** The API version to use for this operation. */
  apiVersion?: string;
}

export { KeyVaultContext } from "../rest/index.js";

/**
 * The key vault client performs cryptographic key operations and vault operations
 * against the Key Vault service.
 */
export function createKeyVault(
  vaultBaseUrl: string,
  credential: TokenCredential,
  options: KeyVaultClientOptions = {},
): KeyVaultContext {
  const clientContext = getClient(vaultBaseUrl, credential, options);
  return clientContext;
}

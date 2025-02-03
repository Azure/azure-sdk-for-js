// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CredentialPersistenceOptions } from "./credentialPersistenceOptions.js";
import type { MultiTenantTokenCredentialOptions } from "./multiTenantTokenCredentialOptions.js";

/**
 * Provides options to configure the {@link AzureApplicationCredential} class.
 */
export interface AzureApplicationCredentialOptions
  extends MultiTenantTokenCredentialOptions,
    CredentialPersistenceOptions {
  /**
   * Optionally pass in a user assigned client ID to be used by the {@link ManagedIdentityCredential}.
   * This client ID can also be passed through to the {@link ManagedIdentityCredential} through the environment variable: AZURE_CLIENT_ID.
   */
  managedIdentityClientId?: string;
}

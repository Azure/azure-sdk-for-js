// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CredentialPersistenceOptions } from "./credentialPersistenceOptions";
import { TokenCredentialOptions } from "../tokenCredentialOptions";

/**
 * Provides options to configure the {@link AzureApplicationCredential} class.
 */
export interface AzureApplicationCredentialOptions
  extends TokenCredentialOptions,
    CredentialPersistenceOptions {
  /**
   * Optionally pass in a user assigned client ID to be used by the {@link ManagedIdentityCredential}.
   * This client ID can also be passed through to the {@link ManagedIdentityCredential} through the environment variable: AZURE_CLIENT_ID.
   */
  managedIdentityClientId?: string;
  /**
   * For multi-tenant applications, specifies additional tenants for which the credential may acquire tokens.
   * Add the wildcard value "*" to allow the credential to acquire tokens for any tenant the application is installed.
   */
  additionallyAllowedTenants?: string[];
}

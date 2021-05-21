// Copyright (c) Microsoft Corporation
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-http";
import { TokenCredentialOptions } from "../client/identityClient";
import { AzureCliCredential } from "./azureCliCredential";
import { AzurePowerShellCredential } from "./azurePowerShellCredential";
import { EnvironmentCredential } from "./environmentCredential";
import { ManagedIdentityCredential } from "./managedIdentityCredential";

/**
 * Provides options to configure the {@link DefaultAzureCredential} class.
 */
export interface DefaultAzureCredentialOptions extends TokenCredentialOptions {
  /**
   * Optionally pass in a Tenant ID to be used as part of the credential.
   * By default it may use a generic tenant ID depending on the underlying credential.
   */
  tenantId?: string;
  /**
   * Optionally pass in a user assigned client ID to be used by the {@link ManagedIdentityCredential}.
   * This client ID can also be passed through to the {@link ManagedIdentityCredential} through the environment variable: AZURE_CLIENT_ID.
   */
  managedIdentityClientId?: string;
}

/**
 * The type of a class that implements TokenCredential and accepts
 * `DefaultAzureCredentialOptions`.
 */
export interface DefaultCredentialConstructor {
  new (options?: DefaultAzureCredentialOptions): TokenCredential;
}

/**
 * A shim around ManagedIdentityCredential that adapts it to accept
 * `DefaultAzureCredentialOptions`.
 *
 * @internal
 */
class DefaultManagedIdentityCredential extends ManagedIdentityCredential {
  constructor(options?: DefaultAzureCredentialOptions) {
    const managedIdentityClientId = options?.managedIdentityClientId ?? process.env.AZURE_CLIENT_ID;
    if (managedIdentityClientId !== undefined) {
      super(managedIdentityClientId, options);
    } else {
      super(options);
    }
  }
}

export const defaultCredentialStack: DefaultCredentialConstructor[] = [
  EnvironmentCredential,
  DefaultManagedIdentityCredential,
  AzureCliCredential,
  AzurePowerShellCredential
];

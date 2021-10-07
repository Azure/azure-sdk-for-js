// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";

import { TokenCredentialOptions } from "../client/identityClient";

import { ChainedTokenCredential } from "./chainedTokenCredential";

import { AzureCliCredential } from "./azureCliCredential";
import { AzurePowerShellCredential } from "./azurePowerShellCredential";
import { EnvironmentCredential } from "./environmentCredential";
import { ManagedIdentityCredential } from "./managedIdentityCredential";
import { CredentialPersistenceOptions } from "./credentialPersistenceOptions";
import { VisualStudioCodeCredential } from "./visualStudioCodeCredential";

/**
 * Provides options to configure the {@link DefaultAzureCredential} class.
 */
export interface DefaultAzureCredentialOptions
  extends TokenCredentialOptions,
    CredentialPersistenceOptions {
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
interface DefaultCredentialConstructor {
  new (options?: DefaultAzureCredentialOptions): TokenCredential;
}

/**
 * A shim around ManagedIdentityCredential that adapts it to accept
 * `DefaultAzureCredentialOptions`.
 *
 * @internal
 */
export class DefaultManagedIdentityCredential extends ManagedIdentityCredential {
  constructor(options?: DefaultAzureCredentialOptions) {
    const managedIdentityClientId = options?.managedIdentityClientId ?? process.env.AZURE_CLIENT_ID;
    if (managedIdentityClientId !== undefined) {
      super(managedIdentityClientId, options);
    } else {
      super(options);
    }
  }
}

export const defaultCredentials: DefaultCredentialConstructor[] = [
  EnvironmentCredential,
  DefaultManagedIdentityCredential,
  VisualStudioCodeCredential,
  AzureCliCredential,
  AzurePowerShellCredential
];

/**
 * Provides a default {@link ChainedTokenCredential} configuration that should
 * work for most applications that use the Azure SDK.
 */
export class DefaultAzureCredential extends ChainedTokenCredential {
  /**
   * Creates an instance of the DefaultAzureCredential class.
   *
   * This credential provides a default {@link ChainedTokenCredential} configuration that should
   * work for most applications that use the Azure SDK.
   *
   * The following credential types will be tried, in order:
   *
   * - {@link EnvironmentCredential}
   * - {@link ManagedIdentityCredential}
   * - {@link VisualStudioCodeCredential}
   * - {@link AzureCliCredential}
   * - {@link AzurePowerShellCredential}
   *
   * Consult the documentation of these credential types for more information
   * on how they attempt authentication.
   *
   * **Note**: `VisualStudioCodeCredential` is provided by a plugin package:
   * `@azure/identity-vscode`. If this package is not installed and registered
   * using the plugin API (`useIdentityPlugin`), then authentication using
   * `VisualStudioCodeCredential` will not be available.
   *
   * @param options - Optional parameters. See {@link DefaultAzureCredentialOptions}.
   */
  constructor(options?: DefaultAzureCredentialOptions) {
    super(...defaultCredentials.map((ctor) => new ctor(options)));
    this.UnavailableMessage =
      "DefaultAzureCredential => failed to retrieve a token from the included credentials";
  }
}

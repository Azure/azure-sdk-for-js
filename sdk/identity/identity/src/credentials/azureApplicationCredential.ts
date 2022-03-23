// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { TokenCredentialOptions } from "../tokenCredentialOptions";
import { ChainedTokenCredential } from "./chainedTokenCredential";
import { EnvironmentCredential } from "./environmentCredential";
import { CredentialPersistenceOptions } from "./credentialPersistenceOptions";
import { DefaultManagedIdentityCredential } from "./defaultAzureCredential";

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
}

/**
 * The type of a class that implements TokenCredential and accepts
 * `ApplicationCredentialOptions`.
 */
interface AzureApplicationCredentialConstructor {
  new (options?: AzureApplicationCredentialOptions): TokenCredential;
}

export const AzureApplicationCredentials: AzureApplicationCredentialConstructor[] = [
  EnvironmentCredential,
  DefaultManagedIdentityCredential,
];

/**
 * Provides a default {@link ChainedTokenCredential} configuration that should
 * work for most applications that use the Azure SDK.
 */
export class AzureApplicationCredential extends ChainedTokenCredential {
  /**
   * Creates an instance of the AzureApplicationCredential class.
   *
   * The AzureApplicationCredential provides a default {@link ChainedTokenCredential} configuration that should
   * work for most applications deployed on Azure. The following credential types will be tried, in order:
   *
   * - {@link EnvironmentCredential}
   * - {@link ManagedIdentityCredential}
   *
   * Consult the documentation of these credential types for more information
   * on how they attempt authentication.
   *
   * @param options - Optional parameters. See {@link AzureApplicationCredentialOptions}.
   */
  constructor(options?: AzureApplicationCredentialOptions) {
    super(...AzureApplicationCredentials.map((ctor) => new ctor(options)));
    this.UnavailableMessage =
      "ApplicationCredential => failed to retrieve a token from the included credentials. To troubleshoot, visit https://aka.ms/azsdk/js/identity/applicationcredential/troubleshoot.";
  }
}

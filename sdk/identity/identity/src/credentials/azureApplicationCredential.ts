// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureApplicationCredentialOptions } from "./azureApplicationCredentialOptions";
import { ChainedTokenCredential } from "./chainedTokenCredential";
import { DefaultManagedIdentityCredential } from "./defaultAzureCredential";
import { EnvironmentCredential } from "./environmentCredential";
import { TokenCredential } from "@azure/core-auth";

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

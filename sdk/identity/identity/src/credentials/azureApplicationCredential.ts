// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createDefaultManagedIdentityCredential,
  createEnvironmentCredential,
} from "./defaultAzureCredential";

import { AzureApplicationCredentialOptions } from "./azureApplicationCredentialOptions";
import { ChainedTokenCredential } from "./chainedTokenCredential";

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
    const credentialFunctions = [
      createEnvironmentCredential,
      createDefaultManagedIdentityCredential,
    ];
    super(...credentialFunctions.map((createCredentialFn) => createCredentialFn(options)));
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ChainedTokenCredential } from "./chainedTokenCredential";
import { DefaultAzureCredentialOptions, defaultCredentialStack } from "./defaultCredentialStack";

export { DefaultAzureCredentialOptions };

/**
 * Provides a default {@link ChainedTokenCredential} configuration that should work for most applications that use the Azure SDK.
 * The following credential types will be tried, in order:
 *
 * - {@link EnvironmentCredential}
 * - {@link ManagedIdentityCredential}
 * - {@link AzureCliCredential}
 *
 * Consult the documentation of these credential types for more information
 * on how they attempt authentication.
 *
 * Azure Identity extensions may add credential types to the `DefaultAzureCredentialStack`.
 */
export class DefaultAzureCredential extends ChainedTokenCredential {
  /**
   * Creates an instance of the DefaultAzureCredential class.
   *
   * @param options - Optional parameters. See {@link DefaultAzureCredentialOptions}.
   */
  constructor(options?: DefaultAzureCredentialOptions) {
    super(...defaultCredentialStack.map((Credential) => new Credential(options)));
    this.UnavailableMessage =
      "DefaultAzureCredential => failed to retrieve a token from the included credentials";
  }
}

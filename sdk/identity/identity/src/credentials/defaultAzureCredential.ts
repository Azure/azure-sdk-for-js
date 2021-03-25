// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../client/identityClient";
import { ChainedTokenCredential } from "./chainedTokenCredential";
import { EnvironmentCredential } from "./environmentCredential";
import { ManagedIdentityCredential } from "./managedIdentityCredential";
import { AzureCliCredential } from "./azureCliCredential";
import { VisualStudioCodeCredential } from "./visualStudioCodeCredential";

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
 * Provides a default {@link ChainedTokenCredential} configuration that should work for most applications that use the Azure SDK.
 * The following credential types will be tried, in order:
 *
 * - {@link EnvironmentCredential}
 * - {@link ManagedIdentityCredential}
 * - {@link AzureCliCredential}
 * - {@link VisualStudioCodeCredential}
 *
 * Consult the documentation of these credential types for more information
 * on how they attempt authentication.
 */
export class DefaultAzureCredential extends ChainedTokenCredential {
  /**
   * Creates an instance of the DefaultAzureCredential class.
   *
   * @param options - Optional parameters. See {@link DefaultAzureCredentialOptions}.
   */
  constructor(tokenCredentialOptions?: DefaultAzureCredentialOptions) {
    const credentials = [];
    credentials.push(new EnvironmentCredential(tokenCredentialOptions));

    // A client ID for the ManagedIdentityCredential
    // can be provided either through the optional parameters or through the environment variables.
    const managedIdentityClientId =
      tokenCredentialOptions?.managedIdentityClientId || process.env.AZURE_CLIENT_ID;

    // If a client ID is not provided, we will try with the system assigned ID.
    if (managedIdentityClientId) {
      credentials.push(
        new ManagedIdentityCredential(managedIdentityClientId, tokenCredentialOptions)
      );
    } else {
      credentials.push(new ManagedIdentityCredential(tokenCredentialOptions));
    }

    credentials.push(new AzureCliCredential());
    credentials.push(new VisualStudioCodeCredential(tokenCredentialOptions));

    super(...credentials);
    this.UnavailableMessage =
      "DefaultAzureCredential => failed to retrieve a token from the included credentials";
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../client/identityClient";
import { ChainedTokenCredential } from "./chainedTokenCredential";
import { EnvironmentCredential } from "./environmentCredential";
import { ManagedIdentityCredential } from "./managedIdentityCredential";
import { AzureCliCredential } from "./azureCliCredential";
import { VisualStudioCodeCredential } from "./visualStudioCodeCredential";

/**
 * Provides options to configure the default Azure credentials.
 */
export interface DefaultAzureCredentialOptions extends TokenCredentialOptions {
  /**
   * Optionally pass in a Tenant ID to be used as part of the credential
   */
  tenantId?: string;
  /**
   * Optionally pass in a user assigned client ID for the ManagedIdentityCredential
   */
  managedIdentityClientId?: string;
}

/**
 * Provides a default {@link ChainedTokenCredential} configuration for
 * applications that will be deployed to Azure.  The following credential
 * types will be tried, in order:
 *
 * - {@link EnvironmentCredential}
 * - {@link ManagedIdentityCredential}
 *
 * Consult the documentation of these credential types for more information
 * on how they attempt authentication.
 */
export class DefaultAzureCredential extends ChainedTokenCredential {
  /**
   * Creates an instance of the DefaultAzureCredential class.
   *
   * @param options Options for configuring the client which makes the authentication request.
   */
  constructor(tokenCredentialOptions?: DefaultAzureCredentialOptions) {
    const credentials = [];
    credentials.push(new EnvironmentCredential(tokenCredentialOptions));
    credentials.push(new ManagedIdentityCredential(tokenCredentialOptions));
    if (process.env.AZURE_CLIENT_ID) {
      credentials.push(
        new ManagedIdentityCredential(tokenCredentialOptions?.managedIdentityClientId || process.env.AZURE_CLIENT_ID, tokenCredentialOptions)
      );
    }
    credentials.push(new AzureCliCredential());
    credentials.push(new VisualStudioCodeCredential(tokenCredentialOptions));

    super(...credentials);
    this.UnavailableMessage =
      "DefaultAzureCredential => failed to retrieve a token from the included credentials";
  }
}

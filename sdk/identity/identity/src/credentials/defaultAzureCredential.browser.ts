// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../client/identityClient";
import { ChainedTokenCredential } from "./chainedTokenCredential";
import { EnvironmentCredential } from "./environmentCredential";
import { ManagedIdentityCredential } from "./managedIdentityCredential";
import { AzureCliCredential } from "./azureCliCredential";
import { VSCodeCredential } from "./vscodeCredential";

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
  constructor(tokenCredentialOptions?: TokenCredentialOptions) {
    const credentials = [];
    credentials.push(new EnvironmentCredential(tokenCredentialOptions));
    credentials.push(new ManagedIdentityCredential(tokenCredentialOptions));
    credentials.push(new AzureCliCredential());
    credentials.push(new VSCodeCredential(tokenCredentialOptions));

    super(...credentials);
  }
}

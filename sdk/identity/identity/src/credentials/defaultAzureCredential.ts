// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TokenCredentialOptions } from "../client/identityClient";
import { ChainedTokenCredential } from "./chainedTokenCredential";
import { EnvironmentCredential } from "./environmentCredential";
import { ManagedIdentityCredential } from "./managedIdentityCredential";
import { AzureCliCredential } from "./azureCliCredential";
import { VSCodeCredential } from "./vscodeCredential";
import { TokenCredential } from "@azure/core-http";

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
    let credentials = [];
    credentials.push(new EnvironmentCredential(tokenCredentialOptions));
    credentials.push(new ManagedIdentityCredential(tokenCredentialOptions));
    if (process.env.AZURE_CLIENT_ID) {
      credentials.push(
        new ManagedIdentityCredential(process.env.AZURE_CLIENT_ID, tokenCredentialOptions)
      );
    }
    credentials.push(new AzureCliCredential());
    credentials.push(new VSCodeCredential(tokenCredentialOptions));

    super(
      ...credentials
    );
    this.UnavailableMessage =
      "DefaultAzureCredential failed to retrieve a token from the included credentials";
  }
}

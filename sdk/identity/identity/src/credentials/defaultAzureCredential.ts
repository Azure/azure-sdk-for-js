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
 * Hosts the TokenCredentialOptions, plus options specific to DefaultAzureCredentials.
 */
export interface DefaultAzureCredentialOptions extends TokenCredentialOptions {
  /**
   * Holds a union type of the supported credential chains.
   * Each possible value will pick a specific list of credentials to authenticate with.
   */
  version?: "1";
}

/**
 * Default credential chain for the DefaultAzureCredential
 */
export const DEFAULT_AZURE_CREDENTIAL_CHAIN_VERSION = "1";

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
  constructor(options?: DefaultAzureCredentialOptions) {
    let credentials: TokenCredential[] = [];
    const version = options?.version || DEFAULT_AZURE_CREDENTIAL_CHAIN_VERSION;

    switch (version) {
      // Add more cases as we create them.
      case "1":
        credentials.push(new EnvironmentCredential(options));
        credentials.push(new ManagedIdentityCredential(options));
        if (process.env.AZURE_CLIENT_ID) {
          credentials.push(new ManagedIdentityCredential(process.env.AZURE_CLIENT_ID, options));
        }
        credentials.push(new AzureCliCredential());
        credentials.push(new VSCodeCredential(options));
        break;
    }

    super(
      // Only keeping the non-empty entries.
      ...credentials
    );
    this.UnavailableMessage =
      "DefaultAzureCredential failed to retrieve a token from the included credentials";
  }
}

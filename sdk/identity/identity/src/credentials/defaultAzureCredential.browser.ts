// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../client/identityClient";
import { ChainedTokenCredential } from "./chainedTokenCredential";
import { InteractiveBrowserCredential } from "./interactiveBrowserCredential";

/**
 * Provides a default {@link ChainedTokenCredential} configuration for
 * applications that will be deployed to Azure.  The following credential
 * types will be tried, in order:
 *
 * - {@link InteractiveBrowserCredential}
 *
 * Consult the documentation of these credential types for more information
 * on how they attempt authentication.
 */
export class DefaultAzureCredential extends ChainedTokenCredential {
  /**
   * Creates an instance of the DefaultAzureCredential class.
   *
   * @param options - Options for configuring the client which makes the authentication request.
   */
  constructor(tokenCredentialOptions?: TokenCredentialOptions) {
    super(new InteractiveBrowserCredential(tokenCredentialOptions));
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createDefaultManagedIdentityCredential,
  createEnvironmentCredential,
} from "./defaultAzureCredential.js";

import type { AzureApplicationCredentialOptions } from "./azureApplicationCredentialOptions.js";
import { ChainedTokenCredential } from "./chainedTokenCredential.js";
import { credentialLogger } from "../util/logging.js";
import { TokenCredential } from "@azure/core-auth";

const logger = credentialLogger("AzureApplicationCredential");

/**
 * A no-op credential that logs the reason it was skipped if getToken is called.
 * @internal
 */
export class UnavailableAzureApplicationCredential implements TokenCredential {
  credentialUnavailableErrorMessage: string;
  credentialName: string;

  constructor(credentialName: string, message: string) {
    this.credentialName = credentialName;
    this.credentialUnavailableErrorMessage = message;
  }

  getToken(): Promise<null> {
    logger.getToken.info(
      `Skipping ${this.credentialName}, reason: ${this.credentialUnavailableErrorMessage}`,
    );
    return Promise.resolve(null);
  }
}

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

    const credentials: TokenCredential[] = credentialFunctions.map((createCredentialFn) => {
      try {
        return createCredentialFn(options);
      } catch (err: any) {
        logger.warning(
          `Skipped ${createCredentialFn.name} because of an error creating the credential: ${err}`,
        );
        return new UnavailableAzureApplicationCredential(createCredentialFn.name, err.message);
      }
    });
    super(...credentials);
  }
}

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";
import { TokenCredentialOptions } from "../client/identityClient";
import { ChainedTokenCredential } from "./chainedTokenCredential";
import { EnvironmentCredential } from "./environmentCredential";
import { CredentialPersistenceOptions } from "./credentialPersistenceOptions";
import { DefaultManagedIdentityCredential } from "./defaultAzureCredential";

/**
 * Provides options to configure the {@link ApplicationCredential} class.
 */
export interface ApplicationCredentialOptions
  extends TokenCredentialOptions,
    CredentialPersistenceOptions {
  /**
   * Optionally pass in a user assigned client ID to be used by the {@link ManagedIdentityCredential}.
   * This client ID can also be passed through to the {@link ManagedIdentityCredential} through the environment variable: AZURE_CLIENT_ID.
   */
  managedIdentityClientId?: string;
}

/**
 * The type of a class that implements TokenCredential and accepts
 * `ApplicationCredentialOptions`.
 */
interface ApplicationCredentialConstructor {
  new (options?: ApplicationCredentialOptions): TokenCredential;
}

export const ApplicationCredentials: ApplicationCredentialConstructor[] = [
  EnvironmentCredential,
  DefaultManagedIdentityCredential
];

/**
 * Provides a default {@link ChainedTokenCredential} configuration that should
 * work for most applications that use the Azure SDK.  The following credential
 * types will be tried, in order:
 *
 * - {@link EnvironmentCredential}
 * - {@link ManagedIdentityCredential}

 *
 * Consult the documentation of these credential types for more information
 * on how they attempt authentication.
 */
export class ApplicationCredential extends ChainedTokenCredential {
  /**
   * Creates an instance of the ApplicationCredential class.
   *
   * @param options - Optional parameters. See {@link ApplicationCredentialOptions}.
   */
  constructor(options?: ApplicationCredentialOptions) {
    super(...ApplicationCredentials.map((ctor) => new ctor(options)));
    this.UnavailableMessage =
      "ApplicationCredential => failed to retrieve a token from the included credentials";
  }
}

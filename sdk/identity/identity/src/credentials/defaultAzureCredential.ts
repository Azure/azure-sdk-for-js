// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredentialOptions } from "../client/identityClient";
import { ChainedTokenCredential } from "./chainedTokenCredential";
import { EnvironmentCredential } from "./environmentCredential";
import { ManagedIdentityCredential } from "./managedIdentityCredential";
import { AzureCliCredential } from "./azureCliCredential";
import { VisualStudioCodeCredential } from "./visualStudioCodeCredential";
import { InteractiveBrowserCredential } from "./interactiveBrowserCredential";

/**
 * Provides options to configure the {@link DefaultAzureCredential} class.
 */
export interface DefaultAzureCredentialOptions extends TokenCredentialOptions {
  /**
   * If set to true, {@link DefaultAzureCredential} will not try to authenticate with {@link EnviornmentCredential}.
   */
  excludeEnviornmentCredential?: boolean;
  /**
   * If set to true, {@link DefaultAzureCredential} will not try to authenticate with {@link ManagedIdentityCredential}.
   */
  excludeManagedIdentityCredential?: boolean;
  /**
   * If set to true, {@link DefaultAzureCredential} will not try to authenticate with {@link AzureCliCredential}.
   */
  excludeAzureCliCredential?: boolean;
  /**
   * If set to true, {@link DefaultAzureCredential} will not try to authenticate with {@link VisualStudioCodeCredential}.
   */
  excludeVisualStudioCodeCredential?: boolean;
  /**
   * If set to true, {@link DefaultAzureCredential} will not try to authenticate with {@link InteractiveBrowserCredential}.
   */
  excludeInteractiveBrowserCredential?: boolean;
  /**
   * Optionally pass in a user assigned client ID to be used by the {@link ManagedIdentityCredential}.
   * This client ID can also be passed through to the {@link ManagedIdentityCredential} through the environment variable: AZURE_CLIENT_ID.
   */
  managedIdentityClientId?: string;
  /**
   * Optionally pass in a Tenant ID to be used as part of the {@link VisualStudioCodeCredential}.
   */
  visualStudioCodeTenantId?: string;
  /**
   * Optionally pass in a Tenant ID to be used as part of the {@link InteractiveBrowserCredential}.
   */
  interactiveBrowserTenantId?: string;
}

/**
 * Provides a default {@link ChainedTokenCredential} configuration that should work for most applications that use the Azure SDK.
 * The following credential types will be tried, in order:
 *
 * - {@link EnvironmentCredential}
 * - {@link ManagedIdentityCredential}
 * - {@link AzureCliCredential}
 * - {@link VisualStudioCodeCredential}
 * - {@link InteractiveBrowserCredential}
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
  constructor(options?: DefaultAzureCredentialOptions) {
    const credentials = [];

    if (!options?.excludeEnviornmentCredential) {
      credentials.push(new EnvironmentCredential(options));
    }

    if (!options?.excludeManagedIdentityCredential) {
      // A client ID for the ManagedIdentityCredential
      // can be provided either through the optional parameters or through the environment variables.
      const managedIdentityClientId =
        options?.managedIdentityClientId || process.env.AZURE_CLIENT_ID;

      // If a client ID is not provided, we will try with the system assigned ID.
      if (managedIdentityClientId) {
        credentials.push(new ManagedIdentityCredential(managedIdentityClientId, options));
      } else {
        credentials.push(new ManagedIdentityCredential(options));
      }
    }

    if (!options?.excludeAzureCliCredential) {
      credentials.push(new AzureCliCredential());
    }
    if (!options?.excludeVisualStudioCodeCredential) {
      credentials.push(
        new VisualStudioCodeCredential({
          ...options,
          tenantId: options?.visualStudioCodeTenantId
        })
      );
    }
    if (!options?.excludeInteractiveBrowserCredential) {
      credentials.push(
        new InteractiveBrowserCredential({
          ...options,
          tenantId: options?.interactiveBrowserTenantId
        })
      );
    }

    super(...credentials);
    this.UnavailableMessage =
      "DefaultAzureCredential => failed to retrieve a token from the included credentials";
  }
}

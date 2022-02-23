// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential } from "@azure/core-auth";

import { TokenCredentialOptions } from "../tokenCredentialOptions";

import { ChainedTokenCredential } from "./chainedTokenCredential";

import { AzureCliCredential } from "./azureCliCredential";
import { AzurePowerShellCredential } from "./azurePowerShellCredential";
import { EnvironmentCredential } from "./environmentCredential";
import {
  ManagedIdentityCredential,
  ManagedIdentityCredentialOptions,
} from "./managedIdentityCredential";
import { VisualStudioCodeCredential } from "./visualStudioCodeCredential";

/**
 * Provides options to configure the {@link DefaultAzureCredential} class.
 * This variation supports `managedIdentityClientId` and not `managedIdentityResourceId`, since only one of both is supported.
 */
export interface DefaultAzureCredentialClientIdOptions extends TokenCredentialOptions {
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
 * Provides options to configure the {@link DefaultAzureCredential} class.
 * This variation supports `managedIdentityResourceId` and not `managedIdentityClientId`, since only one of both is supported.
 */
export interface DefaultAzureCredentialOptionsWithResourceId extends TokenCredentialOptions {
  /**
   * Optionally pass in a Tenant ID to be used as part of the credential.
   * By default it may use a generic tenant ID depending on the underlying credential.
   */
  tenantId?: string;
  /**
   * Optionally pass in a resource ID to be used by the {@link ManagedIdentityCredential}.
   * In scenarios such as when user assigned identities are created using an ARM template,
   * where the resource Id of the identity is known but the client Id can't be known ahead of time,
   * this parameter allows programs to use these user assigned identities
   * without having to first determine the client Id of the created identity.
   */
  managedIdentityResourceId?: string;
}

/**
 * Provides options to configure the {@link DefaultAzureCredential} class.
 */
export type DefaultAzureCredentialOptions =
  | DefaultAzureCredentialClientIdOptions
  | DefaultAzureCredentialOptionsWithResourceId;

/**
 * The type of a class that implements TokenCredential and accepts
 * `DefaultAzureCredentialOptions`.
 */
interface DefaultCredentialConstructor {
  new (options?: DefaultAzureCredentialOptions): TokenCredential;
}

/**
 * A shim around ManagedIdentityCredential that adapts it to accept
 * `DefaultAzureCredentialOptions`.
 *
 * @internal
 */
export class DefaultManagedIdentityCredential extends ManagedIdentityCredential {
  constructor(options?: DefaultAzureCredentialOptions) {
    const managedIdentityClientId =
      (options as DefaultAzureCredentialClientIdOptions)?.managedIdentityClientId ??
      process.env.AZURE_CLIENT_ID;
    const managedResourceId = (options as DefaultAzureCredentialOptionsWithResourceId)
      ?.managedIdentityResourceId;

    // ManagedIdentityCredential throws if both the resourceId and the clientId are provided.
    const managedIdentityOptions: ManagedIdentityCredentialOptions = {
      resourceId: managedResourceId,
      clientId: managedIdentityClientId,
      ...options,
    };

    super(managedIdentityOptions);
  }
}

export const defaultCredentials: DefaultCredentialConstructor[] = [
  EnvironmentCredential,
  DefaultManagedIdentityCredential,
  VisualStudioCodeCredential,
  AzureCliCredential,
  AzurePowerShellCredential,
];

/**
 * Provides a default {@link ChainedTokenCredential} configuration that should
 * work for most applications that use the Azure SDK.
 */
export class DefaultAzureCredential extends ChainedTokenCredential {
  /**
   * Creates an instance of the DefaultAzureCredential class.
   *
   * This credential provides a default {@link ChainedTokenCredential} configuration that should
   * work for most applications that use the Azure SDK.
   *
   * The following credential types will be tried, in order:
   *
   * - {@link EnvironmentCredential}
   * - {@link ManagedIdentityCredential}
   * - {@link VisualStudioCodeCredential}
   * - {@link AzureCliCredential}
   * - {@link AzurePowerShellCredential}
   *
   * Consult the documentation of these credential types for more information
   * on how they attempt authentication.
   *
   * **Note**: `VisualStudioCodeCredential` is provided by a plugin package:
   * `@azure/identity-vscode`. If this package is not installed and registered
   * using the plugin API (`useIdentityPlugin`), then authentication using
   * `VisualStudioCodeCredential` will not be available.
   *
   * @param options - Optional parameters. See {@link DefaultAzureCredentialOptions}.
   */
  constructor(options?: DefaultAzureCredentialOptions) {
    super(...defaultCredentials.map((ctor) => new ctor(options)));
    this.UnavailableMessage =
      "DefaultAzureCredential => failed to retrieve a token from the included credentials. To troubleshoot, visit https://aka.ms/azsdk/js/identity/defaultazurecredential/troubleshoot.";
  }
}

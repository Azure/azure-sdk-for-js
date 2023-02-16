// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DefaultAzureCredentialClientIdOptions,
  DefaultAzureCredentialOptions,
  DefaultAzureCredentialResourceIdOptions,
  DefaultAzureWorkloadCredentialOptions,
} from "./defaultAzureCredentialOptions";
import {
  ManagedIdentityCredential,
  ManagedIdentityCredentialClientIdOptions,
  ManagedIdentityCredentialResourceIdOptions,
} from "./managedIdentityCredential";
import { AzureCliCredential } from "./azureCliCredential";
import { AzurePowerShellCredential } from "./azurePowerShellCredential";
import { ChainedTokenCredential } from "./chainedTokenCredential";
import { EnvironmentCredential } from "./environmentCredential";
import { TokenCredential } from "@azure/core-auth";
import { AzureDeveloperCliCredential } from "./azureDeveloperCliCredential";
import { WorkloadIdentityCredential } from "./workloadIdentityCredential";
import { WorkloadIdentityCredentialOptions } from "./workloadIdentityCredentialOptions";

/**
 * The type of a class that implements TokenCredential and accepts either
 * {@link DefaultAzureCredentialClientIdOptions} or
 * {@link DefaultAzureCredentialResourceIdOptions} or
 * {@link DefaultAzureCredentialOptions}.
 */
interface DefaultCredentialConstructor {
  new (options?: DefaultAzureCredentialOptions): TokenCredential;
  new (options?: DefaultAzureCredentialResourceIdOptions): TokenCredential;
  new (options?: DefaultAzureCredentialClientIdOptions): TokenCredential;
  new (options?: DefaultAzureWorkloadCredentialOptions): TokenCredential;
}

/**
 * A shim around ManagedIdentityCredential that adapts it to accept
 * `DefaultAzureCredentialOptions`.
 *
 * @internal
 */
export class DefaultManagedIdentityCredential extends ManagedIdentityCredential {
  // Constructor overload with file and client ID options
  constructor(options?: DefaultAzureWorkloadCredentialOptions);
  // Constructor overload with just client id options
  constructor(options?: DefaultAzureCredentialClientIdOptions);
  // Constructor overload with just resource id options
  constructor(options?: DefaultAzureCredentialResourceIdOptions);
  // Constructor overload with just the other default options
  // Last constructor overload with Union of all options not required since the above two constructor overloads have optional properties
  constructor(options?: DefaultAzureCredentialOptions) {
    const managedIdentityClientId =
      (options as DefaultAzureCredentialClientIdOptions)?.managedIdentityClientId ??
      process.env.AZURE_CLIENT_ID;
    const managedResourceId = (options as DefaultAzureCredentialResourceIdOptions)
      ?.managedIdentityResourceId;
    const workloadFile = (options as DefaultAzureWorkloadCredentialOptions)?.federatedTokenFilePath ?? process.env.AZURE_FEDERATED_TOKEN_FILE;

    // ManagedIdentityCredential throws if both the resourceId and the clientId are provided.
    if (managedResourceId) {
      const managedIdentityResourceIdOptions: ManagedIdentityCredentialResourceIdOptions = {
        ...options,
        resourceId: managedResourceId,
      };
      super(managedIdentityResourceIdOptions);
    } else if (workloadFile) {
      const workloadIdentityCredentialOptions: WorkloadIdentityCredentialOptions = {
        ...options,
        clientId: managedIdentityClientId,
        federatedTokenFilePath: workloadFile,
      };
      super(workloadIdentityCredentialOptions);
    } else if (managedIdentityClientId) {
      const managedIdentityClientOptions: ManagedIdentityCredentialClientIdOptions = {
        ...options,
        clientId: managedIdentityClientId,
      };
      super(managedIdentityClientOptions);
    } else {
      super(options);
    }
  }
}

export const defaultCredentials: DefaultCredentialConstructor[] = [
  EnvironmentCredential,
  WorkloadIdentityCredential,
  DefaultManagedIdentityCredential,
  AzureDeveloperCliCredential,
  AzureCliCredential,
  AzurePowerShellCredential,
];

/**
 * Provides a default {@link ChainedTokenCredential} configuration that should
 * work for most applications that use the Azure SDK.
 */
export class DefaultAzureCredential extends ChainedTokenCredential {
  /**
   * Creates an instance of the DefaultAzureCredential class with {@link DefaultAzureCredentialClientIdOptions}
   *
   * This credential provides a default {@link ChainedTokenCredential} configuration that should
   * work for most applications that use the Azure SDK.
   *
   * The following credential types will be tried, in order:
   *
   * - {@link EnvironmentCredential}
   * - {@link WorkloadIdentityCredential}
   * - {@link ManagedIdentityCredential}
   * - {@link AzureDeveloperCliCredential}
   * - {@link AzureCliCredential}
   * - {@link AzurePowerShellCredential}
   *
   * Consult the documentation of these credential types for more information
   * on how they attempt authentication.
   *
   * @param options - Optional parameters. See {@link DefaultAzureCredentialClientIdOptions}.
   */
  constructor(options?: DefaultAzureCredentialClientIdOptions);

  /**
   *  Creates an instance of the DefaultAzureCredential class with {@link DefaultAzureCredentialResourceIdOptions}
   *
   * This credential provides a default {@link ChainedTokenCredential} configuration that should
   * work for most applications that use the Azure SDK.
   *
   * The following credential types will be tried, in order:
   *
   * - {@link EnvironmentCredential}
   * - {@link WorkloadIdentityCredential}
   * - {@link ManagedIdentityCredential}
   * - {@link AzureDeveloperCliCredential}
   * - {@link AzureCliCredential}
   * - {@link AzurePowerShellCredential}
   *
   * Consult the documentation of these credential types for more information
   * on how they attempt authentication.
   *
   * @param options - Optional parameters. See {@link DefaultAzureCredentialResourceIdOptions}.
   */
  constructor(options?: DefaultAzureCredentialResourceIdOptions);

  /**
   * Creates an instance of the DefaultAzureCredential class with {@link DefaultAzureCredentialOptions}
   *
   * This credential provides a default {@link ChainedTokenCredential} configuration that should
   * work for most applications that use the Azure SDK.
   *
   * The following credential types will be tried, in order:
   *
   * - {@link EnvironmentCredential}
   * - {@link WorkloadIdentityCredential}
   * - {@link ManagedIdentityCredential}
   * - {@link AzureDeveloperCliCredential}
   * - {@link AzureCliCredential}
   * - {@link AzurePowerShellCredential}
   *
   * Consult the documentation of these credential types for more information
   * on how they attempt authentication.
   *
   * @param options - Optional parameters. See {@link DefaultAzureCredentialOptions}.
   */
  constructor(options?: DefaultAzureCredentialOptions);

  constructor(
    options?:
      | DefaultAzureCredentialOptions
      | DefaultAzureCredentialResourceIdOptions
      | DefaultAzureCredentialClientIdOptions
  ) {
    super(...defaultCredentials.map((ctor) => new ctor(options)));
  }
}

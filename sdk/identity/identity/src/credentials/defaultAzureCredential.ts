// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DefaultAzureCredentialClientIdOptions,
  DefaultAzureCredentialOptions,
  DefaultAzureCredentialResourceIdOptions,
} from "./defaultAzureCredentialOptions";
import {
  ManagedIdentityCredential,
  ManagedIdentityCredentialClientIdOptions,
  ManagedIdentityCredentialResourceIdOptions,
} from "./managedIdentityCredential";

import { AzureCliCredential } from "./azureCliCredential";
import { AzureDeveloperCliCredential } from "./azureDeveloperCliCredential";
import { AzurePowerShellCredential } from "./azurePowerShellCredential";
import { ChainedTokenCredential } from "./chainedTokenCredential";
import { EnvironmentCredential } from "./environmentCredential";
import { TokenCredential } from "@azure/core-auth";
import { WorkloadIdentityCredential } from "./workloadIdentityCredential";
import { WorkloadIdentityCredentialOptions } from "./workloadIdentityCredentialOptions";
import { credentialLogger } from "../util/logging";

const logger = credentialLogger("DefaultAzureCredential");

/**
 * Creates a {@link ManagedIdentityCredential} from the provided options.
 * @param options - Options to configure the credential.
 *
 * @internal
 */
export function createDefaultManagedIdentityCredential(
  options:
    | DefaultAzureCredentialOptions
    | DefaultAzureCredentialResourceIdOptions
    | DefaultAzureCredentialClientIdOptions = {},
): TokenCredential {
  options.retryOptions ??= {
    maxRetries: 5,
    retryDelayInMs: 800,
  };
  const managedIdentityClientId =
    (options as DefaultAzureCredentialClientIdOptions)?.managedIdentityClientId ??
    process.env.AZURE_CLIENT_ID;
  const workloadIdentityClientId =
    (options as DefaultAzureCredentialClientIdOptions)?.workloadIdentityClientId ??
    managedIdentityClientId;
  const managedResourceId = (options as DefaultAzureCredentialResourceIdOptions)
    ?.managedIdentityResourceId;
  const workloadFile = process.env.AZURE_FEDERATED_TOKEN_FILE;
  const tenantId = options?.tenantId ?? process.env.AZURE_TENANT_ID;
  if (managedResourceId) {
    const managedIdentityResourceIdOptions: ManagedIdentityCredentialResourceIdOptions = {
      ...options,
      resourceId: managedResourceId,
    };
    return new ManagedIdentityCredential(managedIdentityResourceIdOptions);
  }

  if (workloadFile && workloadIdentityClientId) {
    const workloadIdentityCredentialOptions: DefaultAzureCredentialOptions = {
      ...options,
      tenantId: tenantId,
    };

    return new ManagedIdentityCredential(
      workloadIdentityClientId,
      workloadIdentityCredentialOptions,
    );
  }

  if (managedIdentityClientId) {
    const managedIdentityClientOptions: ManagedIdentityCredentialClientIdOptions = {
      ...options,
      clientId: managedIdentityClientId,
    };

    return new ManagedIdentityCredential(managedIdentityClientOptions);
  }

  // We may be able to return a UnavailableCredential here, but that may be a breaking change
  return new ManagedIdentityCredential(options);
}

/**
 * Creates a {@link WorkloadIdentityCredential} from the provided options.
 * @param options - Options to configure the credential.
 *
 * @internal
 */
function createDefaultWorkloadIdentityCredential(
  options?: DefaultAzureCredentialOptions | DefaultAzureCredentialClientIdOptions,
): TokenCredential {
  const managedIdentityClientId =
    (options as DefaultAzureCredentialClientIdOptions)?.managedIdentityClientId ??
    process.env.AZURE_CLIENT_ID;
  const workloadIdentityClientId =
    (options as DefaultAzureCredentialClientIdOptions)?.workloadIdentityClientId ??
    managedIdentityClientId;
  const workloadFile = process.env.AZURE_FEDERATED_TOKEN_FILE;
  const tenantId = options?.tenantId ?? process.env.AZURE_TENANT_ID;
  if (workloadFile && workloadIdentityClientId) {
    const workloadIdentityCredentialOptions: WorkloadIdentityCredentialOptions = {
      ...options,
      tenantId,
      clientId: workloadIdentityClientId,
      tokenFilePath: workloadFile,
    };
    return new WorkloadIdentityCredential(workloadIdentityCredentialOptions);
  }
  if (tenantId) {
    const workloadIdentityClientTenantOptions: WorkloadIdentityCredentialOptions = {
      ...options,
      tenantId,
    };
    return new WorkloadIdentityCredential(workloadIdentityClientTenantOptions);
  }

  // We may be able to return a UnavailableCredential here, but that may be a breaking change
  return new WorkloadIdentityCredential(options);
}

/**
 * Creates a {@link AzureDeveloperCliCredential} from the provided options.
 * @param options - Options to configure the credential.
 *
 * @internal
 */
function createDefaultAzureDeveloperCliCredential(
  options: DefaultAzureCredentialOptions = {},
): TokenCredential {
  const processTimeoutInMs = options.processTimeoutInMs;
  return new AzureDeveloperCliCredential({ processTimeoutInMs, ...options });
}

/**
 * Creates a {@link AzureCliCredential} from the provided options.
 * @param options - Options to configure the credential.
 *
 * @internal
 */
function createDefaultAzureCliCredential(
  options: DefaultAzureCredentialOptions = {},
): TokenCredential {
  const processTimeoutInMs = options.processTimeoutInMs;
  return new AzureCliCredential({ processTimeoutInMs, ...options });
}

/**
 * Creates a {@link AzurePowerShellCredential} from the provided options.
 * @param options - Options to configure the credential.
 *
 * @internal
 */
function createDefaultAzurePowershellCredential(
  options: DefaultAzureCredentialOptions = {},
): TokenCredential {
  const processTimeoutInMs = options.processTimeoutInMs;
  return new AzurePowerShellCredential({ processTimeoutInMs, ...options });
}

/**
 * Creates an {@link EnvironmentCredential} from the provided options.
 * @param options - Options to configure the credential.
 *
 * @internal
 */
export function createEnvironmentCredential(
  options: DefaultAzureCredentialOptions = {},
): TokenCredential {
  return new EnvironmentCredential(options);
}

/**
 * A no-op credential that logs the reason it was skipped if getToken is called.
 * @internal
 */
export class UnavailableDefaultCredential implements TokenCredential {
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
   * - {@link AzureCliCredential}
   * - {@link AzurePowerShellCredential}
   * - {@link AzureDeveloperCliCredential}
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
   * - {@link AzureCliCredential}
   * - {@link AzurePowerShellCredential}
   * - {@link AzureDeveloperCliCredential}
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
   * - {@link AzureCliCredential}
   * - {@link AzurePowerShellCredential}
   * - {@link AzureDeveloperCliCredential}
   *
   * Consult the documentation of these credential types for more information
   * on how they attempt authentication.
   *
   * @param options - Optional parameters. See {@link DefaultAzureCredentialOptions}.
   */
  constructor(options?: DefaultAzureCredentialOptions);

  constructor(options?: DefaultAzureCredentialOptions) {
    const credentialFunctions = [
      createEnvironmentCredential,
      createDefaultWorkloadIdentityCredential,
      createDefaultManagedIdentityCredential,
      createDefaultAzureCliCredential,
      createDefaultAzurePowershellCredential,
      createDefaultAzureDeveloperCliCredential,
    ];

    // DefaultCredential constructors should not throw, instead throwing on getToken() which is handled by ChainedTokenCredential.

    // When adding new credentials to the default chain, consider:
    // 1. Making the constructor parameters required and explicit
    // 2. Validating any required parameters in the factory function
    // 3. Returning a UnavailableDefaultCredential from the factory function if a credential is unavailable for any reason
    const credentials: TokenCredential[] = credentialFunctions.map((createCredentialFn) => {
      try {
        return createCredentialFn(options);
      } catch (err: any) {
        logger.warning(
          `Skipped ${createCredentialFn.name} because of an error creating the credential: ${err}`,
        );
        return new UnavailableDefaultCredential(createCredentialFn.name, err.message);
      }
    });

    super(...credentials);
  }
}
